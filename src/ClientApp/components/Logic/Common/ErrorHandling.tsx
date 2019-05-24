import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import { ILoading, IErrorHandlingText } from '../../../interfaces/common';
import { IFetchData } from '../../../interfaces/appSettings';
import { withRouter, RouteComponentProps } from 'react-router';
import { resetError } from '../../../store/actions/appSettings';

interface IHistory extends RouteComponentProps<any> {};

interface IErrorAction {
    resetError: Function;
}

type ErrorHandlingType = IFetchData & ILoading & IHistory & IErrorAction;

function errorHandlingLogic (ErrorHandlingView:React.ComponentType<IErrorHandlingText>, LoadingView:React.ComponentType<ILoading>)
{
    class ErrorHandling extends React.Component<ErrorHandlingType>{
        constructor(props:ErrorHandlingType) {
            super(props);        
            this.props.history.listen((location: any, action: any) => {
                if(this.props.error.hasError)
                {                    
                    this.props.resetError();
                }
            });
          }

        render(){
            const error = this.props.error;
            return(
                <div className="col-md-10 col-sm-12 pageContent">   
                {
                    error.hasError  ?                 
                        <ErrorHandlingView 
                        errorMessage = {                             
                            error.errorText !== null && error.errorText!== undefined ?
                                error.errorText.errorMessage : ''                                                           
                        } 
                        errorTitle = { 
                            error.errorText !== null && error.errorText!== undefined ?
                                error.errorText.errorTitle : 'Unknown Error' 
                        }/>  
                    :
                        <LoadingView isPageLoading = {this.props.loading.isPageLoading}>                    
                                {this.props.children}
                        </LoadingView>
                }
                </div>
            );
        }
    }
    
    const mapStateToProps = ( state: Istore ) => {
        return {
            error: state.appSettings.fetchData.error,
            loading: state.appSettings.fetchData.loading
        }
    };

    const mapDispatchToProps = (dispatch: Function) => (
        {
            resetError: () => dispatch(resetError())
        });
    

    return withRouter<IHistory>(connect(mapStateToProps, mapDispatchToProps)(ErrorHandling));
}

export default errorHandlingLogic;