import { INewsData, IViewNewsDataServer } from "./news";
import { IhomeDataServer } from "./home";
import { ILoginResponse } from "./login";
import { IRegistrationResult, ICheckUsernameResult } from "./registration";
import { IcurrentUser } from "./currentUser";
import { IMyAccountChangeNameResponse, IMyAccountChangePasswordPayload } from "./myAccount";

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
    PT: IAddCommentText;
    EN: IAddCommentText;
}

export interface ICommentText {
    ownerText: string;
    dateText: string;
}

export interface ICommentTranslations {
    PT: ICommentText;
    EN: ICommentText;
}

////Error handling interfaces

export interface ILoading {
    isPageLoading?: boolean;    
    localLoading?: ILocalLoading;
    lessPriority?: boolean;
}

interface ILocalLoading {
    loadLogin?: boolean;
    loadComment?: boolean;
    loadHomeNews?: boolean;
    loadUserRegistration?: boolean;
    loadMyAccount?: boolean;
    loadMyAccountPassword?: boolean;
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
    changeName?: IMyAccountChangeNameResponse;
    checkPassword?: IMyAccountChangePasswordPayload;
}

export interface IErrorHandlingTextTranslation {
    PT?: IErrorHandlingText;
    EN?: IErrorHandlingText;
}

export interface IPageNotFoundTextTranslation {
    PT?: IErrorHandlingText;
    EN?: IErrorHandlingText;
}

export interface IErrorHandlingErrors {
    ERROR_GENERIC: IErrorHandlingTextTranslation;
    ERROR_ADD_COMMENT: IErrorHandlingTextTranslation;
    ERROR_LOGIN: IErrorHandlingTextTranslation;
    ERROR_LOGOUT: IErrorHandlingTextTranslation;
    ERROR_HOME_PAGE: IErrorHandlingTextTranslation;
    ERROR_GET_NEWS_LIST: IErrorHandlingTextTranslation;
    ERROR_GET_NEWS_DATA: IErrorHandlingTextTranslation;
    ERROR_USER_REGISTRATION: IErrorHandlingTextTranslation;
    ERROR_MYACCOUNT_CHANGENAME: IErrorHandlingTextTranslation;
}