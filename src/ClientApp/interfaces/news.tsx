import {ICardData, IcardMainData, ICommentData} from './common';
import { IcurrentUser } from './currentUser';

//// Interfaces for News List

export interface InewsLanguage {
    cardButtonText : string;
    titleText: string;
    dateText: string;
    descriptionText: string;    
    contentText: string;
}

export interface InewsCard {
    newsCard: ICardData;
}

export interface InewsListRedux {
    newsList?: IcardMainData[];
    newsListFromServer?: INewsData[];
    newsViewData?: IViewNewsData;
    newsViewDataServer?: IViewNewsDataServer;
}

export interface InewsAction{
    type:string;
    payload?:Ipayload;
}

export interface InewsActions{
    getNewsList: Function;
    getNewsListShort: Function;
    changeNewsLanguage: Function;
    resetNewsList:Function;
}

export interface Ipayload {
    language: string;
    newsList?: INewsData[];
    newsData?: IViewNewsDataServer;
    comments?: ICommentData[];
    newsID?: number;
}

export interface INewsData {
    title:string;
    titleEN:string;
    date:Date;
    imgLink?:string;
    description:string;
    descriptionEN:string;
    outlineColor?:string;
    id: number;
}

//// Interfaces for View News

export interface IViewNews {
    newsData: IViewNewsData;
    newsID: number;
    addCommentAction?: Function;    
    logedIn?: boolean;
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
    title:string;
    titleEN:string;
    date:Date;
    imgLink?:string;
    description:string;
    descriptionEN:string;    
    content:string;
    contentEN:string;
    id: number;
    allowComments: boolean;
    comments?: ICommentData[];
}

export interface IViewNewsActions{
    getNewsData: Function;
    changeNewsDataLanguage: Function;
    addNewsComment: Function;
    resetNewsData:Function;
}

export interface IViewNewsAction{
    type:string;
    payload?:Ipayload;
}