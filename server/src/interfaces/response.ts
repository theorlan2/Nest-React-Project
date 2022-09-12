export interface GenericResponse<T> {
    success: boolean;
    data?: T;
    msg: string;
}

export interface ErrorResponse<T> extends GenericResponse<T> {
    errors: string[]
}