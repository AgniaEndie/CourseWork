type authModel = {
    access_token: string,
    refresh_token: string
}

type CategoryModel = {
    "uuid": string,
    "title": string
}

type Product = {
    "uuid": string,
    "title": string,
    "about": string,
    "price": number,
    "amount": number,
    "category": string
}

type Cart = {
    "uuid":string,
    "user_id":string,
    "product_id":string,
    "count":number
}