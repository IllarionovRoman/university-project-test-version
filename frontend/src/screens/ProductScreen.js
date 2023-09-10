import React, { useState, useEffect}from 'react'
import { Container, Row, Col, Image, Button, ListGroup, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'
import {listProductDetails} from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'

function ProductScreen({match}){
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails


    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    },[dispatch, match])


    return (
        <div>
            <a href={'/'} className='btn btn-light my-3'>Go back</a>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Дата: {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Описание: {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Телефон: {product.brand}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={6}></Col>

            </Row>
        </div>
    )
}
export default ProductScreen