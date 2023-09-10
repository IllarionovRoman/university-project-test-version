import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, Table} from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { listUsers, deleteUser }from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchUser from '../components/SearchUser'

function UserListScreen({history}){
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    const {userInfo} = userLogin
    let us = history.location.search
    const deleteHandler = (id) => {
        if(window.confirm('tochno?')){
            dispatch(deleteUser(id))
        }
    }
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers(us))
        }else{
            history.push('/login')
        }

    }, [dispatch, history, successDelete, userInfo, us])
    return (
        <div>
            <h1>users</h1>
            <SearchUser />
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>id</th>
                        <th>Администратор</th>
                        <th>Управление</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user._id}</td>
                            <td>{user.isAdmin ? (
                                <i className='fas fa-check' style={{color: 'green'}}></i>
                                ) : (
                                <i className='fas fa-check' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <Link to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-check'></i>
                                        Изменить
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-check'></i>
                                        Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>



        </div>
    )
}
export default UserListScreen