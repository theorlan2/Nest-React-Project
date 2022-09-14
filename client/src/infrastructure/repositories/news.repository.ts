import { NewsViewModel } from "../../infrastructure/viewModels/news";
import API from "../../services/baseApi";
import { GenericResponse } from "../viewModels/shared";


export async function getPost(): Promise<GenericResponse<NewsViewModel[]>> {
    return API.get<null, GenericResponse<NewsViewModel[]>>("/news", {});
}

export async function findPost(id: number): Promise<GenericResponse<NewsViewModel>> {
    return API.get<null, GenericResponse<NewsViewModel>>(`/news/${id}`, {});
}

export async function deletePost(id: string): Promise<GenericResponse<NewsViewModel>> {
    return API.delete<{}, GenericResponse<NewsViewModel>>(`/news/${id}`, {});
}