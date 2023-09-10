import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listStudentDetails, listStudents, updateStudent }from '../actions/studentActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { STUDENT_UPDATE_RESET } from '../constants/studentConstants'
import FormData from 'form-data'


function StudentEditScreen({match, history}){
    const studentId = match.params.id
    const dispatch = useDispatch()
    const [first_name, setName] = useState('')
    const [last_name, setLName] = useState('')
    const [middle_name, setMName] = useState('')
    const [age, setAge] = useState('')



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateStudent({
            _id:studentId,
            first_name,
            last_name,
            middle_name,
            age
            }))
    }

    const studentDetails = useSelector(state => state.studentDetails)
    const {error, loading, student} = studentDetails

    const studentUpdate = useSelector(state => state.studentUpdate)
    const {success: successUpdate} = studentUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({type:STUDENT_UPDATE_RESET})
            history.push('/admin/studentlist/')

        }else{
            if(!student.name || student._id !== Number(studentId)){
                dispatch(listStudentDetails(studentId))
            }else {
                setName(student.first_name)
                setLName(student.last_name)
                setMName(student.middle_name)
                setAge(student.age)


        }

        }


        }, [dispatch, student,studentId, history, successUpdate]
    )

    return (
        <div>
         <a href={'/admin/studentList'} className='btn btn-light my-3'>Go back</a>
        <FormContainer>
             <h1>Объявление</h1>

            <Form onSubmit={submitHandler}>
             <Form.Group controlId='first_name'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={first_name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='last_name'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={last_name}
                        onChange={(e) => setLName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='middle_name'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={middle_name}
                        onChange={(e) => setMName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='age'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='enter name'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'> Сохранить данные

                </Button>

                </Form>


        </FormContainer>
        </div>
    )
}

export default StudentEditScreen