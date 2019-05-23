//@ts-ignore
import axios from 'axios';

import { mockPresentationFromServer, mockHomeImage } from '../../../pageData/mock/homepage';
import { IhomeDataServer } from '../../../interfaces/home';
import { serverResolve } from '../common';

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
        }
    );
/*
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
    })*/
}
//// HOMEPAGE