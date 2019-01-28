// action types
export const actionTypes = {
    ADD_BIRTH: 'ADD_BIRTH',
}


const initialState = {
    birth: ''
}

// action creators

/**
 * 增加出生地
 * @param {string} birth 
 */
export function addBirth({
    birth
} = {}) {
    return {
        type: actionTypes.ADD_BIRTH,
        birth
    }
}

// reducers
export default function reducers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_BIRTH:
            return {
                ...state,
                birth: action.birth
            }
        default:
            return state;
    }
}