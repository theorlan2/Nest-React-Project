import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
//
import rootReducer from './createReducers';
import rootSaga from './createSagas'

// import { createLogger } from 'redux-logger'
 

/* ------------- Redux Configuration ------------- */

const middleware = []
        
/* ------------- Saga Middleware ------------- */

const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

sagaMiddleware.run(rootSaga);
