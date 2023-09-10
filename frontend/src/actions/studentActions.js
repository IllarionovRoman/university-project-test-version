import {
    STUDENT_LIST_REQUEST,
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,

    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,

    STUDENT_DELETE_REQUEST,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAIL,

    STUDENT_CREATE_REQUEST,
    STUDENT_CREATE_SUCCESS,
    STUDENT_CREATE_FAIL,
    STUDENT_CREATE_RESET,

    STUDENT_UPDATE_REQUEST,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_UPDATE_RESET


} from '../constants/studentConstants'
import axios from 'axios'
import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS} from "../constants/productConstants";

export const listStudents = (stud = '') => async (dispatch) => {
    try{
        dispatch({type: STUDENT_LIST_REQUEST})
        const {data} = await axios.get(`/api/students${stud}`)
        dispatch({
            type: STUDENT_LIST_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: STUDENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const listStudentDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: STUDENT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/students/${id}`)
        dispatch({
            type: STUDENT_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: STUDENT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const deleteStudent = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: STUDENT_DELETE_REQUEST})
        const {
            userLogin:{userInfo}, } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(
            `/api/students/delete/${id}/`,
            config
        )

        dispatch({
            type: STUDENT_DELETE_SUCCESS,
        })
        dispatch({
            type: STUDENT_LIST_SUCCESS,
            payload: data
        })


    } catch(error){
        dispatch({
            type: STUDENT_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const createStudent = () => async (dispatch, getState) => {
    try{
        dispatch({type: STUDENT_CREATE_REQUEST})
        const {
            userLogin:{userInfo} } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `/api/students/create/`,
            {},
            config
        )

        dispatch({
            type: STUDENT_CREATE_SUCCESS,
            payload:data
        })


    } catch(error){
        dispatch({
            type: STUDENT_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const updateStudent = (student) => async (dispatch, getState) => {
    try{
        dispatch({type: STUDENT_UPDATE_REQUEST})
        const {
            userLogin:{userInfo} } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            `/api/students/update/${student._id}/`,
            student,
            config
        )

        dispatch({
            type: STUDENT_UPDATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: STUDENT_DETAILS_SUCCESS,
            payload:data

        })


    } catch(error){
        dispatch({
            type: STUDENT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
