import { IcurrentUser } from "./currentUser";

//login Menu
export interface IloginMenu {
    username : string;
    password : string;
    submit : string;
    register : string;
    emptyUser: string;
    emptyPassword: string;
    invalidLogin: string;
}

export interface ILogin {
    loginText?: IloginMenu;
    loginAction?: ILoginActions;
}

export interface ILoginActions {
    handleUser?: Function;
    handlePassword?: Function;
    makeLogin?: Function;  
    state?: ILoginState;  
}

export interface ILoginState {
    user: string;
    password: string;
}

export interface ILoginResponse {
    success: boolean;
    user?: IcurrentUser; 
}