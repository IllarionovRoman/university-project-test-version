import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listTrainerDetails, listTrainers, updateTrainer }from '../actions/trainerActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { TRAINER_UPDATE_RESET } from '../constants/trainerConstants'
import FormData from 'form-data'


function TrainerEditScreen({match, history}){
    const trainerId = match.params.id
    const dispatch = useDispatch()
    const [first_name, setName] = useState('')
    const [last_name, setLName] = useState('')
    const [middle_name, setMName] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateTrainer({
            _id:trainerId,
            first_name,
            last_name,
            middle_name,

            }))
    }

    const trainerDetails = useSelector(state => state.trainerDetails)
    const {error, loading, trainer} = trainerDetails

    const trainerUpdate = useSelector(state => state.trainerUpdate)
    const {success: successUpdate} = trainerUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({type:TRAINER_UPDATE_RESET})
            history.push('/admin/trainerlist/')

        }else{
            if(!trainer.name || trainer._id !== Number(trainerId)){
                dispatch(listTrainerDetails(trainerId))
            }else {
                setName(trainer.first_name)
                setLName(trainer.last_name)
                setMName(trainer.middle_name)



        }

        }


        }, [dispatch, trainer,trainerId, history, successUpdate]
    )

    return (
        <div>
         <a href={'/admin/trainerList'} className='btn btn-light my-3'>Go back</a>
        <FormContainer>
             <h1>Объявление</h1>

            <Form onSubmit={submitHandler}>
             <Form.Group controlId='first_name'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={first_name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='last_name'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={last_name}
                        onChange={(e) => setLName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='middle_name'>
                    <Form.Label>
                        название
                    </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={middle_name}
                        onChange={(e) => setMName(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'> Сохранить данные

                </Button>

                </Form>


        </FormContainer>
        </div>
    )
}

export default TrainerEditScreen