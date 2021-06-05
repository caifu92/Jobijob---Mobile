import * as ActionTypes from './actionTypes'
import * as Services from '@services'

export const signin = token => dispatch => {
    dispatch({
        type: ActionTypes.AUTH.SIGNIN,
        payload: {
            token: token
        }
    });
    return Promise.resolve();
};

export const signup = token => dispatch => {
    dispatch({
        type: ActionTypes.AUTH.SIGNUP,
        payload: {
            token: token
        }
    });
    return Promise.resolve();
};

export const logout = () => dispatch => {
    dispatch({ type: ActionTypes.AUTH.LOGOUT });
    return Promise.resolve();
};
