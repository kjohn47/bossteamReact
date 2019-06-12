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
    passwordRecover: string;
}

export interface IloginMenuTranslations {
    PT: IloginMenu;
    EN: IloginMenu;
}

export interface ILogin {
    loginText?: IloginMenu;
    loginAction?: ILoginActions;
    loading?: boolean;
    loggedUser?: IcurrentUser;
    isLogged?: boolean;
    tryLogin?: string;
}

export interface ILoginActions {
    handleUser?(event: any): void;
    handlePassword?(event: any): void;
    makeLogin?(): void; 
    handleKeyPress?(event: any, focus: string, submit?:boolean): void;
    state?: ILoginState;  
}

export interface ILoginReduxActions {
    makeLogin?( user: string, password: string ): Function;
    makeLogout?( user: IcurrentUser ): Function;
    resetLoginStatus?(): Function;
}

export interface ILoginState {
    user: string;
    password: string;
    invalidUser: boolean;
    emptyUser: boolean;
    emptyPassword:boolean;
    loginAttempt: boolean;
}

export interface ILoginResponse {
    success: boolean;
    user?: IcurrentUser; 
}

export interface IloginFormHeaderTranslations {
    PT: IloginFormHeader;
    EN: IloginFormHeader;
}

export interface IloginFormHeader {
    title: string;
    warning: string;
}

export interface INeddLoginReduxProps {
    isLogged?: boolean;
    loggedUser?: IcurrentUser;
    loginFormHeader?: IloginFormHeader;
}