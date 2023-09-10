import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox'
import {ProductListScreen} from '../screens/ProductListScreen'

function Header(){
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        dispatch(logout())


    }

    return (

        <header>
             <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                  <Container>

                    <Navbar.Brand href="/">ТРПО</Navbar.Brand>
                    <SearchBox />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">

                        <Nav.Link href="/">Главная</Nav.Link>

                        {userInfo ?(
                            <NavDropdown title={userInfo.name} id='username'>
                            <NavDropdown.Item href="/profile">Профиль</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/productList/">Создать объявление</NavDropdown.Item>
                            <NavDropdown.Item onClick={logoutHandler} href='/'>Выйти</NavDropdown.Item>
                            </NavDropdown>

                        ) : (<Nav.Link href="/login"><i className='fas fa-user'></i>Войти</Nav.Link>)}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Списки' id='adminmenu'>
                                <NavDropdown.Item href="/events/">предстоящие мероприятия</NavDropdown.Item>
                                <NavDropdown.Item href="/inventory/">инвентарь</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/userList/">пользователи</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/productList/">мероприятия</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/studentList/">студенты</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/departmentList/">факультеты</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/sectionList/">секции</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/trainerList/">тренера</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/awardList/">награды</NavDropdown.Item>
                            </NavDropdown>



                        )}

                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
        </header>
    )
}
export default Header