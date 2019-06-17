import * as React from 'react';
import { ILogin, ILoginActions, ILoginState, ILoginReduxActions } from '../../../interfaces/login';
import { connect } from 'react-redux';
import { Istore } from '../../../interfaces/store';
import { IUserMenu } from '../../../interfaces/menu';
import { IAppSettings } from '../../../interfaces/appSettings';
import { makeLogin, makeLogout, resetLoginStatus } from '../../../store/actions/myAccount';
import { results, REGEX_FIELD, checkRegexText } from '../../../settings';
import { IcurrentUser } from '../../../interfaces/currentUser';

type loginPropsType = IAppSettings & ILoginReduxActions & ILogin;

function loginLogic(WrappedComponentLogin: React.ComponentType<ILogin>, WrappedComponentLoggedIn?: React.ComponentType<IUserMenu> ) : React.ComponentType 
{
    class LoginLogic extends React.Component<loginPropsType, ILoginState>{
        constructor(props: loginPropsType) {
            super(props);
            this.makeLogin = this.makeLogin.bind(this);
            this.makeLogout = this.makeLogout.bind(this);
            this.handlePassword = this.handlePassword.bind(this);
            this.handleUser = this.handleUser.bind(this);
            this.handleKeyPress = this.handleKeyPress.bind(this);
            this.state =
                {
                    user: '',
                    password: '',
                    invalidUser: false,
                    emptyUser: false,
                    emptyPassword:false,
                    loginAttempt: false
                };
        }

        handleUser(event: React.FormEvent<HTMLInputElement>) : void {
            let newText: string = checkRegexText( event.currentTarget.value, this.state.user, REGEX_FIELD.USERNAME );
            this.setState(
                {
                    emptyUser: false,
                    invalidUser: false,
                    user: newText,
                    loginAttempt: false
                });
        }

        handlePassword(event: React.FormEvent<HTMLInputElement>) : void {
            this.setState(
                {                    
                    emptyPassword: false,
                    invalidUser: false,
                    password: event.currentTarget.value,
                    loginAttempt: false
                });
        }

        handleKeyPress(event: KeyboardEvent, focus: string, submit?:boolean) : void {
            if(event.key === "Enter"){
                if(submit)
                {
                    this.makeLogin();
                }
                else
                {
                //@ts-ignore
                    document.getElementById(focus).focus();
                }
              }
        }

        makeLogin() : void {
            let withError = false;
            this.setState({
                loginAttempt: true
            });
            if (this.state.user.trim() === '') {                
                this.setState({
                    emptyUser: true
                });
                withError = true;
            }
            if (this.state.password.trim() === '') {                
                this.setState({
                    emptyPassword: true
                });
                withError = true;
            }
            if( !withError ) {
                this.props.makeLogin(this.state.user, this.state.password);                            
            }
        }

        makeLogout() : void {
            if (this.props.isLogged) {
                this.props.makeLogout( this.props.loggedUser );                
            }
        }

        componentDidUpdate( prevProps: loginPropsType) {
            if ( this.props.tryLogin !== prevProps.tryLogin ) {
                if ( this.props.tryLogin === results.failure || this.props.tryLogin === results.success )
                {
                    this.props.resetLoginStatus();
                    if ( !this.props.isLogged ) {
                        this.setState({
                            invalidUser: true
                        })
                    }
                    else if ( this.props.isLogged )
                    {
                        this.setState(
                        {
                            user: '',
                            password: '',
                            loginAttempt: false                        
                        });
                    }                        
                }
            }
        }

        render() {
            const loginActions: ILoginActions = {
                handlePassword: this.handlePassword,
                handleUser: this.handleUser,
                makeLogin: this.makeLogin,   
                handleKeyPress: this.handleKeyPress,
                state: {
                    user: this.state.user,
                    password: this.state.password,
                    invalidUser: this.state.invalidUser,
                    emptyUser: this.state.emptyUser,
                    emptyPassword: this.state.emptyPassword,
                    loginAttempt: this.state.loginAttempt
                }
            }

            return (
                this.props.isLogged ?
                    (WrappedComponentLoggedIn !== null || WrappedComponentLoggedIn !== undefined) &&
                        <WrappedComponentLoggedIn 
                            user={this.props.loggedUser} 
                            userMnText={this.props.menuText.user}
                            userMenuAction={this.makeLogout} 
                            loading = { this.props.loading } />
                    :
                    <WrappedComponentLogin 
                        loginText={this.props.loginForm} 
                        loginAction={loginActions} 
                        loading = { this.props.loading } />
            );
        }
    }
    const mapStateToProps = (state: Istore): IAppSettings & ILogin => {
        return {
            menuText: state.appSettings.menuText,
            loginForm: state.appSettings.loginForm,
            isLogged: state.myAccount.isLogged,
            loggedUser: state.myAccount.loggedUser,
            tryLogin: state.myAccount.tryLogin,
            loading: state.appSettings.fetchData.loading.localLoading.loadLogin
        }
    };

    const mapDispatchToProps = (dispatch: Function): ILoginReduxActions =>({
        makeLogin: ( user: string, password: string ) => dispatch( makeLogin( user, password ) ),
        makeLogout: ( user: IcurrentUser) => dispatch( makeLogout( user ) ),
        resetLoginStatus: () => dispatch( resetLoginStatus() )
    });

    return connect(mapStateToProps, mapDispatchToProps)(LoginLogic);
}

export default loginLogic;