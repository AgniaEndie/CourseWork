import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {login} from "../services/AuthService.ts";
type props = {
    show:boolean,
    handleClose:any,
    handleUser:any,
    handleIsAuth:any
}
export function LoginModal(props:props){
    const [name,setName] = useState("")
    const handleName = (event:any) =>{
        setName(event.target.value)
    }

    const [password,setPassword] = useState("")
    const handlePassword = (event:any) =>{
        setPassword(event.target.value)
    }

    return(
        <>
            <Modal show={props.show} onHide={() => {props.handleClose(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Вход</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MyOwnLogin"
                                value={name}
                                onChange={(event) => handleName(event)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="****"
                                value={password}
                                onChange={(event)=>{handlePassword(event)}}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {props.handleClose(false)}}>
                        Закрыть
                    </Button>
                    <Button variant="success" onClick={() => {login(name,password,props.handleClose,props.handleUser, props.handleIsAuth)}}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}