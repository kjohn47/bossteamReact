import {ImenuText} from './menu';
import {InewsLanguage} from './news';
import {IAddCommentText, ICommentText, IErrorHandling, ILoading, IErrorHandlingText} from './common';
import { IloginMenu, ILoginResponse, IloginFormHeader } from './login';
import { IRegistrationText } from './registration';
import { IMyAccountAllText } from './myAccount';
export interface IAppSettings {
    loginForm?: IloginMenu; 
    loginFormHeader?: IloginFormHeader;
    registrationText?: IRegistrationText;
    menuText?: ImenuText;
    newsLanguage?: InewsLanguage;
    addCommentText?: IAddCommentText;
    commentText?: ICommentText;   
    myAccountText?: IMyAccountAllText; 
    presentationLanguage?: string;
    fetchData?: IFetchData;
    pageNotFoundText?: IErrorHandlingText;
}

export interface IappAction{
    type:string;
    payload?:Ipayload;
}

export interface IappActions{
    appGetLanguage?(language: string ): Function;
}

interface Ipayload {
    language?: string;
    login?: ILoginResponse;
    error?: IErrorHandling;
    isLocalized?: boolean;
    loadLocalization?: string;
}

export interface IFetchData {
    error?: IErrorHandling;
    loading?: ILoading;
}