import * as React from 'react';
import {ILoginText} from '../../../interfaces/login';
import { connect } from 'react-redux';
import { Istore } from '../../../interfaces/store';

function loginLogic (WrappedComponent:React.ComponentType<ILoginText>)
{
    class LoginLogic extends React.Component<ILoginText,{}>{    
        render(){
            return(
                <WrappedComponent loginText = {this.props.loginText}/>
            );
        }
    }
    const mapStateToProps = (state: Istore) =>
    {
        return {
            loginText: state.appSettings.menuText.loginForm
        }
    };

    const mapDispatchToProps = (dispatch: Function) =>(
    {
        
    });

    return connect(mapStateToProps, null)(LoginLogic);
}

export default loginLogic;