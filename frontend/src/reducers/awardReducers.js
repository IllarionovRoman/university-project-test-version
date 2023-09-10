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

export const awardListReducer = (state = {awards: []}, action) => {
    switch (action.type) {
        case AWARD_LIST_REQUEST:
            return { loading: true, awards: []}
        case AWARD_LIST_SUCCESS:
            return { loading: false, awards: action.payload}
        case AWARD_LIST_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state


    }
}
export const awardDetailsReducer = (state = { award: {}}, action) => {
    switch (action.type) {
        case AWARD_DETAILS_REQUEST:
            return { loading: true, ...state}
        case AWARD_DETAILS_SUCCESS:
            return { loading: false, award: action.payload}
        case AWARD_DETAILS_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state


    }
}
export const awardDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case AWARD_DELETE_REQUEST:
            return { loading: true}
        case AWARD_DELETE_SUCCESS:
            return { loading: false, success:true}
        case AWARD_DELETE_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state


    }
}
export const awardCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case AWARD_CREATE_REQUEST:
            return { loading: true}
        case AWARD_CREATE_SUCCESS:
            return { loading: false, success:true, award:action.payload}
        case AWARD_CREATE_FAIL:
            return { loading: false, error: action.payload}
        case AWARD_CREATE_RESET:
            return {}
        default:
            return state

    }
}
export const awardUpdateReducer = (state = {award: {}}, action) => {
    switch (action.type) {
        case AWARD_UPDATE_REQUEST:
            return { loading: true}
        case AWARD_UPDATE_SUCCESS:
            return { loading: false, success:true, award:action.payload}
        case AWARD_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        case AWARD_UPDATE_RESET:
            return {award:{}}
        default:
            return state


    }
}