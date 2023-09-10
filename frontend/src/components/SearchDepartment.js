import React, {useState} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
function SearchDepartment(){
     const [dep, setDep] = useState('')

     let history = useHistory()
     const submitHandler = (e) => {
        e.preventDefault()
        if(dep){
            history.push(`/admin/departmentlist/?dep=${dep}`)
        }else{
            history.push(history.push(history.location.pathname))
        }
     }

    return (
       <Form onSubmit={submitHandler} inline>

            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setDep(e.target.value)}
                className='mr-sm-2 ml-sm-5'>
            </Form.Control>


       </Form>

    )
}
export default SearchDepartment