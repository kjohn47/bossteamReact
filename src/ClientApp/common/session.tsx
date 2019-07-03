////import Cookies from 'universal-cookie';
import {langCookie, ptCode, enCode, userCookie, sessionCookieUUID, sessionCookieSESSIONID} from '../settings';
import { IUserSession } from '../interfaces/myAccount';
import { ICurrentUserCookie } from '../interfaces/currentUser';
////const cookies = new Cookies();

// COOKIE METHODS -- Do not change
export const currentLanguage = () : string => {
    let lang: string = localStorage.getItem(langCookie);
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
    localStorage.setItem(langCookie, lang);
 };
 
 export const getCurrentSession = () : IUserSession => {     
     let uuid: string = localStorage.getItem(sessionCookieUUID);
     let sessionId: string = localStorage.getItem(sessionCookieSESSIONID);
     if( uuid === null || uuid === undefined || sessionId === null || sessionId === undefined )
     {
         uuid = sessionStorage.getItem(sessionCookieUUID);
         sessionId = sessionStorage.getItem(sessionCookieSESSIONID);
     }

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
    let userData = sessionStorage.getItem(userCookie);
    if ( userData !== null && userData !== undefined )     
    {
       return JSON.parse(userData);
    }
    return null;
 }

 export const setCurrentUser = (userData: ICurrentUserCookie ) : void => {
   sessionStorage.setItem(userCookie, JSON.stringify( userData ));
};
 
 export const setCurrentSession = (userData: IUserSession, isPermanent: boolean = false ) : void => {    
    if( isPermanent || ( localStorage.getItem(sessionCookieUUID) !== null && 
    localStorage.getItem(sessionCookieSESSIONID) !== null && 
    localStorage.getItem(sessionCookieUUID) !== undefined && 
    localStorage.getItem(sessionCookieSESSIONID) !== undefined ) ) 
    {
      localStorage.setItem(sessionCookieUUID, userData.uuid);
      localStorage.setItem(sessionCookieSESSIONID, userData.sessionId);
    }
    else
    {
      sessionStorage.setItem(sessionCookieUUID, userData.uuid);
      sessionStorage.setItem(sessionCookieSESSIONID, userData.sessionId);
    }
 };
 
 export const cookieLogout = () : void => {    
    localStorage.removeItem(sessionCookieUUID);    
    localStorage.removeItem(sessionCookieSESSIONID);
    sessionStorage.removeItem(sessionCookieUUID);
    sessionStorage.removeItem(sessionCookieSESSIONID);
    sessionStorage.removeItem(userCookie);    
 };
 
 export const checkLogin = () : boolean => {
    return getCurrentSession() !== null && getCurrentSession() !== undefined;
 };