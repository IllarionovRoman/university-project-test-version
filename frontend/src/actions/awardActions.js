import {
    AWARD_LIST_REQUEST,
    AWARD_LIST_SUCCESS,
    AWARD_LIST_FAIL,
    AWARD_DETAILS_REQUEST,
    AWARD_DETAILS_SUCCESS,
    AWARD_DETAILS_FAIL,

    AWARD_DELETE_REQUEST,
    AWARD_DELETE_SUCCESS,
    AWARD_DELETE_FAIL,

    AWARD_CREATE_REQUEST,
    AWARD_CREATE_SUCCESS,
    AWARD_CREATE_FAIL,
    AWARD_CREATE_RESET,

    AWARD_UPDATE_REQUEST,
    AWARD_UPDATE_SUCCESS,
    AWARD_UPDATE_FAIL,
    AWARD_UPDATE_RESET


} from '../constants/awardConstants'
import axios from 'axios'

export const listAwards = (aw = '') => async (dispatch) => {
    try{
        dispatch({type: AWARD_LIST_REQUEST})
        const {data} = await axios.get(`/api/awards${aw}`)
        dispatch({
            type: AWARD_LIST_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: AWARD_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}
export const listAwardDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: AWARD_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/awards/${id}`)
        dispatch({
            type: AWARD_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: AWARD_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const deleteAward = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: AWARD_DELETE_REQUEST})
        const {
            userLogin:{userInfo}, } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(
            `/api/awards/delete/${id}/`,
            config
        )

        dispatch({
            type: AWARD_DELETE_SUCCESS,
        })
        dispatch({
            type: AWARD_LIST_SUCCESS,
            payload: data
        })


    } catch(error){
        dispatch({
            type: AWARD_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const createAward = () => async (dispatch, getState) => {
    try{
        dispatch({type: AWARD_CREATE_REQUEST})
        const {
            userLogin:{userInfo} } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `/api/awards/create/`,
            {},
            config
        )

        dispatch({
            type: AWARD_CREATE_SUCCESS,
            payload:data
        })


    } catch(error){
        dispatch({
            type: AWARD_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const updateAward = (award) => async (dispatch, getState) => {
    try{
        dispatch({type: AWARD_UPDATE_REQUEST})
        const {
            userLogin:{userInfo} } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            `/api/awards/update/${award._id}/`,
            award,
            config
        )

        dispatch({
            type: AWARD_UPDATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: AWARD_DETAILS_SUCCESS,
            payload:data

        })


    } catch(error){
        dispatch({
            type: AWARD_UPDATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
