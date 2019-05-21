import { Iimage } from "./common";

export interface Ipresentation {
    presentationData: IpresentationData;
}

export interface IpresentationData {
    title:string;
    introduction: string;
    description:string;
}

export interface IpresentationServer {
    title:string;
    titleEN:string;
    introduction: string;
    introductionEN: string;
    description:string;
    descriptionEN:string;
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
}

export interface IHomeRedux {
    image?: Iimage;
    presentationData?: IpresentationData;
    presentationServer?: IpresentationServer;
}
