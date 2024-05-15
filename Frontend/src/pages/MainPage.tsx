import {Header} from "../components/Header.tsx";
import {CategoryComponent} from "../components/CategoryComponent.tsx";
import {ProductComponent} from "../components/ProductComponent.tsx";
import {useState} from "react";


type props = {
    isAuth: boolean,
    setIsAuth: any,
    user: authModel,
    setUser: any
}


export function MainPage(props:props){

    const [selectedCategory, setSelectedCategory] = useState<CategoryModel>({uuid:"c76d81d8-c17d-4ade-af06-ede2d4fb798a",title:"Все товары"})
    const handleSetSelectedCategory = (data:CategoryModel) =>{
        setSelectedCategory(data)
    }

    return(
        <>
            <Header isAuth={props.isAuth} setIsAuth={props.setIsAuth} user={props.user} setUser={props.setUser}/>
            <div style={{float:"left", width:"20%"}}>
                <CategoryComponent selectedCategory={selectedCategory} setSelectedCategory={handleSetSelectedCategory}/>
            </div>
            <div style={{float:"left", width:"80%"}}>
                <ProductComponent selectedCategory={selectedCategory} setSelectedCategory={handleSetSelectedCategory}/>
            </div>
        </>
    )
}