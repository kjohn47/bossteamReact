//@ts-ignore
import axios from 'axios';

import {tempUser} from '../../../pageData/mock/user';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { ILoginResponse } from '../../../interfaces/login';
import { serverResolve } from '../common';

//// APP
export async function makeLoginOnServer( user: string, password: string ){
    return await serverResolve( () =>
    {
        let userServer:ILoginResponse = {
            success: false        
        };

        if( user === "abc" && password === "123")////To replace with server call -- mock abc/123
        {
            userServer = {
                success: true,
                user: tempUser
            };
        }
        
        return new Promise( (resolve: Function) => { 
            setTimeout( () => {
                resolve(userServer)
                }, 150 )
        })
        
    }, 'Login Error')
}
//// APP

export async function makeLogoutOnServer( user: IcurrentUser ){
    return await serverResolve( () =>
    {
        if(user === null )
        {
            throw new Error("Invalid user");
        }
        else
        {            
            return new Promise( (resolve: Function) => { 
                setTimeout( () => {
                    resolve(true)
                    }, 100 )
            })
        }
    }, 'Logout Error')
}
