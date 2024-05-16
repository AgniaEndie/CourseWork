import {useEffect, useState} from "react";
import {getProduct, updateCart} from "../network/Api.ts";

type props = {
    elem: Cart,
    handleUpdateCart: any,
    totalCount: number,
    handleSetTotalCount: any
}

export function ListElem(props: props) {

    useEffect(() => {
        getProduct(props.elem.product_id, handleProductLocale)

        props.handleSetTotalCount(props.elem.count * product.price, isMinus)

    }, [props.elem])

    const [isMinus, setIsMinus] = useState(false)

    const handleSetElemCount = (item: number) => {
        props.elem.count = item
        updateCart(props.elem, props.handleUpdateCart)
    }


    const [product, setProduct] = useState<Product>({
        uuid: "",
        title: "",
        about: "",
        price: 0,
        amount: 0,
        category: "",
    })
    const handleProductLocale = (data: any) => {
        console.log(data)
        setProduct(data);
    };


    return <div className="card rounded-3 mb-4">
        <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-2 col-lg-2 col-xl-2">
                    <img
                        src={`http://localhost:8080/image/${product.uuid}`}
                        className="img-fluid rounded-3" alt={`${product.title}`}/>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3">
                    <p className="lead fw-normal mb-2">{product.title}</p>
                    <p>{product.about}</p>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2"
                            onClick={() => {
                                handleSetElemCount(props.elem.count - 1)
                            }}>
                        <i className="fas fa-minus">-</i>
                    </button>
                    {props.elem.count}
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2"
                            onClick={() => {
                                handleSetElemCount(props.elem.count + 1)
                            }}>
                        <i className="fas fa-plus">+</i>
                    </button>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h5 className="mb-0">{product.price} rub</h5>
                </div>
                <div className="col-md-1 col-lg-1 col-xl-1 text-end">

                </div>
            </div>
        </div>
    </div>
}