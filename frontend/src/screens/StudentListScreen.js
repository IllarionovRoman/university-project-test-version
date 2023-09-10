import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, Table} from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { listStudents, deleteStudent, createStudent }from '../actions/studentActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { STUDENT_CREATE_RESET } from '../constants/studentConstants'
import SearchStudent from '../components/SearchStudent'
import Product from "../components/Product";

function StudentListScreen({history}){
    const dispatch = useDispatch()
    const studentList = useSelector(state => state.studentList)
    const {loading, error, students} = studentList

    const studentDelete = useSelector(state => state.studentDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = studentDelete

    const studentCreate = useSelector(state => state.studentCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, student:createdStudent} = studentCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let stud = history.location.search


    const deleteHandler = (id) => {
        if(window.confirm('tochno?')){
            dispatch(deleteStudent(id))
            history.push('/')

        }
    }
    const createStudentHandler = () => {
        dispatch(createStudent())
    }

    const exportToExcel = () => {
    const apiBaseUrl = "http://localhost:3000"; // Замените на ваш URL, если отличается
    const exportUrl = `${apiBaseUrl}/api/export-students-to-excel/`;
    window.open(exportUrl, "_blank");
  };
    useEffect(() => {
        dispatch({type: STUDENT_CREATE_RESET})

        if (!userInfo) {
            history.push('/')
        }
        if (successCreate) {
            history.push(`/admin/student/${createdStudent._id}/edit`)
        }else {
            dispatch(listStudents(stud))
        }


    }, [dispatch, history, userInfo, successDelete, successCreate, createdStudent, stud])
    return (
        <div>
            <h1>Студенты</h1>
            <button onClick={exportToExcel}>Экспортировать в Excel</button>
            <SearchStudent />
            <Col className='text-right'>
                <Button className='my-3' onClick={createStudentHandler}>
                    <i className='fas fa-plus'></i>Создать
                </Button>
            </Col>
            {userInfo.isAdmin && (
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>имя</th>
                        <th>фамилия</th>
                        <th>отчество</th>
                        <th>возраст</th>

                        <th>Управление</th>

                    </tr>
                </thead>

                <tbody>
                    {students?.map(student => (
                        <tr key={student._id}>
                            {/*<a href={`/student/${student._id}`}>*/}
                            <td>{student._id}</td>
                            <td>{student.last_name}</td>
                            <td>{student.first_name}</td>
                            <td>{student.middle_name}</td>
                                <td>{student.age}</td>

                            <td>
                                <Link to={`/admin/student/${student._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-check'></i>
                                        Изменить
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(student._id)}>
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
export default StudentListScreen