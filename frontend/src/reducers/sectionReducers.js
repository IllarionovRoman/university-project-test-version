import {
    SECTION_LIST_REQUEST,
    SECTION_LIST_SUCCESS,
    SECTION_LIST_FAIL,
    SECTION_DETAILS_REQUEST,
    SECTION_DETAILS_SUCCESS,
    SECTION_DETAILS_FAIL,
    SECTION_UPDATE_REQUEST,
    SECTION_UPDATE_SUCCESS,
    SECTION_UPDATE_FAIL,
    SECTION_UPDATE_RESET,
    SECTION_DELETE_REQUEST,
    SECTION_DELETE_SUCCESS,
    SECTION_DELETE_FAIL,
    SECTION_CREATE_REQUEST,
    SECTION_CREATE_SUCCESS,
    SECTION_CREATE_FAIL,
    SECTION_CREATE_RESET
} from '../constants/sectionConstants'

export const sectionListReducer = (state = {sections: []}, action) => {
    switch (action.type) {
        case SECTION_LIST_REQUEST:
            return { loading: true, sections: []}
        case SECTION_LIST_SUCCESS:
            return { loading: false, sections: action.payload}
        case SECTION_LIST_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state


    }
}
export const sectionDetailsReducer = (state = { section: {}}, action) => {
    switch (action.type) {
        case SECTION_DETAILS_REQUEST:
            return { loading: true, ...state}
        case SECTION_DETAILS_SUCCESS:
            return { loading: false, section: action.payload}
        case SECTION_DETAILS_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state


    }
}
export const sectionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SECTION_DELETE_REQUEST:
            return { loading: true}
        case SECTION_DELETE_SUCCESS:
            return { loading: false, success:true}
        case SECTION_DELETE_FAIL:
            return { loading: false, error: action.payload}

        default:
            return state


    }
}
export const sectionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SECTION_CREATE_REQUEST:
            return { loading: true}
        case SECTION_CREATE_SUCCESS:
            return { loading: false, success:true, section:action.payload}
        case SECTION_CREATE_FAIL:
            return { loading: false, error: action.payload}
        case SECTION_CREATE_RESET:
            return {}
        default:
            return state

    }
}
export const sectionUpdateReducer = (state = {section: {}}, action) => {
    switch (action.type) {
        case SECTION_UPDATE_REQUEST:
            return { loading: true}
        case SECTION_UPDATE_SUCCESS:
            return { loading: false, success:true, section:action.payload}
        case SECTION_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        case SECTION_UPDATE_RESET:
            return {section:{}}
        default:
            return state


    }
}