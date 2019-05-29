import { Iimage, IpresentationData } from "./common";

export interface Ipresentation {
    presentationData: IpresentationData;
}



export interface IpresentationServer {
    PT: IpresentationServerContent;
    EN?: IpresentationServerContent;
}

export interface IpresentationServerContent {
    title:string;
    introduction: string;
    description:string;
}

interface Ipayload {
    language?: string;
    image?: Iimage;
    presentation?: IpresentationServer;    
}

export interface IhomeDataServer {
    image: Iimage;
    presentation: IpresentationServer;   
}

export interface IHomeAction{
    type:string;
    payload?:Ipayload;
}

export interface IHomeActions {
    getHomeImage?: Function;
    getPresentationData?: Function;
    changePresentationLanguage?: Function;
    getHomeData?: Function;
    resetHomeData?: Function;
}

export interface IHomeRedux {
    image?: Iimage;
    presentationData?: IpresentationData;
    presentationServer?: IpresentationServer;
}
