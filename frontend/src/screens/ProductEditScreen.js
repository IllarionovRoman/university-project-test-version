import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listProductDetails, listProducts, updateProduct }from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import FormData from 'form-data'


function ProductEditScreen({match, history}){
    const productId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [uploading, setUploading] = useState(false)


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            brand,
            description,
            image}))
    }

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {success: successUpdate} = productUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})

        }else{
            if(!product.name || product._id !== Number(productId)){
                dispatch(listProductDetails(productId))
            }else {
                setName(product.name)
                setPrice(product.price)
                setDescription(product.description)
                setBrand(product.brand)
                setImage(product.image)

        }

        }


        }, [dispatch, product,productId, history, successUpdate]
    )
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)
        try{
            const config = {
            headers: {
                'Content-type':'multipart/form-data',
            }
        }
        const {data} = await axios.post(
            `/api/products/upload/`,
            formData,
            config
        )
        setImage(data)
        setUploading(false)

        }catch(error){

            setUploading(false)

        }
    }
    return (
        <div>
         <a href={'/admin/productList'} className='btn btn-light my-3'>Go back</a>
        <FormContainer>
             <h1>Объявление</h1>

            <Form onSubmit={submitHandler}>
             <Form.Group controlId='name'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='price'>
                    <Form.Label>
                        цена
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='введите дату'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}>
                    </Form.Control>
                 </Form.Group>
                 <Form.Group controlId='brand'>
                    <Form.Label>
                        телефон
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='введите адрес'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}>
                    </Form.Control>
                 </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>
                        описание
                    </Form.Label>
                    <Form.Control

                        type='text'
                        placeholder='введите описание'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </Form.Control>
                 </Form.Group>

                <Button type='submit' variant='primary'> Сохранить данные

                </Button>

                </Form>
                <Form.Group controlId='image'>
                    <Form.Label>
                        изображение
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='изображение'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}>
                    </Form.Control>
                     <Form.Control controlId='image' type="file" size="lg" onChange={uploadFileHandler}/>
                </Form.Group>
                <Button type='submit' variant='primary' href='/admin/productList/'> Сохранить фотографию

                </Button>

        </FormContainer>
        </div>
    )
}

export default ProductEditScreen