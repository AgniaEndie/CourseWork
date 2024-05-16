import {Container, Table} from "react-bootstrap";
import {AdminTableNavbar} from "./AdminTableNavbar.tsx";
import {useEffect, useState} from "react";
import {getCategory} from "../network/Api.ts";

type props ={
    selectedCategory:number
}


export function AdminCategoryPage(props:props){

    useEffect(() => {
        getCategory(handleSetCategories)
    }, []);



    const [show,setIsShow] = useState(false)

    const handleIsShow = (data:any) =>{
        setIsShow(data)
    }

    const [categories,setCategories] = useState<Array<CategoryModel>>()

    const handleSetCategories = (data:any)=>{
        setCategories(data)
    }

    const [selectedElem, setSelectedElem] = useState<AdminUser>()

    const handleSetSelectedElem = (data:any)=>{
        setSelectedElem(data)
    }

    const productRow = categories?.map((elem)=>{
        return (
            <tr onClick={()=>{handleIsShow(true); handleSetSelectedElem(elem)}} key={categories?.indexOf(elem)} >
                <td>{categories?.indexOf(elem)}</td>
                <td>{elem.title}</td>
            </tr>
        )
    })
    useEffect(() => {
        getCategory(handleSetCategories)
    }, [show]);
    return (
        <Container>
            <AdminTableNavbar selectedCategory={props.selectedCategory} selectedElem={selectedElem} show={show} handleIsShow={handleIsShow} />

            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Наименование</th>
                </tr>
                </thead>
                <tbody>
                {productRow}
                </tbody>
            </Table>
        </Container>
    )
}