import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}){
    return (

        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </a>
            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
            <Card.Text as='div'>


            </Card.Text>
            <Card.Text as='h3'>
                {product.price}
            </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Product