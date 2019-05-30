import {IcurrentUser} from './interfaces/currentUser';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

//APP GENERIC -- Do not change, will break app
export const ptCode = 'PT';
export const enCode = 'EN';
export const results = {
    success: 'Success',
    failure: 'Failure',
    default: ''
}

//ERROR CODES -- do not change or it will break objects for translations
export const ERROR_GENERIC = 'ERROR_GENERIC';
export const ERROR_ADD_COMMENT = 'ERROR_ADD_COMMENT';
export const ERROR_LOGIN = 'ERROR_LOGIN';
export const ERROR_LOGOUT = 'ERROR_LOGOUT';
export const ERROR_HOME_PAGE = 'ERROR_HOME_PAGE';
export const ERROR_GET_NEWS_LIST = 'ERROR_GET_NEWS_LIST';
export const ERROR_GET_NEWS_DATA = 'ERROR_GET_NEWS_DATA';

//APP
export const Show_Error_Detailed = true;////set true to dev, false to prd

//SERVER
export const restServer = 'http://localhost:4000/rest/';
export const getDataFromServer = true;

//ROUTES
export const pageHome = '/';
export const registrationRoute = '/registration';
export const newsRoute = '/news';
export const viewsNewsRoute = '/viewnews';
export const blogsListAllRoute = '/listallblogs';

// COOKIE NAMES
const langCookie = 'appLanguage';
const userCookie = 'appCurrentUser';

// LOAD LOCALIZED
export const LOAD_LOGIN_MENU = 'LOAD_LOGIN_MENU';
export const LOAD_NEW_COMMENT = 'LOAD_NEW_COMMENT';
export const LOAD_HOME_NEWS = 'LOAD_HOME_NEWS';

// COOKIE METHODS -- Do not change
export const currentLanguage = () : string => {
   let lang: string = cookies.get(langCookie);
   if( lang === null || lang === undefined || lang === '' || !( lang === enCode || lang === ptCode ) )
    {
        setLanguage();
        return ptCode;
    }    
   return lang;
};

export const setLanguage = (lang: string = ptCode) : void => {
   if(lang !== ptCode && lang !== enCode)
   {
         lang = ptCode;
   }
   cookies.set(langCookie, lang, { path: pageHome });
};

export const getCurrentUser = () : IcurrentUser => {
    return cookies.get(userCookie);  
};

export const setCurrentUser = (userData: IcurrentUser ) : void => {
   cookies.set(userCookie, userData, { path: pageHome }) 
};

export const cookieLogout = () : void => {
   cookies.remove(userCookie, { path: pageHome });
};

export const checkLogin = () : boolean => {
   return getCurrentUser() !== null && getCurrentUser() !== undefined;
};

//// COMMON METHODS -- Do not change
interface IIndexable {
   [key: string]: any;
}

export function GetPropertyValue(object: IIndexable,dataToRetrieve: string) : any
{
   return object[dataToRetrieve];
}