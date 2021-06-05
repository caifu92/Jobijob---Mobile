import * as ActionTypes from '@redux/actions/actionTypes'

const initialState = {
    isLoggedIn: false,
    token: ''
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.AUTH.SIGNIN:
            return { 
                ...state,
                isLoggedIn: true,
                token: action.payload.token
            };
            break;
        case ActionTypes.AUTH.SIGNUP:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token
            };
            break;
        case ActionTypes.AUTH.LOGOUT:
            return {
                isLoggedIn: false,
                token: ''
            };
            break;
        default:
            return state;
    }
}

export default authReducer;
