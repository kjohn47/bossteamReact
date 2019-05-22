//@ts-ignore
import axios from 'axios';

import { mockNewsFromServer, mockNewsDataServer } from '../../../pageData/mock/news';
import { IViewNewsDataServer, InewsDataArg, INewsData } from '../../../interfaces/news';
import { ICommentData } from '../../../interfaces/common';
import { serverResolve } from '../common';

//// NEWS

export async function getNewsListFromServer( short: boolean = false )
{
    return await serverResolve( () =>
    {
        let serverData: INewsData[];    
        if(short)
        {
            serverData = mockNewsFromServer.slice((mockNewsFromServer.length - 3), mockNewsFromServer.length);
        }
        else    
        {
            serverData= mockNewsFromServer;
        }   
        return new Promise( (resolve: Function) => { 
            setTimeout( () => {
                resolve(serverData)
                }, 900 )
        })
    }, 'Get News List Error')
}

export async function getNewsDataFromServer( ID:number )
{
    return await serverResolve( () =>
    {
        let serverData: IViewNewsDataServer;    
        serverData = mockNewsDataServer[ID - 1];  
        return new Promise( (resolve: Function) => { 
            setTimeout( () => {
                resolve(serverData)
                }, 800 )
        })
    }, 'Get News Data Error')
}

export async function addNewsCommentToServer( newsArg: InewsDataArg )
{    
    return await serverResolve( () =>
    {
        let serverData: IViewNewsDataServer = mockNewsDataServer[newsArg.newsID - 1];
        let newComment: ICommentData = {
            Comment: newsArg.comment,
            Owner: newsArg.user.name + " " + newsArg.user.surname,
            Time: new Date(),
            ID:123
        }
        serverData.comments !== null && serverData.comments !== undefined ? serverData.comments.push(newComment) : serverData.comments = [newComment];
        return new Promise( (resolve: Function) => { 
            setTimeout( () => {
                resolve(serverData.comments)
                }, 500 )
        })
    }, 'Add Comment Error')
}

//// NEWS