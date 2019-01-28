import {
    combineReducers,
    createStore,
    applyMiddleware
} from 'redux';
import reduxThunk from 'redux-thunk';

import thunkTemplate from './template.thunk';
import promiseTemplate from './template.promise';
import sagaTemplate from './template.saga';



const reducers = combineReducers({
    thunk: thunkTemplate,
    promise: promiseTemplate,
    saga: sagaTemplate
});


const store = createStore(
    reducers,
    applyMiddleware(reduxThunk)
);


export default store;