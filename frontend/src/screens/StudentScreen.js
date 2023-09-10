import React, { useState, useEffect }from 'react'
import { Container, Row, Col, Image, Button, ListGroup, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'
import { listStudentDetails } from '../actions/studentActions'
import { useSelector, useDispatch } from 'react-redux'

function StudentScreen({match}){
    const dispatch = useDispatch()
    const studentDetails = useSelector(state => state.studentDetails)
    const {error, loading, student} = studentDetails


    useEffect(() => {
        dispatch(listStudentDetails(match.params.id))
    },[dispatch, match])


    return (
        <div>
            <a href={'/'} className='btn btn-light my-3'>Go back</a>
            <Row>

                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{student.first_name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Дата: {student.last_name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Описание: {student.middle_name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Телефон: {student.age}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={6}></Col>

            </Row>
        </div>
    )
}
export default StudentScreen