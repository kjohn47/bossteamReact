//@ts-ignore
import axios from 'axios';

import { mockNewsFromServer, mockNewsDataServer } from '../../../pageData/mock/news';
import { IViewNewsDataServer } from '../../../interfaces/news';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { ICommentData } from '../../../interfaces/common';


//// NEWS

export function getNewsListFromServer( short: boolean = false)
{
    ////mocked server data -- replace with server call
    if(short)
    {
        return mockNewsFromServer.slice((mockNewsFromServer.length - 3), mockNewsFromServer.length) 
    }

    return mockNewsFromServer;
}

export function getNewsDataFromServer(ID:number)
{
    ////mocked server data -- replace with server call
    let serverData: IViewNewsDataServer = mockNewsDataServer[ID - 1];
    return serverData;
}

export function addNewsCommentToServer( newsID: number, comment: string, user: IcurrentUser )
{
    let serverData: IViewNewsDataServer = mockNewsDataServer[newsID - 1];
    let newComment: ICommentData = {
        Comment: comment,
        Owner: user.name + " " + user.surname,
        Time: new Date(),
        ID:123
    }
    serverData.comments !== null && serverData.comments !== undefined ? serverData.comments.push(newComment) : serverData.comments = [newComment];

    return serverData.comments;
}

//// NEWS