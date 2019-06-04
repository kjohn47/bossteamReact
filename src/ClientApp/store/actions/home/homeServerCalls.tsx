import { serverResolve } from '../common';
import { ERROR_HOME_PAGE, restServer } from '../../../settings';
import axios from 'axios';

//// HOMEPAGE

export async function getHomeDataFromServer() : Promise<any>
{
    ////mocked server data -- replace with server call
    return await serverResolve( () =>
        {            
            return axios.get(restServer + "homePage").then( (response) => {return response.data});
        }, ERROR_HOME_PAGE)
}
//// HOMEPAGE