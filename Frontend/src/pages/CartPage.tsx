import {Header} from "../components/Header.tsx";
import {CartComponent} from "../components/CartComponent.tsx";
type props = {
    isAuth: boolean,
    setIsAuth: any,
    user: authModel,
    setUser: any
}
export function CartPage(props:props){
    return(
        <>
            <Header isAuth={props.isAuth} setIsAuth={props.setIsAuth} user={props.user} setUser={props.setUser}/>
            <CartComponent />
        </>
    )
}