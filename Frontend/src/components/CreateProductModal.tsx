import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {createProduct, getCategory} from "../network/Api.ts";

type props = {
    show: any,
    handleClose: any
}

export function CreateProductModal(props:props){

    useEffect(() => {
        getCategory(handleSetCategories)
    }, []);

    const [categories,setCategories] = useState<Array<CategoryModel>>()
    const handleSetCategories = (data:any)=>{
        setCategories(data)
    }

    const [selectedOption,setSelectedOption] = useState("")
    const handleSetSelectedOption = (data:any) => {
        setSelectedOption(data)
    }

    const categoryDrawable = categories?.map((elem)=>{
        return <option value={elem.uuid} onChange={()=>{handleSetSelectedOption(elem.uuid)}}>{elem.title}</option>
    })

    const [title,setTitle] = useState("")
    const handleSetTitle = (data:any)=>{
        setTitle(data.target.value)
    }

    const [about,setAbout] = useState("")
    const handleSetAbout = (data:any) =>{
        setAbout(data.target.value)
    }
    const [price,setPrice] = useState(0)
    const handleSetPrice = (data:any) =>{
        setPrice(data.target.value)
    }

    const [count,setCount] = useState(0)
    const handleSetCount = (data:any) =>{
        setCount(data.target.value)
    }

    return (
        <Modal show={props.show} onHide={()=>{props.handleClose(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Наименование</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="title"
                            onChange={(event)=>{handleSetTitle(event)}}
                            value={title}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="opisanie"
                            value={about}
                            onChange={(event)=>{handleSetAbout(event)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="$"
                            value={price}
                            onChange={(event) => {handleSetPrice(event)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0"
                            value={count}
                            onChange={(event) => {handleSetCount(event)}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Категория</Form.Label>
                        <Form.Select aria-label="Категория">
                            {categoryDrawable}
                        </Form.Select>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={()=>{props.handleClose(false)}}>
                    Выйти
                </Button>
                <Button variant="success" onClick={()=>{createProduct({title:title,about:about,price:price,amount:count,category:selectedOption}, props.handleClose)}}>
                    Регистрация
                </Button>
            </Modal.Footer>
        </Modal>
    )
}