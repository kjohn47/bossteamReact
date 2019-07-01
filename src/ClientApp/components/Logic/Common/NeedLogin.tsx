import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import { Alert } from 'reactstrap';
import PageHeader from '../../View/Common/PageHeader';
import { INeedLoginReduxProps } from '../../../interfaces/login';
import { TEXT_NEED_LOGIN } from '../../../settings';

function needLoginLogic ( WrappedComponent:React.ComponentType ): React.ComponentType
{
    class NeedLoginLogic extends React.Component<INeedLoginReduxProps>{

        render(){
            const isLogged = this.props.isLogged && this.props.loggedUser !== null && this.props.loggedUser.uuid !== undefined && this.props.loggedUser.uuid !== '';
            return(     
                isLogged?
                    this.props.children            
                :
                <React.Fragment>
                    <PageHeader title = { this.props.loginFormHeader.title } />
                    <Alert color = "warning">{ this.props.loginFormHeader.warning }</Alert>
                    <WrappedComponent />
                </React.Fragment>                    
            );
        }
    }    

    const mapStateToProps = ( state: Istore ) : INeedLoginReduxProps => {
        return {
            isLogged: state.myAccount.isLogged,
            loggedUser: state.myAccount.loggedUser,
            loginFormHeader: state.appSettings.appText[TEXT_NEED_LOGIN]            
        }
    };

    return connect( mapStateToProps, null )( NeedLoginLogic );
}

export default needLoginLogic;