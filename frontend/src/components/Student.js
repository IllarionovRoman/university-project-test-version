import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Student({student}){
    return (

        <Card className='my-3 p-3 rounded'>
            <a href={`/student/${student._id}`}>
                <Card.Img src={product.image}/>
            </a>
            <Card.Body>
                <a href={`/student/${student._id}`}>
                    <Card.Title as='div'>
                        <strong>{student.last_name}</strong>
                    </Card.Title>
                </a>
            <Card.Text as='div'>


            </Card.Text>
            <Card.Text as='h3'>
                {student.first_name}
            </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Student