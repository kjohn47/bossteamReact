import { commonServerAction } from "../appSettings/common";
import { makeLoginOnServer, makeLogoutOnServer } from "./myAccountServerCalls";
import { LOAD_LOGIN_MENU, setCurrentUser, cookieLogout, pageHome, newsRoute, viewsNewsRoute } from "../../../settings";
import { IServerPayload } from "../../../interfaces/common";
import { MAKE_LOGIN, MAKE_LOGOUT, RESET_LOGIN_STATUS } from "../../actionTypes";
import { IMyAccountAction } from "../../../interfaces/myAccount";
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