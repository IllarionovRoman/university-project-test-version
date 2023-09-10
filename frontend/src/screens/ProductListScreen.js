import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, Table} from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { listProducts, deleteProduct, createProduct }from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import EventList from "./EventList";

function ProductListScreen({history}){
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const deleteHandler = (id) => {
        if(window.confirm('tochno?')){
            dispatch(deleteProduct(id))
            history.push('/')
            window.location.reload()

        }
    }
    const createProductHandler = () => {
        dispatch(createProduct())
    }
    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if (!userInfo) {
            history.push('/')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])
    return (
        <div>
            <h1>Мероприятия</h1>
            <EventList/>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i>Создать
                </Button>
            </Col>
            {userInfo.isAdmin && (
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>дата</th>
                        <th>описание</th>
                        <th>адрес</th>
                        <th>Управление</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(product => (
                        <tr key={product._id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.brand}</td>

                            <td>
                                <Link to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-check'></i>
                                        Изменить
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
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
export default ProductListScreen