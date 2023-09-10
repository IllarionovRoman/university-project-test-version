import React, { useState, useEffect}from 'react'
import { Container, Row, Col, Image, Button, ListGroup, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'
import {listDepartmentDetails} from '../actions/departmentActions'
import { useSelector, useDispatch } from 'react-redux'

function DepartmentScreen({match}){
    const dispatch = useDispatch()
    const departmentDetails = useSelector(state => state.departmentDetails)
    const {error, loading, department} = departmentDetails


    useEffect(() => {
        dispatch(listDepartmentDetails(match.params.id))
    },[dispatch, match])


    return (
        <div>
            <a href={'/'} className='btn btn-light my-3'>Go back</a>
            <Row>
                <Col md={6}>
                </Col>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{department.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Цена: {department.name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Описание: {department.name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Телефон: {department.name}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={6}></Col>

            </Row>
        </div>
    )
}
export default DepartmentScreen