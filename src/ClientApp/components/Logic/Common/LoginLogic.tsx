import * as React from 'react';
import {ILogin} from '../../../interfaces/login';
import { connect } from 'react-redux';
import { Istore } from '../../../interfaces/store';
import { IUserMenu } from '../../../interfaces/menu';
import { IAppSettings, IappActions } from '../../../interfaces/appSettings';
import { makeLogin, makeLogout } from '../../../store/actions/appSettings';

function loginLogic (WrappedComponentLogin:React.ComponentType<ILogin>, WrappedComponentLoggedIn?:React.ComponentType<IUserMenu>)
{
    class LoginLogic extends React.Component<IAppSettings & IappActions,{}>{ 
        constructor(props:any){
            super(props);
            this.makeLogin = this.makeLogin.bind(this);
            this.makeLogout = this.makeLogout.bind(this);
        }

        makeLogin(user: string, password: string) {
            this.props.makeLogin(user, password);
        }

        makeLogout() {
            this.props.makeLogout();
        }
        
        render(){
            return(
                this.props.isLogged ? 
                    WrappedComponentLoggedIn !== null || WrappedComponentLoggedIn !== undefined  ?
                        <WrappedComponentLoggedIn user = {this.props.loggedUser} userMnText = {this.props.menuText.user} userMenuAction = {this.makeLogout}/>
                    :
                    <div></div>
                :
                    <WrappedComponentLogin loginText = {this.props.menuText.loginForm} loginAction = {this.makeLogin}/>
            );
        }
    }
    const mapStateToProps = ( state: Istore ) =>
    {
        return {
            menuText: state.appSettings.menuText,
            isLogged: state.appSettings.isLogged,
            loggedUser : state.appSettings.loggedUser
        }
    };

    const mapDispatchToProps = ( dispatch: Function ) => (
    {
        makeLogin: ( user: string, password: string ) => dispatch( makeLogin( user, password ) ),
        makeLogout: () => dispatch( makeLogout() )
    });

    return connect( mapStateToProps, mapDispatchToProps )( LoginLogic );
}

export default loginLogic;