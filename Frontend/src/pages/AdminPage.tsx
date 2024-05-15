import {Header} from "../components/Header.tsx";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {getPayloadFromJWT} from "../services/AuthService.ts";


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

    return (
        <>
            <Header isAuth={props.isAuth} setIsAuth={props.setIsAuth} user={props.user} setUser={props.setUser}/>
            <div>Adminka</div>
        </>
    )
}