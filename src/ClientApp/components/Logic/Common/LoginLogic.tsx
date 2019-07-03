import * as React from 'react';
import { ILogin, ILoginActions, ILoginState, ILoginReduxActions } from '../../../interfaces/login';
import { connect } from 'react-redux';
import { Istore } from '../../../interfaces/store';
import { IUserMenu } from '../../../interfaces/menu';
import { makeLogin, makeLogout, resetLoginStatus } from '../../../store/actions/myAccount';
import { results, LOAD_LOGIN_MENU, TEXT_MENU, TEXT_LOGIN_MENU } from '../../../settings';
import { REGEX_FIELD, checkRegexText } from '../../../common/regex';
import { IcurrentUser } from '../../../interfaces/currentUser';

type loginPropsType = ILoginReduxActions & ILogin;

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
            this.handleIsPermanent = this.handleIsPermanent.bind(this);
            this.state = {
                    user: '',
                    password: '',
                    invalidUser: false,
                    emptyUser: false,
                    emptyPassword:false,
                    loginAttempt: false,
                    isPermanent: true
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

        handleIsPermanent(): void {
            let oldIsPermanent = this.state.isPermanent;
            this.setState({
                isPermanent: !oldIsPermanent
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
                this.props.makeLogin(this.state.user, this.state.password, this.state.isPermanent);                            
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
                handleIsPermanent: this.handleIsPermanent,
                state: {
                    user: this.state.user,
                    password: this.state.password,
                    invalidUser: this.state.invalidUser,
                    emptyUser: this.state.emptyUser,
                    emptyPassword: this.state.emptyPassword,
                    loginAttempt: this.state.loginAttempt,
                    isPermanent: this.state.isPermanent
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
                        loginText={this.props.loginText} 
                        loginAction={loginActions} 
                        loading = { this.props.loading } />
            );
        }
    }
    const mapStateToProps = (state: Istore): ILogin => {
        return {
            menuText: state.appSettings.appText[TEXT_MENU],
            loginText: state.appSettings.appText[TEXT_LOGIN_MENU],
            isLogged: state.myAccount.isLogged,
            loggedUser: state.myAccount.loggedUser,
            tryLogin: state.myAccount.tryLogin,
            loading: state.appSettings.fetchData.loading.localLoading[LOAD_LOGIN_MENU]
        }
    };

    const mapDispatchToProps = (dispatch: Function): ILoginReduxActions =>({
        makeLogin: ( user: string, password: string, isPermanent: boolean ) => dispatch( makeLogin( user, password, isPermanent ) ),
        makeLogout: ( user: IcurrentUser) => dispatch( makeLogout( user ) ),
        resetLoginStatus: () => dispatch( resetLoginStatus() )
    });

    return connect(mapStateToProps, mapDispatchToProps)(LoginLogic);
}

export default loginLogic;