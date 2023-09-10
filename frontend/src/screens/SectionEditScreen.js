import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listSectionDetails, listSections, updateSection }from '../actions/sectionActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { SECTION_UPDATE_RESET } from '../constants/sectionConstants'
import FormData from 'form-data'


function SectionEditScreen({match, history}){
    const sectionId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateSection({
            _id:sectionId,
            name,

           }))

    }

    const sectionDetails = useSelector(state => state.sectionDetails)
    const {error, loading, section} = sectionDetails

    const sectionUpdate = useSelector(state => state.sectionUpdate)
    const {success: successUpdate} = sectionUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({type:SECTION_UPDATE_RESET})
            history.push('/admin/sectionList/')


        }else{
            if(!section.name || section._id !== Number(sectionId)){
                dispatch(listSectionDetails(sectionId))
            }else {
                setName(section.name)



        }

        }


        }, [dispatch, section, sectionId, history, successUpdate]
    )


    return (
        <div>
         <a href={'/admin/sectionList'} className='btn btn-light my-3'>Go back</a>
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

             <Button type='submit' variant='primary'> Сохранить данные

                </Button>


        </FormContainer>
        </div>
    )
}

export default SectionEditScreen