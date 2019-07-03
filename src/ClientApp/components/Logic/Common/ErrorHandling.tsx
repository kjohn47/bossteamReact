import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import { ILoading, IErrorHandlingText } from '../../../interfaces/common';
import { IFetchData } from '../../../interfaces/appSettings';
import { withRouter, RouteComponentProps } from 'react-router';
import { resetError } from '../../../store/actions/appSettings';
import { sessionLogin } from '../../../store/actions/myAccount';
import { checkLogin } from '../../../common/session';

interface IHistory extends RouteComponentProps<any> {};

interface IErrorAction {
    resetError() : Function;
    sessionLogin(): Function;
}

interface IAppLogged {
    isLogged: boolean;
}

type ErrorHandlingType = IFetchData & ILoading & IHistory & IErrorAction & IAppLogged;

function errorHandlingLogic (ErrorHandlingView:React.ComponentType<IErrorHandlingText>, LoadingView:React.ComponentType<ILoading>) :React.ComponentType
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
        componentWillMount()
        {
            !this.props.isLogged && checkLogin() && this.props.sessionLogin();
        }

        render(){
            const error = this.props.error;
            const hasSessionCookie = checkLogin();
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
                        <LoadingView isPageLoading = {this.props.loading.isPageLoading || hasSessionCookie && ( hasSessionCookie !== this.props.isLogged )}>                    
                                { hasSessionCookie? hasSessionCookie === this.props.isLogged && this.props.children : this.props.children }
                        </LoadingView>
                }
                </div>
            );
        }
    }
    
    const mapStateToProps = ( state: Istore ) : IFetchData & IAppLogged => {
        return {
            error: state.appSettings.fetchData.error,
            loading: state.appSettings.fetchData.loading,
            isLogged: state.myAccount.isLogged
        }
    };

    const mapDispatchToProps = (dispatch: Function) : IErrorAction => (
        {
            resetError: () => dispatch( resetError() ),
            sessionLogin: () => dispatch( sessionLogin() )
        });
    

    return withRouter<IHistory>(connect(mapStateToProps, mapDispatchToProps)(ErrorHandling));
}

export default errorHandlingLogic;