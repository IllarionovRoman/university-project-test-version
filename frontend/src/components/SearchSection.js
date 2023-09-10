import React, {useState} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
function SearchDepartment(){
     const [sec, setSec] = useState('')

     let history = useHistory()
     const submitHandler = (e) => {
        e.preventDefault()
        if(sec){
            history.push(`/admin/sectionlist/?sec=${sec}`)
        }else{
            history.push(history.push(history.location.pathname))
        }
     }

    return (
       <Form onSubmit={submitHandler} inline>

            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setSec(e.target.value)}
                className='mr-sm-2 ml-sm-5'>
            </Form.Control>


       </Form>

    )
}
export default SearchDepartment