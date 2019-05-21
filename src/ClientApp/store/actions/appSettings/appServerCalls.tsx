//@ts-ignore
import axios from 'axios';

import {tempUser} from '../../../pageData/mock/user';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { IErrorHandling } from '../../../interfaces/common';

//// APP
export async function makeLoginOnServer( user: string, password: string ){
    let userServer:IcurrentUser | boolean = false;
    if( user === "abc" && password === "123")////To replace with server call -- mock abc/123
    {
        userServer = tempUser;
    }

    return new Promise( (resolve) => {
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

