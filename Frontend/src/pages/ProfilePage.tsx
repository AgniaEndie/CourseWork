import {Header} from "../components/Header.tsx";

type props = {
    isAuth: boolean,
    setIsAuth: any,
    user: authModel,
    setUser: any
}

export function ProfilePage(props:props){
    return (
        <>
            <Header isAuth={props.isAuth} setIsAuth={props.setIsAuth} user={props.user} setUser={props.setUser}/>
        </>
    )
}