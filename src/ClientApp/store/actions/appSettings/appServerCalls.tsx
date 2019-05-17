//@ts-ignore
import axios from 'axios';

import {tempUser} from '../../../pageData/mock/user';

//// APP
export function makeLoginOnServer( user: string, password: string ){
    if( user === "abc" && password === "123")////To replace with server call -- mock abc/123
    {
        return tempUser;
    }
    return false;
}
//// APP

