//@ts-ignore
import axios from 'axios';

import { mockPresentationFromServer, mockHomeImage } from '../../../pageData/mock/homepage';
import { IhomeDataServer } from '../../../interfaces/home';
import { serverResolve } from '../common';
import { ERROR_HOME_PAGE } from '../../../settings';

//// HOMEPAGE

export async function getHomeDataFromServer()
{
    ////mocked server data -- replace with server call
    /*
    axios.post{}
    axios.get{}
    */
    return await serverResolve( () =>
        {
            let result: IhomeDataServer = {
                presentation: mockPresentationFromServer,
                image: mockHomeImage
            }
            return new Promise( (resolve: Function) => { 
                setTimeout( () => {
                    resolve(result)
                    }, 500 )
            })
        }, ERROR_HOME_PAGE)
}
//// HOMEPAGE