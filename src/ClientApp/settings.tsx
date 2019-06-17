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
export const ERROR_USER_REGISTRATION = 'ERROR_USER_REGISTRATION';
export const ERROR_MYACCOUNT_CHANGENAME = 'ERROR_MYACCOUNT_CHANGENAME';
export const ERROR_MYACCOUNT_CHANGEPASSWORD = 'ERROR_MYACCOUNT_CHANGEPASSWORD';

//APP
export const Show_Error_Detailed = true;////set true to dev, false to prd

//SERVER
export const restServer = 'http://localhost:4000/rest/';

//ROUTES
export const pageHome = '/';
export const registrationRoute = '/registration';
export const myAccountRoute = '/myaccount';
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
export const LOAD_REGISTRATION = 'LOAD_REGISTRATION';
export const LOAD_MYACCOUNT = 'LOAD_MYACCOUNT';
export const LOAD_MYACCOUNT_PASSWORD = 'LOAD_MYACCOUNT_PASSWORD';
export const LOAD_MYACCOUNT_EMAIL = 'LOAD_MYACCOUNT_EMAIL';

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

//// COMMON METHODS -- Do not change
interface IIndexable {
   [key: string]: any;
}

export function GetPropertyValue(object: IIndexable,dataToRetrieve: string) : any
{
   return object[dataToRetrieve];
}

interface IRegexField {
   NAME: string;
   USERNAME: string;
   EMAIL: string;
}

export const REGEX_FIELD: IRegexField = {
   USERNAME: "USERNAME",
   NAME: "NAME",
   EMAIL: "EMAIL"
}

export function checkEmailRegex( email: string ): boolean {
   var emailRegex = /^[\.a-zA-Z0-9]+@+[a-zA-Z0-9\.]+\.+[A-Za-z]+$/
   return emailRegex.test( email );
}

export function checkRegexText( newText: string, currentText: string, field?: string ) : string
{   
   switch(field)
   {
         case( REGEX_FIELD.NAME ) : {
            var format = /^[a-zA-Z]*$/;
            if( format.test(newText) )  {
               break;
            }
            else {
               newText = currentText;  
               break;
            }
         }           

         case( REGEX_FIELD.USERNAME ) : {
            var format = /^[a-zA-Z0-9]*$/;
            if( format.test(newText) ){
               if( newText.length > 0 && !isNaN( newText.charAt( 0 ) as unknown as number ) )
               {
                  newText = currentText;
                  break; 
               }
               break;               
            }                   
            else{
               newText = currentText; 
               break;
            }
         }

         case( REGEX_FIELD.EMAIL ) : {
            var format = /^[a-zA-Z0-9@\.]*$/

            if( ( format.test(newText) ) )
            {
               if ( newText.lastIndexOf('@') !== newText.indexOf('@') || newText.charAt( 0 ) === '@' || newText.charAt( 0 ) === '\.' || newText.charAt( newText.indexOf('@') + 1 ) === '\.' || ( !isNaN( newText.substr( 0, newText.indexOf( '@' ) ) as unknown as number ) ) && newText.indexOf('@') !== -1 )
               {
                  newText = currentText;  
                  break;
               }

               if( newText.length > 1 && newText.charAt( 0 ) !== '@' && newText.match('@') )
               {
                  break;
               }            

               if( newText.length > 1 && newText.match('\.') !== null && newText.match('\.') !== undefined && newText.indexOf('\.') !== 0 )
               {
                  break;
               }        
            }
            else
            {
               newText = currentText; 
               break;    
            }
         }

         default:{
            var format = /^[a-zA-Z0-9]*$/;

            if( format.test(newText) )  {
               break;
            }
            else {
               newText = currentText;  
               break;
            }
         }                  
         
   }
   return newText;
}