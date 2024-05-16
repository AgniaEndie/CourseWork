import {Header} from "../components/Header.tsx";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {getPayloadFromJWT} from "../services/AuthService.ts";
import {AdminCategoryComponent} from "../components/AdminCategoryComponent.tsx";
import {AdminComponent} from "../components/AdminComponent.tsx";


type props = {
    isAuth: boolean,
    setIsAuth: any,
    user: authModel,
    setUser: any
}
export function AdminPage(props:props){
    const navigate = useNavigate();

    useEffect(() => {
        try{
            let token = props.user
            let payload = getPayloadFromJWT(token.access_token)
            if(payload.role != "1"){
                navigate("/")
            }
        }catch (e){
            navigate("/")
        }
    }, [props.isAuth]);

    const [selectedCategory, setSelectedCategory] = useState<number>(0)
    const handleSetSelectedCategory = (data:number) =>{
        setSelectedCategory(data)
    }

    return (
        <>
            <Header isAuth={props.isAuth} setIsAuth={props.setIsAuth} user={props.user} setUser={props.setUser}/>
            <div style={{float: "left", width: "20%"}}>
                <AdminCategoryComponent selectedCategory={selectedCategory} setHandleSelectedCategory={handleSetSelectedCategory}/>
            </div>
            <div style={{float: "left", width: "80%"}}>
                <AdminComponent selectedCategory={selectedCategory} setHandleSelectedCategory={handleSetSelectedCategory} />
            </div>
        </>
    )
}