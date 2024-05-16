import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {EditableDialogue} from "./EditableDialogue.tsx";
import {useState} from "react";
import {RegistryModal} from "./RegistryModal.tsx";
import {CreateCategoryModal} from "./CreateCategoryModal.tsx";
import {CreateProductModal} from "./CreateProductModal.tsx";

type props = {
    selectedCategory: number,
    show: any,
    handleIsShow: any,
    selectedElem: any,
}

export function AdminTableNavbar(props: props) {
    var categories = [{code: 0, title: "Пользователи"}, {code: 1, title: "Категории"}, {code: 2, title: "Товары"}]

    const [isShowRegistry, setIsShowRegistry] = useState(false)

    const handleSetIsShowRegistry = (data: any) => {
        setIsShowRegistry(data)
    }

    const [isShowCreateCategory,setIsShowCreateCategory] = useState(false)
    const handleSetIsShowCreateCategory = (data:any) =>{
        setIsShowCreateCategory(data)
    }

    const [isShowProductCategory,setIsShowProductCategory] = useState(false)
    const handleSetIsShowProductCategory = (data:any)=>{
        setIsShowProductCategory(data)
    }

    const switchCat = () => {
        switch (props.selectedCategory) {
            case 0:
                return (
                    <NavDropdown.Item href="#action/3.1"
                                      onClick={() => handleSetIsShowRegistry(true)}>Создать</NavDropdown.Item>
                )
            case 1:
                return (
                    <NavDropdown.Item href="#action/3.2"
                                      onClick={() => handleSetIsShowCreateCategory(true)}>Создать</NavDropdown.Item>
                )
            case 2:
                return (
                    <NavDropdown.Item href="#action/3.3"
                                      onClick={() => handleSetIsShowProductCategory(true)}>Создать</NavDropdown.Item>
                )
            default:
                return (
                    <NavDropdown.Item href="#action/3.1"
                                      onClick={() => handleSetIsShowRegistry(true)}>СоздатьX</NavDropdown.Item>
                )
        }
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">{categories.map((elem) => {
                        if (elem.code == props.selectedCategory) {
                            return (elem.title)
                        }
                    })}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Действия" id="basic-nav-dropdown">
                                {switchCat()}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <EditableDialogue selectedElem={props.selectedElem} show={props.show} handleClose={props.handleIsShow} selectedCategory={props.selectedCategory}/>
            <RegistryModal show={isShowRegistry} handleClose={handleSetIsShowRegistry}/>
            <CreateCategoryModal show={isShowCreateCategory} handleClose={handleSetIsShowCreateCategory} />
            <CreateProductModal show={isShowProductCategory} handleClose={handleSetIsShowProductCategory}/>
        </>
    )
}