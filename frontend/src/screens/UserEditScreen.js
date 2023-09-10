import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateUser }from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen({match, history}){
    const userId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:user._id, name, email, isAdmin}))

    }

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userList')
        }else{
            if(!user.name || user._id !== Number(userId)){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.IsAdmin)
        }
        }

        }, [user,userId, successUpdate, history]
    )
    return (
        <div>
         <a href={'/admin/userList'} className='btn btn-light my-3'>Go back</a>
        <FormContainer>
             <h1>Изменение пользователя</h1>
            <Form onSubmit={submitHandler}>
             <Form.Group controlId='name'>
                    <Form.Label>
                        name
                    </Form.Label>
                    <Form.Control

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

                        type='email'
                        placeholder='enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                 <Form.Group controlId='isAdmin'>
                    <Form.Label>
                        password
                    </Form.Label>
                    <Form.Check
                        type='checkbox'
                        label='isAdmin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}>
                    </Form.Check>
                </Form.Group>

                <Button type='submit' variant='primary'> Изменить

                </Button>

                </Form>

        </FormContainer>
        </div>
    )
}

export default UserEditScreen