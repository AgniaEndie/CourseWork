import {Container, ListGroup} from "react-bootstrap";

type props = {
    selectedCategory: number,
    setHandleSelectedCategory: any
}

export function AdminCategoryComponent(props: props) {
    return (
        <Container>
            <ListGroup as="ul">
                <ListGroup.Item as="li" key={0} onClick={() => {
                    props.setHandleSelectedCategory(0)
                }}>
                    Пользователи
                </ListGroup.Item>
                <ListGroup.Item as="li" key={1} onClick={() => {
                    props.setHandleSelectedCategory(1)
                }}>
                    Категории
                </ListGroup.Item>
                <ListGroup.Item as="li" key={2} onClick={() => {
                    props.setHandleSelectedCategory(2)
                }}>
                    Товары
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}