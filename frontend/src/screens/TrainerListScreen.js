import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, Table} from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { listTrainers, deleteTrainer, createTrainer }from '../actions/trainerActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { TRAINER_CREATE_RESET } from '../constants/trainerConstants'
import SearchTrainer from '../components/SearchTrainer'

function TrainerListScreen({history}){
    const dispatch = useDispatch()
    const trainerList = useSelector(state => state.trainerList)
    const {loading, error, trainers} = trainerList

    const trainerDelete = useSelector(state => state.trainerDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = trainerDelete

    const trainerCreate = useSelector(state => state.trainerCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, trainer:createdTrainer} = trainerCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let trai = history.location.search

    const deleteHandler = (id) => {
        if(window.confirm('tochno?')){
            dispatch(deleteTrainer(id))
            history.push('/')

        }
    }
    const createTrainerHandler = () => {
        dispatch(createTrainer())
    }
    useEffect(() => {
        dispatch({type: TRAINER_CREATE_RESET})
        dispatch(listTrainers(trai))

        if (!userInfo) {
            history.push('/')
        }
        if (successCreate) {
            history.push(`/admin/trainer/${createdTrainer._id}/edit`)
        }else {
            dispatch(listTrainers())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdTrainer, trai])
    return (
        <div>
            <h1>Тренера</h1>
            <SearchTrainer />
            <Col className='text-right'>
                <Button className='my-3' onClick={createTrainerHandler}>
                    <i className='fas fa-plus'></i>Создать
                </Button>
            </Col>
            {userInfo.isAdmin && (
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>фамилия</th>
                        <th>имя</th>
                        <th>отчество</th>
                        <th>Управление</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers?.map(trainer => (
                        <tr key={trainer._id}>
                            <td>{trainer._id}</td>
                            <td>{trainer.first_name}</td>
                            <td>{trainer.last_name}</td>
                            <td>{trainer.middle_name}</td>


                            <td>
                                <Link to={`/admin/trainer/${trainer._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-check'></i>
                                        Изменить
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(trainer._id)}>
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
export default TrainerListScreen