//@ts-ignore
import axios from 'axios';

import {tempUser} from '../../../pageData/mock/user';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { IErrorHandling } from '../../../interfaces/common';
import { ILoginResponse } from '../../../interfaces/login';

//// APP
export async function makeLoginOnServer( user: string, password: string ){
    return new Promise( (resolve) => {
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

        setTimeout(() => { resolve(userServer)} , 300)       
    }).catch( ( err:any ) =>{
        let error:IErrorHandling = {
            hasError: true,
            errorTitle: "News List Error",
            errorMessage: err.toString()
        };
        return error;
    });
}
//// APP
