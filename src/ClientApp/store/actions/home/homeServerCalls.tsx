//@ts-ignore
import axios from 'axios';

import { mockPresentationFromServer, mockHomeImage } from '../../../pageData/mock/homepage';
import { IErrorHandling } from '../../../interfaces/common';
import { IhomeDataServer } from '../../../interfaces/home';

//// HOMEPAGE

export async function getHomeDataFromServer()
{
    ////mocked server data -- replace with server call
    /*
    axios.post{}
    axios.get{}
    */
    return new Promise( (resolve) => {
        let result: IhomeDataServer = {
            presentation: mockPresentationFromServer,
            image: mockHomeImage
        }
        setTimeout(() => { resolve(result)} , 500)       
    }).catch( ( err:any ) =>{
        let error:IErrorHandling = {
            hasError: true,
            errorTitle: "Home error",
            errorMessage: err.toString()
        };
        return error;
    })
}
//// HOMEPAGE
