////Cards interfaces

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
    Time: string;
    Comment: string;
}

export interface IAddComment {
    addCommentAction?: Function;
    handleCommentText?: Function;
    commentValue?: string;
    loading?:boolean;
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

export interface IErrorHandlingTextTranslation {
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
}