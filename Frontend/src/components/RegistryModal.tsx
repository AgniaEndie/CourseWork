import {Button, Form, Modal} from "react-bootstrap";
import {registry} from "../services/AuthService.ts";
import {useState} from "react";
type props = {
    show:boolean,
    handleClose:any
}

export function RegistryModal(props:props) {
    const [name,setName] = useState("")
    const handleName = (event:any) =>{
        setName(event.target.value)
    }

    const [email,setEmail] = useState("")
    const handleEmail = (event:any) =>{
        setEmail(event.target.value)
    }
    const [password,setPassword] = useState("")
    const handlePassword = (event:any) =>{
        setPassword(event.target.value)
    }

    return (
        <Modal show={props.show} onHide={()=>{props.handleClose(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="MyOwnLogin"
                            onChange={(event)=>{handleName(event)}}
                            value={name}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Почтовый адрес</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="MyHyperMain@Mail.Ml"
                            value={email}
                            onChange={(event)=>{handleEmail(event)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="***"
                            value={password}
                            onChange={(event) => {handlePassword(event)}}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={()=>{props.handleClose(false)}}>
                    Выйти
                </Button>
                <Button variant="success" onClick={()=>{registry(name,email,password,props.handleClose)}}>
                    Регистрация
                </Button>
            </Modal.Footer>
        </Modal>
    )
}