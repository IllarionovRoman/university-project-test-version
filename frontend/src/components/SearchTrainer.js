import React, {useState} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

function SearchTrainer(){
     const [trai, setTrai] = useState('')

     let history = useHistory()
     const submitHandler = (e) => {
        e.preventDefault()
        if(trai){
            history.push(`/admin/trainerlist/?trai=${trai}`)
        }else{
            history.push(history.push(history.location.pathname))
        }
     }

    return (
       <Form onSubmit={submitHandler} inline>

            <Form.Control
                type='text'
                name='q'
                placeholder='Поиск по имени'
                onChange={(e) => setTrai(e.target.value)}
                className='mr-sm-2 ml-sm-5'>
            </Form.Control>


       </Form>

    )
}
export default SearchTrainer