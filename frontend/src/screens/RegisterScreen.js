import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register }from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

function RegisterScreen({location, history}){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage =('NEVERNI PAROL')
        }
        else{
            dispatch(register(name, email, password))
        }
    }
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    useEffect(() =>{
        if (userInfo) {
            history.push(redirect)
        }
        }, [history, userInfo, redirect]
    )
    return (
        <FormContainer>
             <h1>Регистрация</h1>
            <Form onSubmit={submitHandler}>
             <Form.Group controlId='name'>
                    <Form.Label>
                        Имя
                    </Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='введите имя'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='email'>
                    <Form.Label>
                        Эл почта
                    </Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='введите email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='password'>
                    <Form.Label>
                        Пароль
                    </Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='passwordConfirm'>
                    <Form.Label>
                        Подтвердите пароль
                    </Form.Label>
                    <Form.Control
                        required
                        type='confirmPassword'
                        placeholder='подтвердите пароль'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'> Зарегистрироваться

                </Button>

                </Form>
                 <Row className='py-3'>
                <Col>
                    Есть аккаунта? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Войти</Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default RegisterScreen