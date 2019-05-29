import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import {IAppSettings} from '../../../interfaces/appSettings';
import { Alert } from 'reactstrap';
import PageHeader from '../../View/Common/PageHeader';

function needLoginLogic ( WrappedComponent:React.ComponentType<{}> )
{
    class NeedLoginLogic extends React.Component<IAppSettings>{

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

    const mapStateToProps = ( state: Istore ) => {
        return {
            isLogged: state.appSettings.isLogged,
            loggedUser: state.appSettings.loggedUser,
            loginFormHeader: state.appSettings.loginFormHeader            
        }
    };

    return connect( mapStateToProps, null )( NeedLoginLogic );
}

export default needLoginLogic;