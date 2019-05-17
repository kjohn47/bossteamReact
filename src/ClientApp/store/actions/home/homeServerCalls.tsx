//@ts-ignore
import axios from 'axios';

import { mockPresentationFromServer, mockHomeImage } from '../../../pageData/mock/homepage';
import { Iimage } from '../../../interfaces/common';

//// HOMEPAGE
export function getPresentationFromServer()
{
    ////mocked server data -- replace with server call
    /*
    axios.post{}
    axios.get{}
    */
    return mockPresentationFromServer;
}

export function getImageFromServer()
{
    let image: Iimage = mockHomeImage;
    return image;
}
//// HOMEPAGE
