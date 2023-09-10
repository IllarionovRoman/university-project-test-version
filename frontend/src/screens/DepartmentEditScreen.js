import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listDepartmentDetails, listDepartments, updateDepartment }from '../actions/departmentActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { DEPARTMENT_UPDATE_RESET } from '../constants/departmentConstants'
import FormData from 'form-data'


function DepartmentEditScreen({match, history}){
    const departmentId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateDepartment({
            _id:departmentId,
            name,
           }))

    }

    const departmentDetails = useSelector(state => state.departmentDetails)
    const {error, loading, department} = departmentDetails

    const departmentUpdate = useSelector(state => state.departmentUpdate)
    const {success: successUpdate} = departmentUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({type:DEPARTMENT_UPDATE_RESET})
            history.push('/admin/departmentList/')


        }else{
            if(!department.name || department._id !== Number(departmentId)){
                dispatch(listDepartmentDetails(departmentId))
            }else {
                setName(department.name)


        }

        }


        }, [dispatch, department, departmentId, history, successUpdate]
    )


    return (
        <div>
         <a href={'/admin/departmentList'} className='btn btn-light my-3'>Go back</a>
        <FormContainer>
             <h1>Объявление</h1>

            <Form onSubmit={submitHandler}>
             <Form.Group controlId='name'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
             </Form.Group>
             </Form>

             <Button type='submit' variant='primary'> Сохранить данные

                </Button>


        </FormContainer>
        </div>
    )
}

export default DepartmentEditScreen