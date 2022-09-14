import { ErrorResponse } from "../infrastructure/viewModels/shared";

type MethodsRequest = "POST" | "PUT" | "GET" | "DELETE";


function baseFetch(url: RequestInfo, options: RequestInit = {}) {
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

function executeRequest<T, R = null>(
  method: MethodsRequest,
  pathname: string,
  data: T,
  options = {}
) {
  const body = method === "GET" || !data ? {} : JSON.stringify(data);
  const reqObj =
    method === "GET" ? { method, ...options } : { method, ...options, body };
  return new Promise<R>((resolve, reject) => {
    return baseFetch(pathname, reqObj as any)
      .then((res) => {
        res.json().then(r => resolve(r)).catch(e => console.log('Error on server response: ', e));
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
  get<T,R>(pathname: string, data = {}, options?: RequestInit) {
    return executeRequest<null,R>(
      "GET",
      pathname + "?" + serializeJSON(data),
      null,
      options
    );
  },
  post<T, R>(pathname: string, data: T, options?: RequestInit) {
    return executeRequest<T, R>("POST", pathname, data, options);
  },

  put<T,R>(pathname: string, data: T, options?: RequestInit) {
    return executeRequest<T,R>("PUT", pathname, data, options);
  },

  delete<T,R>(pathname: string, data: T, options?: RequestInit) {
    return executeRequest<T,R>("DELETE", pathname, data, options);
  },
};

export function getBaseErrorResponse(
  code: string,
  message: string,
): ErrorResponse {
  return {
    statusCode: code,
    message,
  };
}

