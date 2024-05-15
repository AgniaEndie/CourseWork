import {useEffect, useState} from "react";
import {getProductByCategory, getProducts} from "../network/Api.ts";
import {Button, Card, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

type props = {
    selectedCategory: CategoryModel,
    setSelectedCategory: any
}

export function ProductComponent(props: props) {
    const [products, setProducts] = useState<Array<Product>>([])

    const handleSetProduct = (data: any) => {
        setProducts(data)
    }

    useEffect(() => {
        if (props.selectedCategory.uuid == "c76d81d8-c17d-4ade-af06-ede2d4fb798a") {
            getProducts(handleSetProduct)
        } else {
            getProductByCategory(props.selectedCategory.uuid, handleSetProduct)
        }
    }, [props.selectedCategory])

    const navigate = useNavigate();

    const productItems = products.map((product) =>

        <Card key={product.uuid} style={{position: "relative", marginBottom: 0.5+"%"}}>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Img src={`http://localhost:8080/image/${product.uuid}`} style={{width: "150px", float: "left"}}/>
                <Card.Text style={{position: "relative", left:"1.5%"}}>
                    {product.about}
                </Card.Text>
                <div style={{position: "absolute", bottom:"5%",right:"1.5%"}}>
                    <Button style={{float:"left"}} variant="primary" onClick={() => {
                        navigate(`/product/${product.uuid}`)
                    }}>Подробнее</Button>
                </div>
                <div style={{position: "absolute", bottom:"5%",right:"10.5%"}}>
                    <Button style={{float:"left"}} variant="primary" onClick={() => {
                        navigate(`/product/${product.uuid}`)
                    }}>Цена: {product.price} руб</Button>
                </div>
            </Card.Body>
        </Card>
    )

    return <Container>{productItems}</Container>
}