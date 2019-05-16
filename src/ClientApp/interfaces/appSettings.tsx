import {ImenuText} from './menu';
import {InewsLanguage} from './news';
import {IAddCommentText, ICommentText} from './common';
import {IcurrentUser} from './currentUser';
export interface IAppSettings {
    menuText?: ImenuText;
    newsLanguage?: InewsLanguage;
    addCommentText?: IAddCommentText;
    commentText?:ICommentText;
    presentationLanguage?: string;
    isLogged?: boolean;
    loggedUser?: IcurrentUser;
}

export interface IappAction{
    type:string;
    payload?:Ipayload;
}

export interface IappActions{
    appGetLanguage?: Function;
    makeLogin?: Function;
    makeLogout?: Function;
}

interface Ipayload {
    language?: string;
    user?: string;
    password?: string;
}