import Cookies from 'universal-cookie';
import {langCookie, ptCode, enCode, pageHome, userCookie, sessionCookie} from '../settings';
import { IUserSession } from '../interfaces/myAccount';
import { ICurrentUserCookie } from '../interfaces/currentUser';
const cookies = new Cookies();

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
 
 export const getCurrentSession = () : IUserSession => {
     //return cookies.get(sessionCookie);  
     let uuid: string = sessionStorage.getItem(sessionCookie + "uuid");
     let sessionId: string = sessionStorage.getItem(sessionCookie + "sessionId");
     if( uuid !== null && uuid !== undefined && sessionId !== null && sessionId !== undefined )
     {
        return {
            sessionId: sessionId,
            uuid: uuid
         }
     }
     return null;
 };

 export const getCurrentUser = () : ICurrentUserCookie => {
    return cookies.get(userCookie);
 }

 export const setCurrentUser = (userData: ICurrentUserCookie ) : void => {
   cookies.set(userCookie, userData, { path: pageHome }) 
};
 
 export const setCurrentSession = (userData: IUserSession ) : void => {
    //cookies.set(sessionCookie, userData, { path: pageHome }) 
    sessionStorage.setItem(sessionCookie + "uuid", userData.uuid);
    sessionStorage.setItem(sessionCookie + "sessionId", userData.sessionId);
 };
 
 export const cookieLogout = () : void => {
    cookies.remove(sessionCookie, { path: pageHome });
    cookies.remove(userCookie, { path: pageHome }) 
 };
 
 export const checkLogin = () : boolean => {
    return getCurrentSession() !== null && getCurrentSession() !== undefined;
 };