import { startServerCommunication, serverCommunicationError, endServerCommunication } from "./appSettings";
import { IErrorHandling } from "../../interfaces/common";
import { ERROR_GENERIC } from "../../settings";


export function commonServerAction( dispatch: Function, 
                                    serverCall:Function, 
                                    successCall: Function, 
                                    serverCallArg: any = null, 
                                    successCallArg: any = null, 
                                    isLocalLoad: boolean = false, 
                                    localLoad: string = '',
                                    runBeforeSuccess: Function = null,
                                    runAfterFinish:Function = null)
{    
    dispatch( startServerCommunication( isLocalLoad, localLoad ) );    
    return new Promise( async (resolve, reject) => {
        let serverData:any = await serverCall(serverCallArg);        
        if( serverData.hasError )
        { 
            reject(serverData)
        }
        resolve(serverData)
    }).then( (result:any) => { 
        runBeforeSuccess !== null && runBeforeSuccess(result);
        dispatch(successCall(result, successCallArg))
    }).catch( (err: IErrorHandling) => {
        dispatch(serverCommunicationError( { ...err }))
    }).finally ( () => {                
        dispatch(endServerCommunication(isLocalLoad, localLoad));        
        runAfterFinish !== null && runAfterFinish();
    } )    
}

export async function serverResolve( serverCall: Function, errorCode: string = ERROR_GENERIC )
{
    return new Promise( (resolve, reject) => {
        let serverReturn = serverCall();
        if(serverReturn === null || serverReturn === undefined)
        {
            reject("Empty data from server");
        }
        resolve( serverReturn ); 
    }).catch( ( err:any ) =>{
        let error:IErrorHandling = {
            hasError: true,
            errorCode: errorCode,
            errorDescription: err.toString()
        };
        return error;
    })
}