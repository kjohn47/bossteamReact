import { startServerCommunication, serverCommunicationError, endServerCommunication } from "./appSettings";
import { IErrorHandling } from "../../interfaces/common";


export function commonServerAction(dispatch: Function, serverCall:Function, successCall: Function, serverCallArg: any = null, successCallArg: any = null, isLocalLoad: boolean = false, localLoad: string = '')
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
        dispatch(successCall(result, successCallArg))
    }).catch( (err: IErrorHandling) => {
        dispatch(serverCommunicationError( { ...err }))
    }).finally ( () => {        
        dispatch(endServerCommunication(isLocalLoad, localLoad)) 
    } )    
}