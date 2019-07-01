import {IcurrentUser} from '../interfaces/currentUser';
import Cookies from 'universal-cookie';
import {langCookie, ptCode, enCode, pageHome, userCookie} from '../settings';
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
 
 export const getCurrentUser = () : IcurrentUser => {
     return cookies.get(userCookie);  
 };
 
 export const setCurrentUser = (userData: IcurrentUser ) : void => {
    cookies.set(userCookie, userData, { path: pageHome }) 
 };
 
 export const updateCurrentUserNames = ( name: string, surname: string ): void => {
    let user: IcurrentUser = getCurrentUser();
    user = {...user,
       name: name,
       surname: surname
    };
    setCurrentUser( user );
 }
 
 export const updateCurrentUserEnabledAccount = ( enabled: boolean ): void => {
    let user: IcurrentUser = getCurrentUser();
    user = {...user,
       enabled: enabled
    };
    setCurrentUser( user );
 }
 
 export const cookieLogout = () : void => {
    cookies.remove(userCookie, { path: pageHome });
 };
 
 export const checkLogin = () : boolean => {
    return getCurrentUser() !== null && getCurrentUser() !== undefined;
 };