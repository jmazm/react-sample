// action types
export const actionTypes = {
    ADD_NAME: 'ADD_NAME',
    GET_NAME: 'GET_NAME'
}


const initialState = {
    name: ''
}



// action creators

/**
 * 增加name
 * @param {string} name 
 */
export function addName({
    name
} = {}) {
    return {
        type: actionTypes.ADD_NAME,
        name
    }
}

/**
 * 获取name
 */
export function getName() {
    return {
        type: actionTypes.GET_NAME
    }
}

// reducers
export default function reducers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_NAME:
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}