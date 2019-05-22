//@ts-ignore
import axios from 'axios';

import { mockNewsFromServer, mockNewsDataServer } from '../../../pageData/mock/news';
import { IViewNewsDataServer } from '../../../interfaces/news';
import { IcurrentUser } from '../../../interfaces/currentUser';
import { ICommentData, IErrorHandling } from '../../../interfaces/common';

//// NEWS

export async function getNewsListFromServer( short: boolean = false )
{
    ////mocked server data -- replace with server call
    return new Promise( (resolve) => {
    if(short)
    {
        setTimeout(() => { resolve(mockNewsFromServer.slice((mockNewsFromServer.length - 3), mockNewsFromServer.length) )} , 1500) 
    }
    else    
    {
        setTimeout(() => { resolve(mockNewsFromServer)} , 1000)
    }   
               
    }).catch( ( err:any ) =>{
        let error:IErrorHandling = {
            hasError: true,
            errorTitle: "News List Error",
            errorMessage: err.toString()
        };
        return error;
    })
}

export async function getNewsDataFromServer( ID:number )
{
    return new Promise( (resolve) => {
        let serverData: IViewNewsDataServer;    
        ////mocked server data -- replace with server call
        serverData = mockNewsDataServer[ID - 1];      
        setTimeout(() => { resolve(serverData)} , 1100)       
    }).catch( ( err:any ) =>{
        let error:IErrorHandling = {
            hasError: true,
            errorTitle: "News Get Error",
            errorMessage: err.toString()
        };
        return error;
    })
}

interface InewsDataArg {
    newsID: number;
    comment:string;
    user: IcurrentUser
}

export async function addNewsCommentToServer( newsArg: InewsDataArg )
{    
    return new Promise( (resolve, reject) => {   
        let serverData: IViewNewsDataServer = mockNewsDataServer[newsArg.newsID - 1];
        let newComment: ICommentData = {
            Comment: newsArg.comment,
            Owner: newsArg.user.name + " " + newsArg.user.surname,
            Time: new Date(),
            ID:123
        }
        serverData.comments !== null && serverData.comments !== undefined ? serverData.comments.push(newComment) : serverData.comments = [newComment];
                        
        //reject("Error occurred");
        setTimeout(() => { 
            resolve(serverData.comments); } , 500);               
    }).catch( ( err:any ) =>{
        let error:IErrorHandling = {
            hasError: true,
            errorTitle: "Add Comment Error",
            errorMessage: err.toString()
        };
        return error;
    })
}

//// NEWS