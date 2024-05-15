import {loginRequest, registryRequest} from "../network/Api.ts";

export function getPayloadFromJWT(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);

    return parsedPayload;
}

export function prepareAuth(setIsAuth: any, setUser: any) {
    let raw_string = localStorage.getItem("auth")
    if (raw_string !== null) {
        let user: authModel = JSON.parse(raw_string)
        console.log(user)
        setIsAuth(true)
        setUser(user)
    } else {
        setIsAuth(false)
    }
}

export function registry(login: string, email: string, password: string, handleClose: any) {
    const data = JSON.stringify({
        "name": login,
        "email": email,
        "password": password
    });

    registryRequest(data, handleClose)

}

export function login(login: string, password: string, handleClose: any, handleUser: any, handleIsAuth: any) {
    const data = JSON.stringify({
        "name": login,
        "password": password,
    })
    loginRequest(data, handleClose, handleUser, handleIsAuth)
}

export function leave(handleIsAuth: any, handleSetUser: any) {
    handleIsAuth(false)
    handleSetUser({access_token: "", refresh_token: ""})
    localStorage.removeItem("auth")
}

export function getAccessToken() : string{
    let raw_token = localStorage.getItem("auth")
    if (raw_token != null) {
        let token = JSON.parse(raw_token)
        return token.access_token
    } else {
        return ""
    }
}