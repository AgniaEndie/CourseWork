import {Header} from "../components/Header.tsx";
import {Button, Card, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {addCart, getProduct} from "../network/Api.ts";
import {getPayloadFromJWT} from "../services/AuthService.ts";
import {useParams} from "react-router-dom";

type props = {
    isAuth: boolean,
    setIsAuth: any,
    user: authModel,
    setUser: any
}

export function ProductPage(props: props) {
    let id = useParams();
    useEffect(() => {
        getProduct(id.id, handleProduct);
    }, []);


    const [product, setProduct] = useState<Product>()

    const handleProduct = (data: Product) => {
        setProduct(data)
    }


    return (
        <>
            <Header isAuth={props.isAuth} setIsAuth={props.setIsAuth} user={props.user} setUser={props.setUser}/>
            <Container style={{position: "relative"}}>
                {product != undefined ? <Card key={product.uuid}>
                    <Card.Body style={{width: "100%", alignItems: "center"}}>
                        <Card.Title>{product.title}</Card.Title>
                        <div style={{width: 100 + "%", display: "flex", justifyContent: "center"}}>
                            <Card.Img src={`http://localhost:8080/image/${product.uuid}`} style={{width: 500 + "px",}}/>
                        </div>

                        <Card.Text style={{marginBottom: 3 + "%"}}>
                            {product.about}
                        </Card.Text>

                        <div style={{position: "absolute", bottom: "2.5%", right: 2.5 + "%"}}>
                            {props.isAuth ? <Button variant="outline-success" onClick={() => {
                                    let payloads = getPayloadFromJWT(props.user.access_token)
                                    addCart(JSON.stringify({user_id: payloads.uuid, product_id: product?.uuid, count: 1}))
                                }}>Купить за {product.price} руб</Button> :
                                <Button variant="outline-warning" onClick={() => {

                                }}>Пожалуйста авторизируйтесь</Button>}
                        </div>
                    </Card.Body>
                </Card> : <></>}
            </Container>
        </>
    )
}