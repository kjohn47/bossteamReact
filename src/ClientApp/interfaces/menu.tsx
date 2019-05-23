import { IcurrentUser } from "./currentUser";
import { IloginMenu } from './login';
// Menu props
export interface ImenuProps {
    isLogged : boolean;
    currentUsr? : IcurrentUser;
    menuText? : ImenuText;
    appGetLanguage: Function;
}

// Menu states
export interface ImenuState {
    isOpen: boolean;
}

//Menu and submenu text data
export interface ImenuText {
    newsTitle : string;
    blogs : IblogsText;
    sales : IsalesText;
    tours : ItoursText;
    events : IeventsText;
    language : ILanguageText;
    user : IusrMnText;    
}

//Blogs Menu
export interface IblogsText {
    title : string;
    list : string;
    mine : string;
    add : string;
    editSpace : string;
}

//Sales Menu
export interface IsalesText {
    title : string;
    list : string;
    mine : string;
    add : string;
}

//Tours Menu
export interface ItoursText {
    title : string;
    list : string;
    mine : string;
    add : string;
}

//Events Menu
export interface IeventsText {
    title : string;
    list : string;
    mine : string;
    add : string;
}

//User Menu
export interface IusrMnText {
    account : string;
    administration : string;
    logout : string;
}

export interface ILanguageText {
    title: string;
    portuguese: string;
    english: string;
}

export interface IUserMenu {
    userMnText?: IusrMnText;
    user?: IcurrentUser;
    userMenuAction?: Function;
    loading?:boolean;
}