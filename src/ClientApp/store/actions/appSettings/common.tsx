import { startServerCommunication, serverCommunicationError, endServerCommunication } from ".";
import { IErrorHandling, IServerResponse } from "../../../interfaces/common";
import { ERROR_GENERIC } from "../../../settings";
import { IcurrentUser } from "../../../interfaces/currentUser";
import { store } from "../../configureStore";

export function commonServerAction( dispatch: Function, 
                                    serverCall:Function, 
                                    successCall: Function, 
                                    serverCallArg: any = null, 
                                    successCallArg: any = null, 
                                    isLocalLoad: boolean = false, 
                                    localLoad: string = '',
                                    runBeforeSuccess: Function = null,
                                    runAfterFinish: Function = null) : Promise<any>
{    
    dispatch( startServerCommunication( isLocalLoad, localLoad ) );    
    return new Promise( async (resolve, reject) => {
        let serverData:IServerResponse | IErrorHandling;
        if( serverCall === null || serverCall === undefined ) {
            serverData = {
                hasError: true,
                errorCode: ERROR_GENERIC,
                errorDescription: "Invalid server call method"
            };
        }
        else {
            serverData = await serverCall( serverCallArg );        
        }
        if( serverData.hasError )
        { 
            reject( serverData )
        }
        resolve( serverData )
    }).then( ( result:IServerResponse ) => { 
        runBeforeSuccess !== null && runBeforeSuccess( result.payload, serverCallArg, successCallArg, dispatch );
        return result;
    }).then( ( result:IServerResponse ) => { 
        dispatch( successCall( result.payload, successCallArg ) );
        return result;
    }).then( ( result:IServerResponse ) => { 
        runAfterFinish !== null && runAfterFinish( result.payload, serverCallArg, successCallArg, dispatch );
    }).catch( ( err: IErrorHandling ) => {
        dispatch( serverCommunicationError( { ...err } ) )
    }).finally ( () => {                
        dispatch(endServerCommunication( isLocalLoad, localLoad ) );                
    } )
}

export async function serverResolve( serverCall: Function, errorCode: string = ERROR_GENERIC ) : Promise<any>
{
    let currentUsr: IcurrentUser = store.getState().myAccount !== null && store.getState().myAccount !== undefined? store.getState().myAccount.loggedUser: null;    
    return new Promise( (resolve, reject ) => {
        let serverReturn: IServerResponse = serverCall( currentUsr );
        if( serverReturn === null || serverReturn === undefined )
        {
            throw new Error("Empty data from server");
        }        
        resolve( serverReturn ); 
    })
    .then( ( serverReturn: IServerResponse ) => {
        if( serverReturn.hasError )
        {            
            throw new Error( serverReturn.errorMessage );            
        }
        else
        {
            return serverReturn;
        }
    })
    .catch( ( err:any ) =>{
        let error:IErrorHandling = {
            hasError: true,
            errorCode: errorCode,
            errorDescription: err.toString()
        };        
        return error;
    })
}