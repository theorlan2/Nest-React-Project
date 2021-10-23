type MethodsRequest = "POST" | "PUT" | "GET" | "DELETE";

export interface ErrorResponse {
  code: string;
  message: string;
  detailMessage?: string;
}

function baseFetch(url: RequestInfo, options?: RequestInit) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    //Authorization: "Bearer " + "token", // TODO: GET Token from Storage is use JWT
  };

  const urlResult = "http://localhost:3000" + url;

  return fetch(urlResult, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });
}

export function serializeJSON(data: any): string {
  return Object.keys(data)
    .map(function (keyName) {
      return (
        encodeURIComponent(keyName) + "=" + encodeURIComponent(data[keyName])
      );
    })
    .join("&");
}

function executeRequest(
  method: MethodsRequest,
  pathname: string,
  data: any,
  options = {}
) {
  const body = method === "GET" || !data ? {} : JSON.stringify(data);
  const reqObj =
    method === "GET" ? { method, ...options } : { method, ...options, body };
  return new Promise<any>((resolve, reject) => {
    return baseFetch(pathname, reqObj as any)
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        const errorResponse = getBaseErrorResponse(
          err && err.body && err.body.code, // Validate if this works
          err
        ); 
        reject(errorResponse);
      });
  });
}

export default {
  get(pathname: string, data: any = {}, options: RequestInit) {
    return executeRequest(
      "GET",
      pathname + "?" + serializeJSON(data),
      null,
      options
    );
  },
  post(pathname: string, data: any, options: RequestInit) {
    return executeRequest("POST", pathname, data, options);
  },

  put(pathname: string, data: any, options: RequestInit) {
    return executeRequest("PUT", pathname, data, options);
  },

  delete(pathname: string, data: any, options: RequestInit) {
    return executeRequest("DELETE", pathname, data, options);
  },
};

export function getBaseErrorResponse(
  code: string,
  message: string,
  detailMessage?: string
): ErrorResponse {
  return {
    code,
    message,
    detailMessage,
  };
}
