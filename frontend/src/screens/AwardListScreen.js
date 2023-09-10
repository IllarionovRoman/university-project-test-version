import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, Table} from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { listAwards, deleteAward, createAward }from '../actions/awardActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AWARD_CREATE_RESET } from '../constants/awardConstants'
import SearchAward from '../components/SearchAward'

function AwardListScreen({history}){
    const dispatch = useDispatch()
    const awardList = useSelector(state => state.awardList)
    const {loading, error, awards} = awardList

    const awardDelete = useSelector(state => state.awardDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = awardDelete

    const awardCreate = useSelector(state => state.awardCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, award:createdAward} = awardCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let aw = history.location.search


    const deleteHandler = (id) => {
        if(window.confirm('tochno?')){
            dispatch(deleteAward(id))
            history.push('/')

        }
    }
    const createAwardHandler = () => {
        dispatch(createAward())
    }
    useEffect(() => {
        dispatch({type: AWARD_CREATE_RESET})
        dispatch(listAwards(aw))

        if (!userInfo) {
            history.push('/')
        }
        if (successCreate) {
            history.push(`/admin/award/${createdAward._id}/edit`)
        }else {
            dispatch(listAwards())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdAward, aw])
    return (
        <div>
            <h1>Награды</h1>
            <SearchAward />
            <Col className='text-right'>
                <Button className='my-3' onClick={createAwardHandler}>
                    <i className='fas fa-plus'></i>Создать
                </Button>
            </Col>
            {userInfo.isAdmin && (
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>название</th>
                        <th>количество</th>
                        <th>описание</th>
                        <th>тип</th>
                        <th>управление</th>


                    </tr>
                </thead>
                <tbody>
                    {awards?.map(award => (
                        <tr key={award._id}>
                            <td>{award._id}</td>
                            <td>{award.name}</td>
                            <td>{award.count}</td>
                            <td>{award.description}</td>
                            <td>{award.type}</td>


                            <td>
                                <Link to={`/admin/award/${award._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-check'></i>
                                        Изменить
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(award._id)}>
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
export default AwardListScreen