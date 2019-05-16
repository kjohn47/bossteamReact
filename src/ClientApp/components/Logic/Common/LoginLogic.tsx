import * as React from 'react';
import {ILoginText} from '../../../interfaces/login';

function loginLogic (WrappedComponent:React.ComponentType<ILoginText>)
{
    class LoginLogic extends React.Component<ILoginText,{}>{    
        render(){
            return(
                <WrappedComponent loginTextInline = {this.props.loginTextInline}/>
            );
        }
    }
    return LoginLogic;
}

export default loginLogic;