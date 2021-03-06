import {IcardMainData, ICommentData} from './common';
import { IcurrentUser } from './currentUser';
import { ptCode, enCode } from '../settings';

//// Interfaces for News List

export interface InewsLanguage {
    cardButtonText: string;
    pageHeaderTitle: string;
}

export interface InewsListTranslations {
    [ptCode]: InewsLanguage;
    [enCode]: InewsLanguage;
}

export interface InewsListRedux {
    newsList?: IcardMainData[];
    newsListFromServer?: INewsData[];
    newsViewData?: IViewNewsData;
    newsViewDataServer?: IViewNewsDataServer;    
    newsLanguage?: InewsLanguage; 
}

export interface InewsAction{
    type:string;
    payload?:Ipayload;
}

export interface InewsActions{
    getNewsList ( language: string ) : Function;
    getNewsListShort ( language: string ) : Function;
    changeNewsLanguage ( language: string ) : Function;
    resetNewsList () : Function;
}

export interface Ipayload {
    language?: string;
    newsList?: INewsData[];
    newsData?: IViewNewsDataServer;
    comments?: ICommentData[];
    newsID?: number;
}

export interface INewsData {
    date:string;
    imgLink?:string;
    outlineColor?:string;
    id: number;
    [ptCode]: InewsServerDataText;
    [enCode]?: InewsServerDataText;
}

export interface InewsServerDataText {
    title: string;
    description: string;
    content?: string;
}

//// Interfaces for View News

export interface IViewNews {
    newsData?: IViewNewsData;
    newsID?: number;
    addCommentAction?( comment: string ): void;    
    logedIn?: boolean;
    loggedUser?: IcurrentUser;
}

export interface IViewNewsData {
    title:string;
    date:Date;
    imgLink?:string;
    description:string;
    content:string;
    id: number;
    allowComments: boolean;
    comments?: ICommentData[];
}

export interface IViewNewsDataServer {
    date:string;
    imgLink?:string;
    id: number;
    allowComments: boolean;
    comments?: ICommentData[];
    [ptCode]: InewsServerDataText;
    [enCode]?: InewsServerDataText;
}

export interface IViewNewsActions{
    getNewsData( language: string, ID: number ) : Function;
    changeNewsDataLanguage( language: string ) : Function;
    addNewsComment( newsID: number, comment: string ) : Function;
    resetNewsData() : Function;
}

export interface IViewNewsAction{
    type:string;
    payload?:Ipayload;
}

export interface InewsDataArg {
    newsID: number;
    comment:string;
}