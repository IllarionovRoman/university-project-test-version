import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'

import { listDepartments } from '../actions/departmentActions'
import {deleteProduct} from '../actions/productActions'

function HomeScreen({history}){
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    const productDelete = useSelector(state => state.productDelete)

    let keyword = history.location.search


    useEffect(() => {
        dispatch(listProducts(keyword))
    },[dispatch, keyword])
    return (
        <div>
            <h1>Список мероприятий: </h1>

                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />

                            </Col>

                        ))}

                    </Row>



        </div>
    )
}
export default HomeScreen