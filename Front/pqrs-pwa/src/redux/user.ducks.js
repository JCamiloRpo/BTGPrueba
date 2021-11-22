import axios from 'axios';

// contants
const URL = process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_SERVER_PATH;

const dataInit = {
    isLoading: false,
    errMess: null,
    clients: [],
    admin: null,
    id: "",
    name: "",
    token: ""
};

// types
const CLIENTS_LOADING = "CLIENTS_LOADING";
const CLIENTS_SUCCESS = "CLIENTS_SUCCESS";
const CLIENTS_ERROR = "CLIENTS_ERROR";

const TOKEN_LOADING = "TOKEN_LOADING";
const TOKEN_SUCCESS = "TOKEN_SUCCESS";
const TOKEN_ERROR = "TOKEN_ERROR";

// reducer
export default function userReducer(state = dataInit, action){
    switch(action.type){
        case CLIENTS_LOADING:
            return { ...state, isLoading: true, errMess: null };
        case CLIENTS_SUCCESS:
            return { ...state, isLoading: false, errMess: null, ...action.payload };
        case CLIENTS_ERROR:
            return { ...state, isLoading: false, errMess: action.payload };

        case TOKEN_LOADING:
            return { ...state, isLoading: true, errMess: null };
        case TOKEN_SUCCESS:
            return { ...state, isLoading: false, errMess: null, ...action.payload };
        case TOKEN_ERROR:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}

// actions
/**
 * Obtener todos los clientes
 */
export const getClientsAction = () => async (dispatch) => {
    try{
        dispatch({ type: CLIENTS_LOADING });

        const res = await axios.get(URL + process.env.REACT_APP_SERVER_GET_CLIENTS);
        const data = await res.data;

        dispatch({ type: CLIENTS_SUCCESS, payload: data });
    }
    catch (err){
        console.error("Error getClients", err.message);
        dispatch({ type: CLIENTS_ERROR, payload: err.message });
    }
}

/**
 * Obtener el token, simular log in
 * @param {boolean} admin 
 */
export const getTokenAction = (id, name, admin) => async (dispatch) => {
    try{
        dispatch({ type: TOKEN_LOADING });

        const res = await axios.get(URL + process.env.REACT_APP_SERVER_GET_TOKEN, { headers: { admin }});
        const data = await res.data;
        
        dispatch({ type: TOKEN_SUCCESS, payload: { ...data, id, name }});
    }
    catch (err){
        console.error("Error getToken", err.message);
        dispatch({ type: TOKEN_ERROR, payload: err.message });
    }
}

export const exitClientAction = () => (dispatch) => {
    dispatch({ type: CLIENTS_LOADING });
    
    dispatch({ type: CLIENTS_SUCCESS, payload: { ...dataInit } });
}