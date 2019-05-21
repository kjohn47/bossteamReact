//@ts-ignore
import axios from 'axios';

import {tempUser} from '../../../pageData/mock/user';
import { IcurrentUser } from '../../../interfaces/currentUser';

//// APP
export async function makeLoginOnServer( user: string, password: string ){
    let userServer:IcurrentUser | boolean = false;
    if( user === "abc" && password === "123")////To replace with server call -- mock abc/123
    {
        userServer = tempUser;
    }

    return new Promise( (resolve) => {
        setTimeout(() => { resolve(userServer)} , 300)       
    })
}
//// APP

