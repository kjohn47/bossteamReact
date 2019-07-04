import { IcurrentUser } from "./currentUser";
import { ImenuText } from "./menu";
import { ptCode, enCode } from "../settings";
import { IUserSession } from "./myAccount";

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
    stayLoggedIn: string;
}

export interface IloginMenuTranslations {
    [ptCode]: IloginMenu;
    [enCode]: IloginMenu;
}

export interface ILogin {
    menuText?: ImenuText;
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
    handleIsPermanent?(): void;
    state?: ILoginState;  
}

export interface ILoginReduxActions {
    makeLogin?( user: string, password: string, isPermanent: boolean ): Function;
    makeLogout?(): Function;
    resetLoginStatus?(): Function;
}

export interface ILoginState {
    user: string;
    password: string;
    invalidUser: boolean;
    emptyUser: boolean;
    emptyPassword:boolean;
    loginAttempt: boolean;
    isPermanent: boolean;
}

export interface ILoginResponse {
    success: boolean;
    user?: IcurrentUser; 
    session?: IUserSession;
}

export interface IloginFormHeaderTranslations {
    [ptCode]: IloginFormHeader;
    [enCode]: IloginFormHeader;
}

export interface IloginFormHeader {
    title: string;
    warning: string;
}

export interface INeedLoginReduxProps {
    isLogged?: boolean;
    userSession?: IUserSession;
    loginFormHeader?: IloginFormHeader;
}