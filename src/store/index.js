import {
    combineReducers,
    createStore
} from 'redux';
import templateReducer from './template';


const reducers = combineReducers({
    template: templateReducer
});


const store = createStore(reducers);


export default store;