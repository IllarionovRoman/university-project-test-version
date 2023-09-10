import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Department({department}){
    return (

        <Card className='my-3 p-3 rounded'>
            <a href={`/department/${department._id}`}>
            </a>
            <Card.Body>
                <a href={`/department/${department._id}`}>
                    <Card.Title as='div'>
                        <strong>{department.name}</strong>
                    </Card.Title>
                </a>
            <Card.Text as='div'>


            </Card.Text>
            <Card.Text as='h3'>
                {department.name}
            </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Department