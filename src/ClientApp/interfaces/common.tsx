import { INewsData, IViewNewsDataServer, InewsLanguage } from "./news";
import { IhomeDataServer } from "./home";
import { ILoginResponse, IloginMenu, IloginFormHeader } from "./login";
import { IRegistrationResult, ICheckUsernameResult, IRegistrationText } from "./registration";
import { IcurrentUser } from "./currentUser";
import { IMyAccountResponse, IMyAccountAllText } from "./myAccount";
import { ImenuText } from "./menu";
import { 
    ptCode, 
    enCode, 
    ERROR_ADD_COMMENT, 
    ERROR_GENERIC, 
    ERROR_LOGIN, 
    ERROR_LOGOUT, 
    ERROR_HOME_PAGE, 
    ERROR_GET_NEWS_LIST, 
    ERROR_GET_NEWS_DATA, 
    ERROR_MYACCOUNT_CHANGENAME, 
    ERROR_USER_REGISTRATION, 
    ERROR_MYACCOUNT_CHANGEPASSWORD, 
    ERROR_MYACCOUNT_CLOSE_DISABLE, 
    TEXT_LOGIN_MENU,
    TEXT_NEED_LOGIN,
    TEXT_REGISTRATION,
    TEXT_MENU,
    TEXT_NEWS_LIST,
    TEXT_COMMENT_ADD,
    TEXT_COMMENT,
    TEXT_MY_ACCOUNT,
    TEXT_PAGE_NOT_FOUND,
    LOAD_LOGIN_MENU,
    LOAD_NEW_COMMENT,
    LOAD_HOME_NEWS,
    LOAD_REGISTRATION,
    LOAD_MYACCOUNT,
    LOAD_MYACCOUNT_PASSWORD,
    LOAD_MYACCOUNT_EMAIL
    } from "../settings";

////Header Interfaces
export interface IPageHeader {
    title: string;
}

export interface IPageTop {
    image: Iimage;
    presentation: IpresentationData;
}

export interface IpresentationData {
    title:string;
    introduction: string;
    description:string;
}

////Cards interfaces

export interface ICardItem {
    data?: ICardData;
}

export interface ICardData {
    title:string;
    date:string;
    imgLink?:string;
    description:string;
    buttonText:string;
    buttonLink:string;
    outlineColor?:string;
}

export interface IcardMainData {
    title:string;
    date:string;
    imgLink?:string;
    description:string;
    outlineColor?:string;
    id: number;
}

////Image interface

export interface Iimage {
    alt:string;
    src:string;
    link?:string;
    width?:number;
    className?: string;
}

////Comment interfaces

export interface ICommentData {
    ID: number;
    Owner: string;
    OwnerID?: string;
    Time: string;
    Comment: string;
    Mine?: boolean;
}

export interface IAddComment {    
    addComment? (): void;
    handleCommentText?( event: any ): void;
    commentValue?: string;
    loading?:boolean;
    emptyComment?: boolean;
    loggedUser?: IcurrentUser;
    isLogged?: boolean;
    addCommentText?: IAddCommentText;
}

export interface IAddCommentAction
{
    addCommentAction?( comment: string ): void; 
}

export interface IAddCommentText {
    submitBtnText?: string;
    invalidCommentText?: string;
}

export interface ICommentAddTranslations {
    [ptCode]: IAddCommentText;
    [enCode]: IAddCommentText;
}

export interface ICommentText {
    ownerText: string;
    dateText: string;
}

export interface ICommentTranslations {
    [ptCode]: ICommentText;
    [enCode]: ICommentText;
}

////Error handling interfaces

export interface ILoading {
    isPageLoading?: boolean;    
    localLoading?: ILocalLoading;
    lessPriority?: boolean;
}

export interface IErrorHandling {
    hasError?: boolean;
    errorDescription?: string; 
    errorCode?:string;
    errorText?: IErrorHandlingText;
}

export interface IErrorHandlingText {
    errorMessage?: string;
    errorTitle?:string;    
}

export interface IServerResponse {
    id?: number; ////Just for json server mock
    uuid?: string; //// Just for json server mock
    sessionId?: string; //// Just for json server mock
    username?: string; ////Just for json server mock
    password?:string; ////Just for json server mock
    payload?: IServerPayload;
    hasError: boolean;
    errorMessage?: string;
}

export interface IServerPayload {
    homedata?: IhomeDataServer;
    newsList?: INewsData[];
    newsData?: IViewNewsDataServer;
    comments?: ICommentData[];
    loginData?: ILoginResponse;
    registrationData?: IRegistrationResult;
    checkUsernameResponse?: ICheckUsernameResult;
    myAccount?: IMyAccountResponse;    
}

export interface IErrorHandlingTextTranslation {
    [ptCode]?: IErrorHandlingText;
    [enCode]?: IErrorHandlingText;
}

export interface IPageNotFoundTextTranslation {
    [ptCode]?: IErrorHandlingText;
    [enCode]?: IErrorHandlingText;
}

export interface IPageNotFoundProps {
    pageNotFoundText?: IErrorHandlingText; 
}

export interface IIndexable {
    [key: string]: any;
 }

 ////Add new loading keys to this interface
interface ILocalLoading {
    [LOAD_LOGIN_MENU]?: boolean;
    [LOAD_NEW_COMMENT]?: boolean;
    [LOAD_HOME_NEWS]?: boolean;
    [LOAD_REGISTRATION]?: boolean;
    [LOAD_MYACCOUNT]?: boolean;
    [LOAD_MYACCOUNT_PASSWORD]?: boolean;
    [LOAD_MYACCOUNT_EMAIL]?: boolean;
}

//// Add new error keys to this interface
export interface IErrorHandlingErrors {
    [ERROR_GENERIC]: IErrorHandlingTextTranslation;
    [ERROR_ADD_COMMENT]: IErrorHandlingTextTranslation;
    [ERROR_LOGIN]: IErrorHandlingTextTranslation;
    [ERROR_LOGOUT]: IErrorHandlingTextTranslation;
    [ERROR_HOME_PAGE]: IErrorHandlingTextTranslation;
    [ERROR_GET_NEWS_LIST]: IErrorHandlingTextTranslation;
    [ERROR_GET_NEWS_DATA]: IErrorHandlingTextTranslation;
    [ERROR_USER_REGISTRATION]: IErrorHandlingTextTranslation;
    [ERROR_MYACCOUNT_CHANGENAME]: IErrorHandlingTextTranslation;
    [ERROR_MYACCOUNT_CHANGEPASSWORD]: IErrorHandlingTextTranslation;
    [ERROR_MYACCOUNT_CLOSE_DISABLE]: IErrorHandlingTextTranslation;    
}

////Add new language keys to this interface
export interface IAppText {
    [TEXT_LOGIN_MENU]: IloginMenu; 
    [TEXT_NEED_LOGIN]: IloginFormHeader;
    [TEXT_REGISTRATION]: IRegistrationText;
    [TEXT_MENU]: ImenuText;
    [TEXT_NEWS_LIST]: InewsLanguage;
    [TEXT_COMMENT_ADD]: IAddCommentText;
    [TEXT_COMMENT]: ICommentText;   
    [TEXT_MY_ACCOUNT]: IMyAccountAllText; 
    [TEXT_PAGE_NOT_FOUND]: IErrorHandlingText;
}