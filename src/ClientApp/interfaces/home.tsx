import { Iimage, IpresentationData } from "./common";
import { ptCode, enCode } from "../settings";

export interface Ipresentation {
    presentationData: IpresentationData;
}



export interface IpresentationServer {
    [ptCode]: IpresentationServerContent;
    [enCode]?: IpresentationServerContent;
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
    changePresentationLanguage? ( language: string ): Function;
    getHomeData? ( language: string ): Function;
    resetHomeData? (): Function;
}

export interface IHomeRedux {
    image?: Iimage;
    presentationData?: IpresentationData;
    presentationServer?: IpresentationServer;
}
