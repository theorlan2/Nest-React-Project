import { AnyAction } from "redux";
import { PostsTypes } from "./actionsTypes";

export interface IPostState {
  posts: any[];
}

const INITIAL_STATE: IPostState = {
  posts: [],
};

const postsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case PostsTypes.INIT_POSTS:
      return {
        ...state,
        posts: [],
      };
    case PostsTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        errorResponse: {},
      };
    case PostsTypes.SUCCES_POSTS:
      return {
        ...state,
        errorResponse: {},
      };
    case PostsTypes.ERROR_NEWS:
      return {
        ...state,
        posts: [],
      };
    case PostsTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
      };
    case PostsTypes.CLEAR_NEWS:
      return {
        ...state,
        posts: [],
      };
    default:
      return state;
  }
};

export default postsReducer;
