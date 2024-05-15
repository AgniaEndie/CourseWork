import {Container, Nav, Navbar} from "react-bootstrap";
import {LoginModal} from "./LoginModal.tsx";

import {useEffect, useState} from "react";
import {RegistryModal} from "./RegistryModal.tsx";
import {getPayloadFromJWT, leave} from "../services/AuthService.ts";

type props = {
    isAuth: boolean,
    setIsAuth: any,
    user: authModel,
    setUser: any
}

export function Header(props: props) {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const handleShowLoginModal = (data: boolean) => {
        setShowLoginModal(data)
    }

    const [showRegistryModal, setShowRegistryModal] = useState(false)
    const handleShowRegistryModal = (data: boolean) => {
        setShowRegistryModal(data)
    }

    const [clearedUserData, setClearedUserData] = useState("")

    const handleClearedUserData = (data: any) => {
        setClearedUserData(data)
    }

    const [role, setRole] = useState("")

    const handleRole = (data:string) =>{
        setRole(data)
    }

    useEffect(() => {
        if(props.isAuth){
            let clearedData = getPayloadFromJWT(props.user.access_token)
            handleClearedUserData(clearedData.name)
            console.log(clearedUserData)
            handleRole(clearedData.role)
        }
    }, [props.isAuth])

    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-3">
            <Container>
                <Navbar.Brand href="/">FoxTech</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {props.isAuth ?
                        <Nav>
                            <Nav.Link href="/profile">{clearedUserData}</Nav.Link>
                            <Nav.Link className="text-danger" onClick={()=>{leave(props.setIsAuth, props.setUser)}}>выйти</Nav.Link>
                            <Nav.Link href="/cart"><i className="bi bi-cart"></i></Nav.Link>
                            {role == "1" ? <Nav.Link href="/admin">Админ-панель</Nav.Link> : <></>}
                        </Nav> :
                        <Nav>
                            <Nav.Link href="#registry" onClick={() => {
                                handleShowRegistryModal(true)
                            }}>Регистрация</Nav.Link>
                            <Nav.Link href="#login" onClick={() => handleShowLoginModal(true)}>Войти</Nav.Link>
                        </Nav>
                    }

                </Navbar.Collapse>
            </Container>
            <LoginModal show={showLoginModal} handleClose={handleShowLoginModal} handleUser={props.setUser} handleIsAuth={props.setIsAuth}/>
            <RegistryModal show={showRegistryModal} handleClose={handleShowRegistryModal}/>
        </Navbar>
    )
}