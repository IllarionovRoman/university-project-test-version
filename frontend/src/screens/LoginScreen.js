import React, { useState, useEffect}from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {login}from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

function LoginScreen({location, history}){
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    useEffect(() =>{
        if (userInfo) {
            history.push(redirect)
        }
        }, [history, userInfo, redirect]
    )
    return (
        <FormContainer>
            <h1>Авторизация</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Эл почта
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Введите email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                 <Form.Group controlId='password'>
                    <Form.Label>
                        Пароль
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'> Войти

                </Button>

            </Form>
            <Row className='py-3'>
                <Col>
                    Нет аккаунта? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Регистрация</Link>
                </Col>

            </Row>
        </FormContainer>
    )
}
export default LoginScreen