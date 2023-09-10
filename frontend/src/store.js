import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productDetailsReducer} from './reducers/productReducers'
import {userLoginReducer, userDeleteReducer,
userRegisterReducer, userDetailsReducer, userUpdateProfileReducer,
userUpdateReducer,
userListReducer} from './reducers/userReducers'
import {studentListReducer, studentDeleteReducer, studentCreateReducer, studentUpdateReducer, studentDetailsReducer} from './reducers/studentReducers'
import {departmentListReducer, departmentDeleteReducer, departmentCreateReducer, departmentUpdateReducer, departmentDetailsReducer} from './reducers/departmentReducers'
import {trainerListReducer, trainerDeleteReducer, trainerCreateReducer, trainerUpdateReducer, trainerDetailsReducer} from './reducers/trainerReducers'
import {sectionListReducer, sectionDeleteReducer, sectionCreateReducer, sectionUpdateReducer, sectionDetailsReducer} from './reducers/sectionReducers'
import {awardListReducer, awardDeleteReducer, awardCreateReducer, awardUpdateReducer, awardDetailsReducer} from './reducers/awardReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    studentList: studentListReducer,
    studentDetails: studentDetailsReducer,
    studentCreate: studentCreateReducer,
    studentUpdate: studentUpdateReducer,
    studentDelete: studentDeleteReducer,

    departmentList: departmentListReducer,
    departmentDetails: departmentDetailsReducer,
    departmentCreate: departmentCreateReducer,
    departmentUpdate: departmentUpdateReducer,
    departmentDelete: departmentDeleteReducer,

    sectionList: sectionListReducer,
    sectionDetails: sectionDetailsReducer,
    sectionCreate: sectionCreateReducer,
    sectionUpdate: sectionUpdateReducer,
    sectionDelete: sectionDeleteReducer,

    trainerList: trainerListReducer,
    trainerDetails: trainerDetailsReducer,
    trainerCreate: trainerCreateReducer,
    trainerUpdate: trainerUpdateReducer,
    trainerDelete: trainerDeleteReducer,

    awardList: awardListReducer,
    awardDetails: awardDetailsReducer,
    awardCreate: awardCreateReducer,
    awardUpdate: awardUpdateReducer,
    awardDelete: awardDeleteReducer,

})
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin:{userInfo:userInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store