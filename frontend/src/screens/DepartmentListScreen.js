import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, Table} from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { listDepartments, deleteDepartment, createDepartment }from '../actions/departmentActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DEPARTMENT_CREATE_RESET } from '../constants/departmentConstants'
import Department from '../components/Department'
import SearchDepartment from '../components/SearchDepartment'
function DepartmentListScreen({history}){
    const dispatch = useDispatch()
    const departmentList = useSelector(state => state.departmentList)
    const {loading, error, departments} = departmentList

    const departmentDelete = useSelector(state => state.departmentDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = departmentDelete

    const departmentCreate = useSelector(state => state.departmentCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, department:createdDepartment} = departmentCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let dep = history.location.search


    const deleteHandler = (id) => {
        if(window.confirm('tochno?')){
            dispatch(deleteDepartment(id))
            history.push('/')

        }
    }
    const createDepartmentHandler = () => {
        dispatch(createDepartment())
    }
    useEffect(() => {
        dispatch({type: DEPARTMENT_CREATE_RESET})
        dispatch(listDepartments(dep))

        if (!userInfo) {
            history.push('/')
        }
        if (successCreate) {
            history.push(`/admin/department/${createdDepartment._id}/edit`)
        }else {
            dispatch(listDepartments())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdDepartment, dep])
    return (
        <div>
            <h1>Факультеты</h1>
            <SearchDepartment />
            <Col className='text-right'>
                <Button className='my-3' onClick={createDepartmentHandler}>
                    <i className='fas fa-plus'></i>Создать
                </Button>
            </Col>
            {userInfo.isAdmin && (
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>

                        <th>Управление</th>
                    </tr>
                </thead>
                <tbody>
                    {departments?.map(department => (
                        <tr key={department._id}>
                            <td>{department._id}</td>
                            <td>{department.name}</td>


                            <td>
                                <Link to={`/admin/department/${department._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-check'></i>
                                        Изменить
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(department._id)}>
                                        <i className='fas fa-check'></i>
                                        Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>

            )}

        </div>



    )
}
export default DepartmentListScreen