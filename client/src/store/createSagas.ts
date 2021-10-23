import {all} from 'redux-saga/effects';
import PostsSagas from './post/sagas';

export default function* root() {
  yield all([ 
    PostsSagas(), 
  ]);
}
