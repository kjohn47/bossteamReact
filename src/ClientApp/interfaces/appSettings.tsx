import {ImenuText} from './menu';
import {InewsLanguage} from './news';
import {IAddCommentText, ICommentText, IErrorHandling, ILoading} from './common';
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
    fetchData?: IFetchData;
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
    user?: IcurrentUser | boolean;
    error?: IErrorHandling;
    isLocalized?: boolean;
    loadLocalization?: string;
}

export interface IFetchData {
    error?: IErrorHandling;
    loading?: ILoading;
}