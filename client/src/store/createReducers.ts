import { combineReducers } from "redux";
import postsReducer, { IPostState } from "./post/reducers";

export default combineReducers({
    posts: postsReducer,
});

export interface IRootState {
    posts: IPostState;
}