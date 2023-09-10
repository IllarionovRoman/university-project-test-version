import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Container, Table} from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { listSections, deleteSection, createSection }from '../actions/sectionActions'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SECTION_CREATE_RESET } from '../constants/sectionConstants'
import SearchSection from '../components/SearchSection'

function SectionListScreen({history}){
    const dispatch = useDispatch()
    const sectionList = useSelector(state => state.sectionList)
    const {loading, error, sections} = sectionList

    const sectionDelete = useSelector(state => state.sectionDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = sectionDelete

    const sectionCreate = useSelector(state => state.sectionCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, section:createdSection} = sectionCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let sec = history.location.search

    const deleteHandler = (id) => {
        if(window.confirm('tochno?')){
            dispatch(deleteSection(id))
            history.push('/')

        }
    }
    const createSectionHandler = () => {
        dispatch(createSection())
    }
    useEffect(() => {
        dispatch({type: SECTION_CREATE_RESET})
        dispatch(listSections(sec))

        if (!userInfo) {
            history.push('/')
        }
        if (successCreate) {
            history.push(`/admin/section/${createdSection._id}/edit`)
        }else {
            dispatch(listSections())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdSection, sec])
    return (
        <div>
            <h1>Секции</h1>
            <SearchSection />
            <Col className='text-right'>
                <Button className='my-3' onClick={createSectionHandler}>
                    <i className='fas fa-plus'></i>Создать
                </Button>
            </Col>
            {userInfo.isAdmin && (
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>название</th>
                        <th>описание</th>
                        <th>студенты в секции</th>
                        <th>Управление</th>
                    </tr>
                </thead>
                <tbody>
                    {sections?.map(section => (
                        <tr key={section._id}>
                            <td>{section._id}</td>
                            <td>{section.name}</td>
                            <td>{section.description}</td>
                            <td>{section.students.map((student) => student.first_name).join(', ')}</td>



                            <td>
                                <Link to={`/admin/section/${section._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-check'></i>
                                        Изменить
                                    </Button>
                                </Link>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(section._id)}>
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
export default SectionListScreen