import {Container, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getCart} from "../network/Api.ts";
import {ListElem} from "./ListElem.tsx";

export function CartComponent() {
    const [carts, setCarts] = useState<Array<Cart>>([]);

    const handleCart = (data: any) => {
        setCarts(data);
    };

    useEffect(() => {
        getCart(handleCart);
    }, []);


    const [doUpdate, setDoUpdate] = useState(0)

    const handleUpdateCart = (data: any) => {
        setDoUpdate(data)
    }
    useEffect(() => {
        if (doUpdate == 1) {
            getCart(handleCart);
        }
        handleUpdateCart(0)
    }, [doUpdate]);





    const [totalCount, setTotalCount] = useState(0)
    const handleSetTotalCount = (item: any, isMinus:boolean) => {
        console.error(isMinus)
        console.error(item)
        setTotalCount(item)
    }

    const renderedList = carts.map((elem) => {

        return <ListElem elem={elem} handleUpdateCart={handleUpdateCart} totalCount={totalCount}
                         handleSetTotalCount={handleSetTotalCount}/>

    });
    // list.map((item)=>{
    //     setTotalCount(totalCount + item)
    // })


    return (
        <Container>
            <h5>Корзина</h5>
            <ListGroup>
                {renderedList}
                <ListGroup.Item>
                    <div>
                        Общая Стоимость: {totalCount} rub
                    </div>
                </ListGroup.Item>
            </ListGroup>

        </Container>
    );
}
