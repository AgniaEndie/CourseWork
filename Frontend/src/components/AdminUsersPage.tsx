import {Container, Table} from "react-bootstrap";
import {AdminTableNavbar} from "./AdminTableNavbar.tsx";
import {useEffect, useState} from "react";
import {adminGetAllUsers} from "../network/Api.ts";

type props ={
    selectedCategory:number
}


export function AdminUsersPage(props:props){

    useEffect(() => {
        adminGetAllUsers(handleSetUsers)
    }, []);



    const [show,setIsShow] = useState(false)

    const handleIsShow = (data:any) =>{
        setIsShow(data)
    }

    const [users,setUsers] = useState<Array<AdminUser>>()

    const handleSetUsers = (data:any)=>{
        setUsers(data)
    }

    const [selectedElem, setSelectedElem] = useState<AdminUser>()

    const handleSetSelectedElem = (data:any)=>{
        setSelectedElem(data)
    }

    const usersRow = users?.map((elem)=>{
        return (
            <tr onClick={()=>{handleIsShow(true); handleSetSelectedElem(elem)}} key={users?.indexOf(elem)} >
                <td>{users?.indexOf(elem)}</td>
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td>{elem.role}</td>
            </tr>
        )
    })
    useEffect(() => {
        adminGetAllUsers(handleSetUsers)
    }, [show]);
    return (
        <Container>
            <AdminTableNavbar selectedCategory={props.selectedCategory} selectedElem={selectedElem} show={show} handleIsShow={handleIsShow}/>

            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Никнейм</th>
                    <th>Почта</th>
                    <th>Роль</th>
                </tr>
                </thead>
                <tbody>
                {usersRow}
                </tbody>
            </Table>
        </Container>
    )
}