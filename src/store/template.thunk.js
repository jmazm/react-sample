// action types
export const actionTypes = {
    ADD_NAME: 'ADD_NAME',
}


const initialState = {
    name: ''
}



// action creators

/**
 * 增加name
 * @param {string} name 
//  */
export function aAddName({
    name
} = {}) {
    return {
        type: actionTypes.ADD_NAME,
        name
    }
}


// redux-thunk => 异步action
export function addName(payload) {
    // 返回一个函数 function (dispatch, getState {}
    return (dispatch, getState) => {
        new Promise((resolved) => {
            resolved('jmazm2');
        }).then((data) => {
            // dispatch一个同步action（action creator）- aAddName
            dispatch(aAddName(payload));
            // 通过getState()获取整个store的state
            console.log(getState());
            return data;
        })
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