import axios from "axios";
import {getAccessToken} from "../services/AuthService.ts";


const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getAccessToken()}`,
        'Access-Control-Allow-Origin': '*'
    }
});

export function registryRequest(data: string, handleClose: any) {
    instance.post('/auth/registry', data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.status == 200) {
                handleClose(false)
            } else {
                handleClose(true)
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export function loginRequest(data:string,handleClose:any,handleUser:any,handleIsAuth:any){
    instance.post('/auth/login', data)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.status == 200) {
                handleUser(response.data)
                handleIsAuth(true)
                localStorage.setItem("auth", JSON.stringify(response.data))
                handleClose(false)
            } else {
                handleClose(true)
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getCategory(handleCategory:any){
    instance.get('/category/all').then(
        (response)=>{
            handleCategory(response.data)
        }
    ).catch((e) =>{
        console.log(e)
    })
}

export function getProducts(handleProduct:any){
    instance.get('/product/all').then(
        (response)=>{
            handleProduct(response.data)
        }
    ).catch((e) =>{
        console.log(e)
    })
}


export function getProductByCategory(code:string,handleProduct:any){
    instance.get(`/products/${code}`).then(
        (response)=>{
            handleProduct(response.data)
        }
    ).catch((e) =>{
        console.log(e)
    })
}

export function getProduct(code:any,handleProduct:any){
    instance.get(`/product/${code}`).then(
        (response) => {
            handleProduct(response.data)
            console.log(response.data)
        }
    ).catch((e) =>{
        console.log(e)
    })
}

export function addCart(data:any){
    instance.post('/cart/add',data).then(
        (response) =>{
            if(response.status == 200){
                //handleIsAdded(true)
                console.log(response.data)
            }
        }
    ).catch((e)=>{
        console.log(e)
    })
}

export function getCart(handleCart:any){
    instance.get('/cart').then((response)=>{
        handleCart(response.data)
    }).catch((e)=>{
        console.log(e)
    })
}

export function updateCart(data:any,handleCart:any){
    instance.put('/cart/update',JSON.stringify(data)).then((response)=>{
        handleCart(1)
    }).catch((e)=>{
        console.log(e)
    })
}

export function adminGetAllUsers (handleUsers:any){
    instance.get("/users/all").then((response)=>{
        handleUsers(response.data)
    }).catch((e)=>{
        console.log(e)
    })
}

export function removeUsers(code:any,handleSuccess:any){
    instance.delete(`/users/remove/${code}`).then((response)=>{
        if(response.status == 200){
            handleSuccess(true)
        }
    })
}

export function createCategory(data:any, handleSuccess:any){
    let upd = {
        "title": data
    }

    instance.post('/category/create',upd).then((response => {
        if(response.status == 200){
            handleSuccess(false)
        }
    }))
}

export function removeCategory(code:any, handleSuccess:any){
    instance.delete(`/category/delete/${code}`).then((response)=>{
        if(response.status == 200){
            handleSuccess(true)
        }
    })
}

export function createProduct(data:any, handleSuccess:any) {
    instance.post('/product/create',data).then((response)=>{
        handleSuccess(false)
    })
}
export function removeProduct(code:any, handleSuccess:any){
    instance.delete(`/product/delete/${code}`).then((response)=>{
        if(response.status == 200){
            handleSuccess(true)
        }
    })
}