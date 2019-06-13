import { commonServerAction } from "../appSettings/common";
import { makeLoginOnServer, makeLogoutOnServer, changeNameServerCall, checkOldPasswordServerCall } from "./myAccountServerCalls";
import { LOAD_LOGIN_MENU, setCurrentUser, cookieLogout, pageHome, newsRoute, viewsNewsRoute, results, updateCurrentUserNames, LOAD_MYACCOUNT, LOAD_MYACCOUNT_PASSWORD } from "../../../settings";
import { IServerPayload } from "../../../interfaces/common";
import { MAKE_LOGIN, MAKE_LOGOUT, RESET_LOGIN_STATUS, RESET_MYACCOUNT_STATUS, CHANGE_MYACCOUNT_NAME, MYACCOUNT_CHECK_OLD_PASSWORD } from "../../actionTypes";
import { IMyAccountAction, IchangeNameArg, IMyaccountChangePasswordArg } from "../../../interfaces/myAccount";
import { IcurrentUser } from "../../../interfaces/currentUser";

export function makeLogin( user: string, password: string )  : Function {
    return (dispatch: Function) =>  { 
        commonServerAction( dispatch, makeLoginOnServer, makeLoginSuccess, {user, password}, null , true, LOAD_LOGIN_MENU, updateLoginToken );
    }
}

function updateLoginToken( result: IServerPayload, serverCallArg: any, successCallArg: any, dispatch: Function ) : void
{
    if(result.loginData.success)
    {
        setCurrentUser(result.loginData.user);
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
        commonServerAction( dispatch, makeLogoutOnServer, logout, user, null , true, LOAD_LOGIN_MENU, null, logoutFunctions );
    } 
}

function logoutFunctions( serverCallArg: any, successCallArg: any, dispatch: Function ) : void {
    cookieLogout();  
    if(window.location.pathname !== pageHome && window.location.pathname !== newsRoute && window.location.pathname.substring( 0, viewsNewsRoute.length ) !== viewsNewsRoute )  
        {window.location.assign(pageHome); }  
}

function logout(result:IServerPayload) : IMyAccountAction {
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

export function changeName ( name: string, surname: string, uuid: string ) : Function {
    return (dispatch: Function) =>  
    {     
        commonServerAction( dispatch, changeNameServerCall, changeNameSuccess, { name, surname, uuid }, null , true, LOAD_MYACCOUNT, updateCookieName );
    } 
}

function updateCookieName( result: IServerPayload, serverCallArg: IchangeNameArg, successCallArg: any, dispatch: Function ): void {
    if( result.myAccount.name !== null && result.myAccount.name !== undefined ) {
        updateCurrentUserNames( result.myAccount.name.name, result.myAccount.name.surname );
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

export function checkOldPassword( password: string, uuid: string ): Function {
    let checkPwArg: IMyaccountChangePasswordArg = {
        oldPassword: password,
        uuid: uuid
    };
    return ( dispatch: Function ) => {
        commonServerAction( dispatch, checkOldPasswordServerCall, checkOldPasswordSuccess, checkPwArg, null , true, LOAD_MYACCOUNT_PASSWORD );
    }
}

function checkOldPasswordSuccess( result: IServerPayload ): IMyAccountAction {
    return {
        type: MYACCOUNT_CHECK_OLD_PASSWORD,
        payload: {
            changePassword: result.myAccount.password
        }
    }
}