import { put, takeLatest, call } from "redux-saga/effects";
//
import * as registerActions from "./actions";
import { PostsTypes } from "./actionsTypes";
import API from "../../services/baseApi"; 

function* initPostsData(action: { payload: any }): Generator<any> {
  try {
    const response = yield call(API.get as any, "/news", action.payload);
    yield put(registerActions.setNews(response)); 
  } catch (e: any) {
    yield put(registerActions.errorOnGetNews(e.message));
  }
}

function* removePostItem(action: { payload: string }): Generator<any> {
  try {
    const response = yield call(
      API.delete as any,
      "/news/" + action.payload,
      {}
    );
       yield put(registerActions.succesNews());
  } catch (e: any) {
    yield put(registerActions.errorOnGetNews(e.message));
  }
}

export default function* root(): Generator<any> {
  return [
    yield takeLatest<string, any>(PostsTypes.INIT_POSTS, initPostsData),
    yield takeLatest<string, any>(PostsTypes.DELETE_POST, removePostItem),
  ];
}
