import {Container, Table} from "react-bootstrap";
import {AdminTableNavbar} from "./AdminTableNavbar.tsx";
import {useEffect, useState} from "react";
import {getProducts} from "../network/Api.ts";

type props ={
    selectedCategory:number
}
export function AdminProductsPage(props:props){

    useEffect(() => {
        getProducts(handleSetProducts)
    }, []);



    const [show,setIsShow] = useState(false)

    const handleIsShow = (data:any) =>{
        setIsShow(data)
    }

    const [products,setProducts] = useState<Array<Product>>()

    const handleSetProducts = (data:any)=>{
        setProducts(data)
        console.log(data)
    }

    const [selectedElem, setSelectedElem] = useState<AdminUser>()

    const handleSetSelectedElem = (data:any)=>{
        setSelectedElem(data)
    }

    const productRow = products?.map((elem)=>{
        return (
            <tr onClick={()=>{handleIsShow(true); handleSetSelectedElem(elem)}} key={products?.indexOf(elem)} >
                <td>{products?.indexOf(elem)}</td>
                <td>{elem.title}</td>
                <td>{elem.about}</td>
                <td>{elem.price}</td>
                <td>{elem.amount}</td>
            </tr>
        )
    })
    useEffect(() => {
        getProducts(handleSetProducts)
    }, [show]);


    return (
        <Container>
            <AdminTableNavbar selectedCategory={props.selectedCategory} selectedElem={selectedElem} show={show} handleIsShow={handleIsShow} />

            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Наименование</th>
                    <th>Описание</th>
                    <th>Цена</th>
                    <th>Количество</th>
                </tr>
                </thead>
                <tbody>
                {productRow}
                </tbody>
            </Table>
        </Container>
    )
}