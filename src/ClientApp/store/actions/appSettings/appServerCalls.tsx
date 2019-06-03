//@ts-ignore
import axios from 'axios';

import {tempUser} from '../../../pageData/mock/user';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { ILoginState } from '../../../interfaces/login';
import { serverResolve } from '../common';
import { ERROR_LOGIN, ERROR_LOGOUT } from '../../../settings';
import { IServerResponse } from '../../../interfaces/common';

//// APP
export async function makeLoginOnServer( loginArg: ILoginState ) : Promise<any>{
    return await serverResolve( () =>
    {
        let serverReturn:IServerResponse = {
            hasError: false,
            payload: {
                loginData: {
                    success: false
                }
            }                  
        };

        if( loginArg.user === "abc" && loginArg.password === "123")////To replace with server call -- mock abc/123
        {
            serverReturn.payload.loginData = {
                success: true,
                user: tempUser
            };
        }
        
        return new Promise( (resolve: Function) => { 
            setTimeout( () => {
                resolve(serverReturn)
                }, 1000 )
        })
        
    }, ERROR_LOGIN)
}
//// APP

export async function makeLogoutOnServer( user: IcurrentUser ) : Promise<any>{
    return await serverResolve( () =>
    {
        let serverReturn: IServerResponse = {
            hasError: false
        }
        
        if(user === null )
        {
            throw new Error("Invalid user");
        }
        else
        {            
            return new Promise( (resolve: Function) => { 
                setTimeout( () => {
                    resolve( serverReturn )
                    }, 800 )
            })
        }
    }, ERROR_LOGOUT)
}
