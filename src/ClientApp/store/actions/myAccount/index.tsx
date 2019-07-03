import { commonServerAction } from "../appSettings/common";
import { setCurrentSession, cookieLogout, checkLogin, getCurrentSession, setCurrentUser, getCurrentUser } from "../../../common/session";

import { 
    makeLoginOnServer,
    makeLogoutOnServer,
    changeNameServerCall,
    checkPasswordServerCall,
    changePasswordServerCall,
    checkEmailServerCall,
    closeAccountServerCall,
    enableAccountServerCall,
    disableAccountServerCall,
    makeLoginWithSession
    } from "./myAccountServerCalls";

import { 
    LOAD_LOGIN_MENU,
    pageHome,
    newsRoute,
    viewsNewsRoute,
    LOAD_MYACCOUNT,
    LOAD_MYACCOUNT_PASSWORD,
    LOAD_MYACCOUNT_EMAIL,
    results,
    } from "../../../settings";
    
import { IServerPayload } from "../../../interfaces/common";

import { 
    MAKE_LOGIN,
    MAKE_LOGOUT,
    RESET_LOGIN_STATUS,
    RESET_MYACCOUNT_STATUS,
    CHANGE_MYACCOUNT_NAME,
    MYACCOUNT_CHECK_OLD_PASSWORD,
    MYACCOUNT_CHANGE_PASSWORD,
    MYACCOUNT_CHECK_PASSWORD,
    MYACCOUNT_CHECK_EMAIL,
    RESET_MYACCOUNT_SUCCSESS,
    MYACCOUNT_CLOSE_ACCOUNT,
    MYACCOUNT_ENABLE_ACCOUNT 
    } from "../../actionTypes";

import { 
    IMyAccountAction,
    IMyaccountChangePasswordArg,
    IMyaccountCloseArg, 
    IUserSession
    } from "../../../interfaces/myAccount";
    
import { IcurrentUser, ICurrentUserCookie } from "../../../interfaces/currentUser";

export function makeLogin( user: string, password: string, isPermanent: boolean )  : Function {
    return (dispatch: Function) =>  { 
        commonServerAction( dispatch, makeLoginOnServer, makeLoginSuccess, {user, password}, isPermanent , true, LOAD_LOGIN_MENU, updateLoginToken );
    }
}

export function sessionLogin(): Function {
    return (dispatch: Function) =>  { 
        if( checkLogin() )
        {
            let session: IUserSession = getCurrentSession();
            commonServerAction( dispatch, makeLoginWithSession, makeLoginSuccess, session, null, true, LOAD_LOGIN_MENU, updateLoginToken, null, sessionLogoutError );
        }
        return dispatch( () => {} );
    }
}

function sessionLogoutError( dispatch: Function )
{
    cookieLogout();
    dispatch( logout() );
}

function updateLoginToken( result: IServerPayload, serverCallArg: any, successCallArg: any, dispatch: Function ) : void
{
    if(result.loginData.success)
    {
        setCurrentSession(result.loginData.session, successCallArg);
        let userCookie: ICurrentUserCookie = {
            user: result.loginData.user,
            isLogged: true
        };
        setCurrentUser( userCookie );
    }
}

function makeLoginSuccess( result: IServerPayload ) : IMyAccountAction {
    return {
        type: MAKE_LOGIN,
        payload: {
                login: result.loginData
            }
    }
}

export function makeLogout( user: IcurrentUser) : Function {
    return (dispatch: Function) =>  
    {     
        commonServerAction( dispatch, makeLogoutOnServer, logout, user, null , true, LOAD_LOGIN_MENU, null, logoutFunctions, logoutFunctions );
    } 
}

function logoutFunctions( result?:IServerPayload, serverCallArg?: any, successCallArg?: any, dispatch?: Function ) : void {
    cookieLogout();  
    if(window.location.pathname !== pageHome && window.location.pathname !== newsRoute && window.location.pathname.substring( 0, viewsNewsRoute.length ) !== viewsNewsRoute )  
        {window.location.assign(pageHome); }  
}

function logout(result?:IServerPayload) : IMyAccountAction {
    return {
        type: MAKE_LOGOUT
    }
}

export function resetLoginStatus() : IMyAccountAction {
    return {
        type: RESET_LOGIN_STATUS
    }
}

export function resetMyAccountStatus() : IMyAccountAction {
    return {
        type: RESET_MYACCOUNT_STATUS        
    }
}

export function resetMyAccountSuccess() : IMyAccountAction {
    return {
        type: RESET_MYACCOUNT_SUCCSESS       
    }
}

export function changeName ( name: string, surname: string ) : Function {
    return (dispatch: Function) =>  
    {     
        commonServerAction( dispatch, changeNameServerCall, changeNameSuccess, { name, surname }, null , true, LOAD_MYACCOUNT, changeNameFunctions );
    } 
}

function changeNameFunctions ( result: IServerPayload ): void {
    if( result.myAccount.success === results.success )
    {
        let userCookie: ICurrentUserCookie = getCurrentUser();
        userCookie.user.name = result.myAccount.name.name;
        userCookie.user.surname = result.myAccount.name.surname;
        setCurrentUser( userCookie );
    }
}

function changeNameSuccess( result: IServerPayload ): IMyAccountAction {
    return {
        type: CHANGE_MYACCOUNT_NAME,
        payload: {
            success: result.myAccount.success,
            changeName: result.myAccount.name
        }
    }
}

export function checkPassword( password: string, passwordChange: boolean ): Function {
    let checkPwArg: IMyaccountChangePasswordArg = {
        password: password
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, checkPasswordServerCall, checkPasswordSuccess, checkPwArg, passwordChange , true, LOAD_MYACCOUNT_PASSWORD );
    }
}

function checkPasswordSuccess( result: IServerPayload, passwordChange: boolean ): IMyAccountAction {
    if( passwordChange ) {
        return {
            type: MYACCOUNT_CHECK_OLD_PASSWORD,
            payload: {
                changePassword: result.myAccount.password
            }
        }
    }
    else {
        return {
            type: MYACCOUNT_CHECK_PASSWORD,
            payload: {
                closeAccount: {
                    validPassword: result.myAccount.password.validPassword,
                    wrongPassword: result.myAccount.password.wrongPassword
                }
            }
        }
    }
}

export function changePassword( oldPassword: string, newPassword: string ): Function {
    let checkPwArg: IMyaccountChangePasswordArg = {
        password: oldPassword,
        newPassword: newPassword
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, changePasswordServerCall, changePasswordSuccess, checkPwArg, null , true, LOAD_MYACCOUNT );
    }
}

function changePasswordSuccess ( result: IServerPayload ): IMyAccountAction {
    return {
        type: MYACCOUNT_CHANGE_PASSWORD,
        payload: {
            success: result.myAccount.success,
            changePassword: result.myAccount.password
        }
    };
}

export function checkEmail( email: string ): Function {
    let checkEmailArg: IMyaccountCloseArg = {
        email: email
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, checkEmailServerCall, checkEmailSuccess, checkEmailArg, null , true, LOAD_MYACCOUNT_EMAIL );
    }
}

function checkEmailSuccess( result: IServerPayload ): IMyAccountAction {    
    return {
        type: MYACCOUNT_CHECK_EMAIL,
        payload: {
            closeAccount: {
                validEmail: result.myAccount.email.validEmail,
                wrongEmail: result.myAccount.email.wrongEmail
            }
        }
    }    
}

export function disableAccount( email: string, password: string ): Function {
    let disableAccountArg: IMyaccountCloseArg = {
        password: password,
        email: email
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, disableAccountServerCall, closeAccountSuccess, disableAccountArg, null , true, LOAD_MYACCOUNT, null, enableAccountChangeSuccess );
    };
}

export function enableAccount( email: string, password: string ): Function {
    let enableAccountArg: IMyaccountCloseArg = {
        password: password,
        email: email
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, enableAccountServerCall, closeAccountSuccess, enableAccountArg, null , true, LOAD_MYACCOUNT, null, enableAccountChangeSuccess );
    };
}

function enableAccountChangeSuccess( result: IServerPayload, serverCallArg: IMyaccountCloseArg, successCallArg: any, dispatch: Function ): void {
    if ( result.myAccount.success === results.success )
    {        

        let userCookie: ICurrentUserCookie = getCurrentUser();
        userCookie.user.enabled = result.myAccount.enabled;        
        setCurrentUser( userCookie );
        dispatch( changeAccountEnabledStatus( result ) );
    }
} 

function changeAccountEnabledStatus( result: IServerPayload ): IMyAccountAction {
    return {
        type: MYACCOUNT_ENABLE_ACCOUNT,
        payload: {
            enabled: result.myAccount.enabled
        }
    }
}

export function closeAccount( email: string, password: string ): Function {
    let closeAccountArg: IMyaccountCloseArg = {
        password: password,
        email: email
    };

    return ( dispatch: Function ) => {
        commonServerAction( dispatch, closeAccountServerCall, closeAccountSuccess, closeAccountArg, null , true, LOAD_MYACCOUNT, null, closeAccountFunctions );
    };
}

function closeAccountFunctions( result: IServerPayload, serverCallArg: IMyaccountCloseArg, successCallArg: any, dispatch: Function ) : void {
    if( result.myAccount.success === results.success )
    {
        dispatch( logout( result ) );
        logoutFunctions( result, serverCallArg, successCallArg, dispatch );
    }
}

function closeAccountSuccess( result: IServerPayload ): IMyAccountAction {
    return {
        type: MYACCOUNT_CLOSE_ACCOUNT,
        payload: {
            success: result.myAccount.success,
            closeAccount: {
                validEmail: result.myAccount.email.validEmail,
                validPassword: result.myAccount.password.validPassword,
                wrongEmail: result.myAccount.email.wrongEmail,
                wrongPassword: result.myAccount.password.wrongPassword
            }
        }
    }
}
