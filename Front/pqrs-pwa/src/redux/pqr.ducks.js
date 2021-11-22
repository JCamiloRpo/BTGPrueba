import axios from 'axios';
import { env } from 'process';

// contants
const URL = env.REACT_APP_SERVER_URL + env.REACT_APP_SERVER_PATH;

const dataInit = {
    isLoading = null,
    errMess = null,
    PQRs = [],
};

// types
const PQRS_LOADING = "PQRS_LOADING";
const PQRS_SUCCESS = "PQRS_SUCCESS";
const PQRS_ERROR = "PQRS_ERROR";

// reducer
export default function pqrReducer(state = dataInit, action){
    const { type, payload } = action;
    switch(type){
        case PQRS_LOADING:
            return { ...state, isLoading: true, errMess: null };
        case PQRS_SUCCESS:
            return { ...state, isLoading: false, errMess: null, ...payload };
        case PQRS_ERROR:
            return { ...state, isLoading: false, errMess: payload };
    }
}

// actions
/**
 * Obtener todos los PQRs, solo si es admin los traerá
 */
export const getPQRsAction = () => async (dispatch, getState) => {
    try{
        dispatch({ type: PQRS_LOADING });

        const { token } = getState().user;
        const config = {
            headers: { token }
        };

        const res = await axios.get(URL + env.REACT_APP_SERVER_PATH, config);
        const data = await res.data;

        dispatch({ type: PQRS_SUCCESS, payload: data });
    }
    catch (err){
        console.error("Error getPQRs", err.message);
        dispatch({ type: PQRS_ERROR, payload: err.message });
    }
}

/**
 * Obtener los PQRs del cliente en actual
 */
export const getPQRsClientAction = () => async (dispatch, getState) => {
    try{
        dispatch({ type: PQRS_LOADING });

        const { id, token } = getState().user;
        const config = {
            params: { client: id },
            headers: { token }
        };

        const res = await axios.get(URL + env.REACT_APP_SERVER_PATH, config);
        const data = await res.data;

        dispatch({ type: PQRS_SUCCESS, payload: data });
    }
    catch (err){
        console.error("Error getPQRsClient", err.message);
        dispatch({ type: PQRS_ERROR, payload: err.message });
    }
}

/**
 * Actualizar una PQR del cliente
 * @param {string} id Radicado de la PQR
 * @param {object} changes La PQR completa con los campos actualizados
 */
export const updatePQRClientAction = (id, changes) => async (dispatch, getState) => {
    try{
        dispatch({ type: PQRS_LOADING });

        const { token } = getState().user;
        const config = {
            headers: { token }
        };

        const res = await axios.put(URL + env.REACT_APP_SERVER_PUT_PQR_CLIENT + `/:${id}`, { ...changes }, config);
        const data = await res.data;

        const { PQRs } = getState().pqr;
        PQRs.map((item) => ( item.id === id ? data.PQR : item ));

        dispatch({ type: PQRS_SUCCESS, payload: { PQRs } });
    }
    catch (err){
        console.error("Error updatePQRClient", err.message);
        dispatch({ type: PQRS_ERROR, payload: err.message });
    }
}

/**
 * Crear una PQR en la base de datos
 * @param {*} pqr Los datos de la PQR
 * @returns 
 */
export const createPQRClientAction = (pqr) => async (dispatch, getState) => {
    try{
        dispatch({ type: PQRS_LOADING });

        const { token } = getState().user;
        const config = {
            headers: { token }
        };

        const res = await axios.put(URL + env.REACT_APP_SERVER_POST_PQR_CLIENT, { ...pqr }, config);
        const data = await res.data;

        const { PQRs } = getState().pqr;
        PQRs.push(data.PQR);

        dispatch({ type: PQRS_SUCCESS, payload: { PQRs } });
    }
    catch (err){
        console.error("Error createPQRClient", err.message);
        dispatch({ type: PQRS_ERROR, payload: err.message });
    }
}