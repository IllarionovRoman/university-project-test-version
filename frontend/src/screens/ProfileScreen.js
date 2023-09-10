import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateUserProfile }from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({history}){
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
            dispatch(updateUserProfile({
            'id': user._id,
            'name': name,
            'email': email,
            'password': password,


            }))
        }
    }
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() =>{
        if (!userInfo) {
            history.push('/login')
        }
        else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))

            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
        }, [dispatch, history, userInfo, user, success]
    )
    return (
       <Row>
            <Col md={3}>
                <h2>USER PROFILE</h2>
                    <Form onSubmit={submitHandler}>
                         <Form.Group controlId='name'>
                                <Form.Label>
                                    name
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='name'
                                    placeholder='enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                             <Form.Group controlId='email'>
                                <Form.Label>
                                    EmailAddres
                                </Form.Label>
                                <Form.Control
                                    required
                                    type='email'
                                    placeholder='enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                             <Form.Group controlId='password'>
                                <Form.Label>
                                    password
                                </Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                             <Form.Group controlId='passwordConfirm'>
                                <Form.Label>
                                    passwordCOnfirm
                                </Form.Label>
                                <Form.Control
                                    type='confirmPassword'
                                    placeholder='enter password confirm'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'> update

                            </Button>

                </Form>
            </Col>
            <Col md={9}>

            </Col>
       </Row>
    )
}

export default ProfileScreen