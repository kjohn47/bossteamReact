import {ImenuText} from './menu';
import {InewsLanguage} from './news';
import {IAddCommentText, ICommentText} from './common';
import {IcurrentUser} from './currentUser';
import { IloginMenu } from './login';
export interface IAppSettings {
    loginForm?: IloginMenu; 
    menuText?: ImenuText;
    newsLanguage?: InewsLanguage;
    addCommentText?: IAddCommentText;
    commentText?:ICommentText;
    presentationLanguage?: string;
    isLogged?: boolean;
    loggedUser?: IcurrentUser;
    tryLogin?: string;
}

export interface IappAction{
    type:string;
    payload?:Ipayload;
}

export interface IappActions{
    appGetLanguage?: Function;
    makeLogin?: Function;
    makeLogout?: Function;
    resetLoginStatus?: Function;
}

interface Ipayload {
    language?: string;
    user?: string;
    password?: string;
}