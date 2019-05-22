import * as React from 'react';
import { ILogin, ILoginActions, ILoginState } from '../../../interfaces/login';
import { connect } from 'react-redux';
import { Istore } from '../../../interfaces/store';
import { IUserMenu } from '../../../interfaces/menu';
import { IAppSettings, IappActions } from '../../../interfaces/appSettings';
import { makeLogin, makeLogout, resetLoginStatus } from '../../../store/actions/appSettings';
import { results } from '../../../settings';
import { IcurrentUser } from '../../../interfaces/currentUser';


function loginLogic(WrappedComponentLogin: React.ComponentType<ILogin>, WrappedComponentLoggedIn?: React.ComponentType<IUserMenu>) {
    class LoginLogic extends React.Component<IAppSettings & IappActions, ILoginState>{
        constructor(props: any) {
            super(props);
            this.makeLogin = this.makeLogin.bind(this);
            this.makeLogout = this.makeLogout.bind(this);
            this.handlePassword = this.handlePassword.bind(this);
            this.handleUser = this.handleUser.bind(this);
            this.state =
                {
                    user: '',
                    password: ''
                };
        }

        handleUser(event: any) {
            this.setState(
                {
                    user: event.target.value
                });
        }

        handlePassword(event: any) {
            this.setState(
                {
                    password: event.target.value
                });
        }

        makeLogin() {
            if (this.state.user.trim() === '') {                
                alert(this.props.loginForm.emptyUser);
            }
            else if (this.state.password.trim() === '') {                
                alert(this.props.loginForm.emptyPassword);
            }
            else {
                this.props.makeLogin(this.state.user, this.state.password);                            
            }
        }

        makeLogout() {
            if (this.props.isLogged) {
                this.props.makeLogout( this.props.loggedUser );                
            }
        }

        componentDidUpdate( prevProps: IAppSettings & IappActions) {
            if ( this.props.tryLogin !== prevProps.tryLogin ) {
                if ( this.props.tryLogin === results.failure ||  this.props.tryLogin === results.success )
                {
                    this.props.resetLoginStatus();
                    if ( !this.props.isLogged ) {
                        alert(this.props.loginForm.invalidLogin);
                    }
                    else if ( this.props.isLogged )
                    {
                        this.setState(
                        {
                            user: '',
                            password: ''                        
                        });
                        //redirect to /
                    }                        
                }
            }
        }

        render() {
            const loginActions: ILoginActions = {
                handlePassword: (event: any) => this.handlePassword(event),
                handleUser: (event: any) => this.handleUser(event),
                makeLogin: () => this.makeLogin(),                
                state: {
                    user: this.state.user,
                    password: this.state.password
                }
            }

            return (
                this.props.isLogged ?
                    WrappedComponentLoggedIn !== null || WrappedComponentLoggedIn !== undefined ?
                        <WrappedComponentLoggedIn user={this.props.loggedUser} userMnText={this.props.menuText.user} userMenuAction={this.makeLogout} />
                        :
                        <div></div>//redirect to logout prompt
                    :
                    <WrappedComponentLogin loginText={this.props.loginForm} loginAction={loginActions} />
            );
        }
    }
    const mapStateToProps = (state: Istore) => {
        return {
            menuText: state.appSettings.menuText,
            loginForm: state.appSettings.loginForm,
            isLogged: state.appSettings.isLogged,
            loggedUser: state.appSettings.loggedUser,
            tryLogin: state.appSettings.tryLogin
        }
    };

    const mapDispatchToProps = (dispatch: Function) => (
    {
        makeLogin: (user: string, password: string) => dispatch(makeLogin(user, password)),
        makeLogout: ( user: IcurrentUser) => dispatch(makeLogout(user)),
        resetLoginStatus: () => dispatch(resetLoginStatus())
    });

    return connect(mapStateToProps, mapDispatchToProps)(LoginLogic);
}

export default loginLogic;