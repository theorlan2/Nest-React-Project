import { NewsViewModel } from "../../infrastructure/viewModels/news";
import API from "../../services/baseApi";
import { GenericResponse } from "../viewModels/shared";


export async function getNews(): Promise<GenericResponse<NewsViewModel[]>> {
    return API.get<null, GenericResponse<NewsViewModel[]>>("/news", {}, {});
}

export async function findNew(id: number): Promise<GenericResponse<NewsViewModel>> {
    return API.get<null, GenericResponse<NewsViewModel>>(`/news/${id}`, {}, {});
}