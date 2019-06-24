
import { IErrorHandling, ILoading, IErrorHandlingText, IIndexable} from './common';
import { ILoginResponse } from './login';
import { IAppText } from '../pageData/language';
export interface IAppSettings { 
    appText?: IAppText & IIndexable;
    presentationLanguage?: string;
    fetchData?: IFetchData;    
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