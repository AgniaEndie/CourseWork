import {Button, Modal} from "react-bootstrap";
import {removeCategory, removeProduct, removeUsers} from "../network/Api.ts";

type props = {
    show: any,
    handleClose: any,
    selectedElem: any,
    selectedCategory: any
}


export function EditableDialogue(props: props) {
    console.log(props.selectedElem)

    const variantsList = () => {
        switch (props.selectedCategory) {
            case 0:
                return (<>
                    <Button variant="warning" onClick={() => {
                        props.handleClose(false)
                    }} disabled>
                        Изменить
                    </Button>
                    <Button variant="danger" onClick={() => {
                        removeUsers(props.selectedElem.uuid, handleSuccess)
                    }}>
                        Удалить
                    </Button></>)
            case 1:
                return (<><Button variant="warning" onClick={() => {
                    props.handleClose(false)
                }} disabled>
                    Изменить
                </Button>
                    <Button variant="danger" onClick={() => {
                        removeCategory(props.selectedElem.uuid, handleSuccess)
                    }}>
                        Удалить
                    </Button></>)
            case 2:
                return (<>
                    <Button variant="warning" onClick={() => {
                        props.handleClose(false)
                    }} disabled>
                        Изменить
                    </Button>
                    <Button variant="danger" onClick={() => {
                        removeProduct(props.selectedElem.uuid, handleSuccess)
                    }}>
                        Удалить
                    </Button>
                </>)
            default:
                return (<>
                    <Button variant="warning" onClick={() => {
                        props.handleClose(false)
                    }} disabled>
                        Изменить
                    </Button>
                    <Button variant="danger" onClick={() => {
                        removeUsers(props.selectedElem.uuid, handleSuccess)
                    }}>
                        Удалить
                    </Button>
                </>)
        }
    }

    const handleSuccess = (data: any) => {
        props.handleClose(!data);
    }

    return (
        <Modal show={props.show} onHide={() => {
            props.handleClose(false)
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Действия</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                {variantsList()}
            </Modal.Footer>
        </Modal>
    )
}