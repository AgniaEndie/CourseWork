import {Container} from "react-bootstrap";
import {AdminUsersPage} from "./AdminUsersPage.tsx";
import {AdminCategoryPage} from "./AdminCategoryPage.tsx";
import {AdminProductsPage} from "./AdminProductsPage.tsx";

type props = {
    selectedCategory: number,
    setHandleSelectedCategory: any
}


export function AdminComponent(props: props) {

    switch (props.selectedCategory) {
        case 0:
            return (
                <>
                    <Container>
                        <AdminUsersPage selectedCategory={props.selectedCategory}/>
                    </Container>
                </>
            )
        case 1:
            return (
                <Container>
                    <AdminCategoryPage selectedCategory={props.selectedCategory}/>
                </Container>
            )
        case 2:
            return(
                <Container>
                    <AdminProductsPage selectedCategory={props.selectedCategory}/>
                </Container>
            )
    }
}







