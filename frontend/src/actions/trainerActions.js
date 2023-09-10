import {
    TRAINER_LIST_REQUEST,
    TRAINER_LIST_SUCCESS,
    TRAINER_LIST_FAIL,
    TRAINER_DETAILS_REQUEST,
    TRAINER_DETAILS_SUCCESS,
    TRAINER_DETAILS_FAIL,

    TRAINER_DELETE_REQUEST,
    TRAINER_DELETE_SUCCESS,
    TRAINER_DELETE_FAIL,

    TRAINER_CREATE_REQUEST,
    TRAINER_CREATE_SUCCESS,
    TRAINER_CREATE_FAIL,
    TRAINER_CREATE_RESET,

    TRAINER_UPDATE_REQUEST,
    TRAINER_UPDATE_SUCCESS,
    TRAINER_UPDATE_FAIL,
    TRAINER_UPDATE_RESET


} from '../constants/trainerConstants'
import axios from 'axios'

export const listTrainers = (trai = '') => async (dispatch) => {
    try{
        dispatch({type: TRAINER_LIST_REQUEST})
        const {data} = await axios.get(`/api/trainers${trai}`)
        dispatch({
            type: TRAINER_LIST_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: TRAINER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}
export const listTrainerDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: TRAINER_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/trainers/${id}`)
        dispatch({
            type: TRAINER_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: TRAINER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const deleteTrainer = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: TRAINER_DELETE_REQUEST})
        const {
            userLogin:{userInfo}, } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(
            `/api/trainers/delete/${id}/`,
            config
        )

        dispatch({
            type: TRAINER_DELETE_SUCCESS,
        })
        dispatch({
            type: TRAINER_LIST_SUCCESS,
            payload: data
        })


    } catch(error){
        dispatch({
            type: TRAINER_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const createTrainer = () => async (dispatch, getState) => {
    try{
        dispatch({type: TRAINER_CREATE_REQUEST})
        const {
            userLogin:{userInfo} } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `/api/trainers/create/`,
            {},
            config
        )

        dispatch({
            type: TRAINER_CREATE_SUCCESS,
            payload:data
        })


    } catch(error){
        dispatch({
            type: TRAINER_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const updateTrainer = (trainer) => async (dispatch, getState) => {
    try{
        dispatch({type: TRAINER_UPDATE_REQUEST})
        const {
            userLogin:{userInfo} } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            `/api/trainers/update/${trainer._id}/`,
            trainer,
            config
        )

        dispatch({
            type: TRAINER_UPDATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: TRAINER_DETAILS_SUCCESS,
            payload:data

        })


    } catch(error){
        dispatch({
            type: TRAINER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
