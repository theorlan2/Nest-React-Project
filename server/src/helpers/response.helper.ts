import { ErrorResponse, GenericResponse } from "../interfaces/response"



export default class ResponseHelper {

    static success<T>(data:T, msg: string): GenericResponse<T> {
        return {
            success: true,
            data,
            msg
        }  
    }

    static unSuccess<T>(msg: string, errors: any[]): ErrorResponse<T> {
        return {
            success: false,
            msg,
            errors
        }
    }

}