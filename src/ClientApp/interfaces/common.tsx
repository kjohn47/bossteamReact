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
    Time: Date;
    Comment: string;
}

export interface IAddComment {
    addCommentAction?: Function;
    handleCommentText?: Function;
    commentValue?: string;
}

export interface IAddCommentText {
    submitBtnText?: string;
    invalidCommentText?: string;
}

export interface ICommentText {
    ownerText: string;
    dateText: string;
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
    errorMessage?: string;
    errorTitle?:string;    
}