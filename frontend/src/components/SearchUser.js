import React, {useState} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

function SearchUser(){
     const [us, setUs] = useState('')

     let history = useHistory()
     const submitHandler = (e) => {
        e.preventDefault()
        if(us){
            history.push(`/admin/Userlist/?us=${us}`)
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
                onChange={(e) => setUs(e.target.value)}
                className='mr-sm-2 ml-sm-5'>
            </Form.Control>


       </Form>

    )
}
export default SearchUser