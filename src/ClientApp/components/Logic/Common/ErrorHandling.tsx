import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import { ILoading, IErrorHandling } from '../../../interfaces/common';
import { IFetchData } from '../../../interfaces/appSettings';
import { withRouter } from 'react-router';
import { resetError } from '../../../store/actions/appSettings';

interface IHistory {
    history: any;
};

interface IErrorAction {
    resetError: Function;
}

type ErrorHandlingType = IFetchData & ILoading & IHistory & IErrorAction;

function errorHandlingLogic (ErrorHandlingView:React.ComponentType<IErrorHandling>, LoadingView:React.ComponentType<ILoading>)
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
                error.hasError  ?                 
                    <ErrorHandlingView errorMessage = { error.errorMessage } errorTitle = { error.errorTitle }/>  
                :
                    <LoadingView isGeneralLoading = {this.props.loading.isGeneralLoading}>                    
                            {this.props.children}
                    </LoadingView>
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
    
    //@ts-ignore
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(ErrorHandling));
}

export default errorHandlingLogic;