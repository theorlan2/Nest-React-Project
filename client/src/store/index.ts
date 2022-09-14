import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
//
import rootReducer from './createReducers';

// import { createLogger } from 'redux-logger'
 

/* ------------- Redux Configuration ------------- */

const middleware = [] as any[];
        
/* ------------- Saga Middleware ------------- */


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

