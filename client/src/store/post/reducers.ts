import { RequestStatusEnum } from "../../infrastructure/enums/generics";
import { AnyAction } from "redux";
import { PostsTypes } from "./actionsTypes";

export interface IPostState {
  posts: any[];
  postsStatus: RequestStatusEnum;
  errorResponse: any;
}

const INITIAL_STATE: IPostState = {
  posts: [],
  postsStatus: RequestStatusEnum.NONE,
  errorResponse: {},
};

const postsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case PostsTypes.INIT_POSTS:
      return {
        ...state,
        posts: [],
        postsStatus: RequestStatusEnum.LOADING,
      };
    case PostsTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        errorResponse: {},
        postsStatus: RequestStatusEnum.SUCCESS,
      };
    case PostsTypes.SUCCES_POSTS:
      return {
        ...state,
        errorResponse: {},
        postsStatus: RequestStatusEnum.SUCCESS,
      };
    case PostsTypes.ERROR_NEWS:
      return {
        ...state,
        posts: [],
        errorResponse: action.payload,
        postsStatus: RequestStatusEnum.ERROR,
      };
    case PostsTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => item._id != action.payload),
        errorResponse: {},
        postsStatus: RequestStatusEnum.SUCCESS,
      };
    case PostsTypes.CLEAR_NEWS:
      return {
        ...state,
        posts: [],
        errorResponse: {},
        postsStatus: RequestStatusEnum.NONE,
      };
    default:
      return state;
  }
};

export default postsReducer;
