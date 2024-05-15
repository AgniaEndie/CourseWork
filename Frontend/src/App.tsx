import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MainPage} from "./pages/MainPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {CataloguePage} from "./pages/CataloguePage.tsx";
import {useEffect, useState} from "react";
import {getPayloadFromJWT, prepareAuth} from "./services/AuthService.ts";
import {CartPage} from "./pages/CartPage.tsx";
import {ProductPage} from "./pages/ProductPage.tsx";
import {AdminPage} from "./pages/AdminPage.tsx";

export function App() {
    useEffect(() => {
        prepareAuth(handleSetIsAuth, handleUserData)
    }, [])



    const [userData, setUserData] = useState<authModel>({access_token: "", refresh_token: ""})
    const handleUserData = (data: authModel) => {
        setUserData(data)
    }
    const [isAuth, setIsAuth] = useState(false)
    const handleSetIsAuth = (data: boolean) => {
        setIsAuth(data)
    }
    const [isAdmin, setIsAdmin] = useState(false)
    const handleSetIsAdmin = (data: boolean) => {
        setIsAdmin(data)
    }

    useEffect(() => {
        if(isAuth){
            let payload = getPayloadFromJWT(userData.access_token)
            console.log(payload.role)
            if(payload.role == "1"){
                handleSetIsAdmin(true)
            }
        }
    }, [isAuth]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage isAuth={isAuth} setIsAuth={handleSetIsAuth} user={userData} setUser={handleUserData}/>,
        },
        {
            path: "/profile",
            element: isAuth ?
                <ProfilePage isAuth={isAuth} setIsAuth={handleSetIsAuth} user={userData} setUser={handleUserData}/> :
                <MainPage isAuth={isAuth} setIsAuth={handleSetIsAuth} user={userData} setUser={handleUserData}/>
        },
        {
            path: "/catalog",
            element: <CataloguePage/>
        },
        {
            path: "/cart",
            element: isAuth ?
                <CartPage isAuth={isAuth} setIsAuth={handleSetIsAuth} user={userData} setUser={handleUserData}/> :
                <MainPage isAuth={isAuth} setIsAuth={handleSetIsAuth} user={userData} setUser={handleUserData}/>
        },
        {
            path: "/product/:id",
            element: <ProductPage isAuth={isAuth} setIsAuth={handleSetIsAuth} user={userData} setUser={handleUserData}/>
        },
        {
            path: "/admin",
            element: isAdmin ? <AdminPage isAuth={isAuth} setIsAuth={handleSetIsAuth} user={userData} setUser={handleUserData} /> : <MainPage isAuth={isAuth} setIsAuth={handleSetIsAuth} user={userData} setUser={handleUserData}/>
        }
    ]);
    return (
        <RouterProvider router={router}/>
    )
}