import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_RESET = 'UPDATE_PROFILE_RESET';
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_RESET = 'UPDATE_PASSWORD_RESET';
export const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

export const NEW_PASSWORD_REQUEST = 'NEW_PASSWORD_REQUEST';
export const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';
export const NEW_PASSWORD_FAIL = 'NEW_PASSWORD_FAIL';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const { data } = await axios.post('/api/v1/login', { email, password }, config);
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_FAIL, error: error.response.data.message });
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = {
            headers: {
                'Content-type': 'multipart/from-data',
            },
        };
        const { data } = await axios.post('/api/v1/register', userData, config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: REGISTER_USER_FAIL, error: error.response.data.message });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get('/api/v1/me');
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: LOAD_USER_FAIL, error: error.response.data.message });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout');
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        console.log(error);
        dispatch({ type: LOGOUT_FAIL, error: error.response.data.message });
    }
};

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = {
            headers: {
                'Content-type': 'multipart/from-data',
            },
        };
        const { data } = await axios.put('/api/v1/me/update', userData, config);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        console.log(error);
        dispatch({ type: UPDATE_PROFILE_FAIL, error: error.response.data.message });
    }
};

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const { data } = await axios.put('/api/v1/password/update', passwords, config);
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        console.log(error);
        dispatch({ type: UPDATE_PASSWORD_FAIL, error: error.response.data.message });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const { data } = await axios.post('/api/v1/password/forgot', email, config);
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        console.log(error);
        dispatch({ type: FORGOT_PASSWORD_FAIL, error: error.response.data.message });
    }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
        dispatch({ type: NEW_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        console.log(error);
        dispatch({ type: NEW_PASSWORD_FAIL, error: error.response.data.message });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

export const resetProfile = () => async (dispatch) => {
    dispatch({
        type: UPDATE_PROFILE_RESET,
    });
};

export const updatePasswordReset = () => async (dispatch) => {
    dispatch({
        type: UPDATE_PASSWORD_RESET,
    });
};
