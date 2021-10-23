import { PostsTypes } from './actionsTypes';

export const initData = () => ({
    type: PostsTypes.INIT_POSTS, 
})
export const removeItem = (id: string) => ({
    type: PostsTypes.DELETE_POST, 
    payload: id
})
export const setNews = (payloadData: any) => ({
    type: PostsTypes.SET_POSTS,
    payload: payloadData,
})

export const errorOnGetNews = (payloadData: any) => ({
    type: PostsTypes.ERROR_NEWS,
    payload: payloadData,
})

export const succesNews = () => ({
    type: PostsTypes.SUCCES_POSTS,
})

export const clearNews = () => ({
    type: PostsTypes.CLEAR_NEWS,
})
