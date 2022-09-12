export interface ErrorResponse {
  statusCode: string;
  message: string; 
}



export interface GenericResponse<T> {
  success: boolean;
  data?: T;
  msg: string;
}


