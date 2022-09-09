import * as ActionTypes from './types';

const CryptoJS = require("crypto-js");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

let dt = '';
let dt_res = '';
let _dt = '';

const initialState = {
    isLoggedIn: !!localStorage.getItem(tokenLogin),
    token: localStorage.getItem(tokenLogin),
    currentUser: {
        name: '',
        status: '',
        email: '',
        no_hp: '',
        password: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_USER:
            dt = CryptoJS.AES.decrypt(action.token, secretKey);
            dt_res = dt.toString(CryptoJS.enc.Utf8);
            _dt = dt_res.split('Þ');
            localStorage.setItem(tokenLogin, action.token);
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                currentUser: {
                    name: _dt[0],
                    status: _dt[1],
                    email: _dt[2],
                    np_hp: _dt[3],
                    password: null
                }
            };
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem(tokenLogin);
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                currentUser: {
                    name: '',
                    status: '',
                    email: '',
                    no_hp: '',
                    password: null
                }
            };
        case ActionTypes.LOAD_USER:
            return {
                ...state,
                currentUser: action.currentUser
            };
        default:
            return { ...state };
    }
};

export default reducer;
