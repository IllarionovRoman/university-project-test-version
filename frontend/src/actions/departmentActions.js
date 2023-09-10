import {
    DEPARTMENT_LIST_REQUEST,
    DEPARTMENT_LIST_SUCCESS,
    DEPARTMENT_LIST_FAIL,
    DEPARTMENT_DETAILS_REQUEST,
    DEPARTMENT_DETAILS_SUCCESS,
    DEPARTMENT_DETAILS_FAIL,

    DEPARTMENT_DELETE_REQUEST,
    DEPARTMENT_DELETE_SUCCESS,
    DEPARTMENT_DELETE_FAIL,

    DEPARTMENT_CREATE_REQUEST,
    DEPARTMENT_CREATE_SUCCESS,
    DEPARTMENT_CREATE_FAIL,
    DEPARTMENT_CREATE_RESET,

    DEPARTMENT_UPDATE_REQUEST,
    DEPARTMENT_UPDATE_SUCCESS,
    DEPARTMENT_UPDATE_FAIL,
    DEPARTMENT_UPDATE_RESET


} from '../constants/departmentConstants'
import axios from 'axios'

export const listDepartments = (dep = '') => async (dispatch) => {
    try{
        dispatch({type: DEPARTMENT_LIST_REQUEST})
        const {data} = await axios.get(`/api/departments${dep}`)
        dispatch({
            type: DEPARTMENT_LIST_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: DEPARTMENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}
export const listDepartmentDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: DEPARTMENT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/departments/${id}`)
        dispatch({
            type: DEPARTMENT_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: DEPARTMENT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const deleteDepartment = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: DEPARTMENT_DELETE_REQUEST})
        const {
            userLogin:{userInfo}, } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(
            `/api/departments/delete/${id}/`,
            config
        )

        dispatch({
            type: DEPARTMENT_DELETE_SUCCESS,
        })
        dispatch({
            type: DEPARTMENT_LIST_SUCCESS,
            payload: data
        })


    } catch(error){
        dispatch({
            type: DEPARTMENT_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const createDepartment = () => async (dispatch, getState) => {
    try{
        dispatch({type: DEPARTMENT_CREATE_REQUEST})
        const {
            userLogin:{userInfo} } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `/api/departments/create/`,
            {},
            config
        )

        dispatch({
            type: DEPARTMENT_CREATE_SUCCESS,
            payload:data
        })


    } catch(error){
        dispatch({
            type: DEPARTMENT_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const updateDepartment = (department) => async (dispatch, getState) => {
    try{
        dispatch({type: DEPARTMENT_UPDATE_REQUEST})
        const {
            userLogin:{userInfo} } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            `/api/departments/update/${department._id}/`,
            department,
            config
        )

        dispatch({
            type: DEPARTMENT_UPDATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: DEPARTMENT_DETAILS_SUCCESS,
            payload:data

        })


    } catch(error){
        dispatch({
            type: DEPARTMENT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
