import {useEffect, useState} from "react";
import {getCategory} from "../network/Api.ts";
import {Container, ListGroup} from "react-bootstrap";

type props = {
    selectedCategory: CategoryModel,
    setSelectedCategory : any
}

export function CategoryComponent(props:props) {
    const [categories, setCategories] = useState<Array<CategoryModel>>([])

    const handleSetCategory = (data: any) => {
        setCategories(data)
    }

    useEffect(() => {
        getCategory(handleSetCategory)
    }, [])
    console.log(categories)
    const listItems = categories.map(category =>
        {
            if(category.uuid == props.selectedCategory.uuid){
                return(
                    <ListGroup.Item as="li" key={category.uuid} onClick={() => {props.setSelectedCategory(category)}} active>
                        {category.title}
                    </ListGroup.Item>
                )
            }else{
                return(
                    <ListGroup.Item as="li" key={category.uuid} onClick={() => {props.setSelectedCategory(category)}}>
                        {category.title}
                    </ListGroup.Item>
                )
            }
        }
    );

    return <Container><ListGroup as="ul">{listItems}</ListGroup></Container>;
}