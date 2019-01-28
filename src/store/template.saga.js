import {
    call,
    put,
    takeEvery,
    takeLatest
} from 'redux-saga/effects'

// action types
export const actionTypes = {
    ADD_AGE: 'ADD_AGE'
}


const initialState = {
    age: 1
}



// action creators

/**
 * 增加name
 * @param {number} age
 */
export function addAge({
    age
} = {}) {
    return {
        type: actionTypes.ADD_AGE,
        age
    }
}

// reducers
export default function reducers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_AGE:
            return {
                ...state,
                age: action.age
            }
        default:
            return state;
    }
}