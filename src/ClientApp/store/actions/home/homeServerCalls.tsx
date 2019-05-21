//@ts-ignore
import axios from 'axios';

import { mockPresentationFromServer, mockHomeImage } from '../../../pageData/mock/homepage';
import { Iimage } from '../../../interfaces/common';

//// HOMEPAGE
export async function getPresentationFromServer()
{
    ////mocked server data -- replace with server call
    /*
    axios.post{}
    axios.get{}
    */
    return new Promise( (resolve) => {
        setTimeout(() => { resolve(mockPresentationFromServer)} , 500)       
    })
}

export async function getImageFromServer()
{
    let image: Iimage = mockHomeImage;
    return new Promise( (resolve) => {
        setTimeout(() => { resolve(image)} , 500)       
    })
}
//// HOMEPAGE
