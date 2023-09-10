import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listAwardDetails, listAwards, updateAward }from '../actions/awardActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { AWARD_UPDATE_RESET } from '../constants/awardConstants'
import FormData from 'form-data'


function AwardEditScreen({match, history}){
    const awardId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')




    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateAward({
            _id:awardId,
            name,

           }))

    }

    const awardDetails = useSelector(state => state.awardDetails)
    const {error, loading, award} = awardDetails

    const awardUpdate = useSelector(state => state.awardUpdate)
    const {success: successUpdate} = awardUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({type:AWARD_UPDATE_RESET})
            history.push('/admin/awardList/')


        }else{
            if(!award.name || award._id !== Number(awardId)){
                dispatch(listAwardDetails(awardId))
            }else {
                setName(award.name)

        }

        }

        }, [dispatch, award, awardId, history, successUpdate]
    )


    return (
        <div>
         <a href={'/admin/awardList'} className='btn btn-light my-3'>Go back</a>
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


             </Form>

             <Button type='submit' variant='primary' > Сохранить данные

                </Button>


        </FormContainer>
        </div>
    )
}

export default AwardEditScreen