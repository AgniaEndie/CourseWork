import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {createCategory} from "../network/Api.ts";

type props = {
    show: any,
    handleClose: any
}

export function CreateCategoryModal(props: props) {

    const [title, setTitle] = useState("")
    const handleSetTitle = (data: any) => {
        setTitle(data.target.value)
    }

    return (
        <Modal show={props.show} onHide={() => {
            props.handleClose(false)
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Почтовый адрес</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Коробки"
                            value={title}
                            onChange={(event) => {
                                handleSetTitle(event)
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    props.handleClose(false)
                }}>
                    Выйти
                </Button>
                <Button variant="success" onClick={() => {
                    createCategory(title, props.handleClose)
                }}>
                    Создать
                </Button>
            </Modal.Footer>
        </Modal>
    )
}