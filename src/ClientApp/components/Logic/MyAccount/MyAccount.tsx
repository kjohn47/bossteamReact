import * as React from 'react';
import { Istore } from '../../../interfaces/store';
import { connect } from 'react-redux';
import { 
    IMyAccountViewProps, 
    MyAccountLogicType, 
    IMyAccountLogicProps, 
    IMyAccountLogicActions, 
    IMyAccountLogicState 
    } from '../../../interfaces/myAccount';
import { checkRegexText, REGEX_FIELD, results } from '../../../settings';
import { resetMyAccountStatus, changeName } from '../../../store/actions/myAccount';

function myAccountLogic ( WrappedComponent:React.ComponentType<IMyAccountViewProps> ): React.ComponentType
{
    class MyAccountLogic extends React.Component<MyAccountLogicType,IMyAccountLogicState>{
        _defaultState: IMyAccountLogicState;

        constructor( props: MyAccountLogicType ) {
            super( props );
            this._defaultState = {
                changeName: {
                    name: this.props.currentUser.name,
                    surname: this.props.currentUser.surname,
                    emptyName: false,
                    emptySurname: false,
                    updateFail: false,
                    updateSuccess: false,
                    loading: false
                },
                changePassword: {
                    oldPassword: "",
                    newPassword: "",
                    repeatPassword: "",
                    emptyOldPassword: false,
                    emptynewPassword: false,
                    notMatchPassword: false,
                    wrongOldPassword: false,
                    updateFail: false,
                    updateSuccess: false,
                    loading: false
                },
                closeAccount: {
                    password: "",
                    repeatPassword: "",
                    email: "",
                    emptyPassword: false,
                    invalidEmail: false,
                    checkEmail: false,
                    passwordNotMatch: false,
                    updateFail: false,
                    updateSuccess: false,
                    loading: false
                }
            }
            this.state = {...this._defaultState};
            this.changeTabHandle = this.changeTabHandle.bind( this );
            this.changeName_nameHandle = this.changeName_nameHandle.bind( this );
            this.changeName_surnameHandle = this.changeName_surnameHandle.bind( this );
            this.changeName_submitHandle = this.changeName_submitHandle.bind( this );
        }

        //// MyAccount methods
        changeTabHandle() {
            this.setState({...this._defaultState});
        }

        componentDidUpdate( prevProps: MyAccountLogicType ) {
            //// Change name:
            if( prevProps.changeNameSuccess !== this.props.changeNameSuccess && this.props.changeNameSuccess !== results.default )
            {
                if( this.props.changeNameSuccess === results.success ) {
                    this.setState({
                        changeName: { ...this.state.changeName,
                            updateSuccess: true
                        }
                    });
                }
                else if( this.props.changeNameSuccess === results.failure ) {
                    this.setState({
                        changeName: { ...this.state.changeName,
                            updateFail: true
                        }
                    });
                }
                this.props.resetMyAccountStatus();
            }
            //// Change name

            //// Change password:
            if( prevProps.changePasswordSuccess !== this.props.changePasswordSuccess && this.props.changePasswordSuccess !== results.default )
            {
                if( this.props.changePasswordSuccess === results.success ) {
                    this.setState({
                        changePassword: { ...this.state.changePassword,
                            updateSuccess: true
                        }
                    });
                }
                else if( this.props.changePasswordSuccess === results.failure ) {
                    this.setState({
                        changePassword: { ...this.state.changePassword,
                            updateFail: true
                        }
                    });
                }
                this.props.resetMyAccountStatus();
            }
            //// Change password

            //// Close Account:
            if( prevProps.closeAccountSuccess !== this.props.closeAccountSuccess && this.props.closeAccountSuccess !== results.default )
            {
                if( this.props.closeAccountSuccess === results.success ) {
                    this.setState({
                        closeAccount: { ...this.state.closeAccount,
                            updateSuccess: true
                        }
                    });
                }
                else if( this.props.closeAccountSuccess === results.failure ) {
                    this.setState({
                        closeAccount: { ...this.state.closeAccount,
                            updateFail: true
                        }
                    });
                }
                this.props.resetMyAccountStatus();
            }
            //// Close Account
        }
        //// MyAccount methods

        //// Change name methods
        changeName_nameHandle( event: any ): void {
            let newText = checkRegexText( event.target.value, this.state.changeName.name, REGEX_FIELD.NAME );
            this.setState({
                changeName: { ...this.state.changeName,
                    name: newText,
                    emptyName: false                                     
                }
            });
        }

        changeName_surnameHandle( event: any ): void {
            let newText = checkRegexText( event.target.value, this.state.changeName.surname, REGEX_FIELD.NAME );
            this.setState({
                changeName: { ...this.state.changeName,
                    surname: newText,
                    emptySurname: false                                       
                }
            });
        }

        changeName_submitHandle(): void {
            this.setState({
                changeName: { ...this.state.changeName,
                    updateFail: false,
                    updateSuccess: false
                }
            });

            let success = true;
            if( this.state.changeName.name.trim() === '' )
            {
                success = false;
                this.setState({
                    changeName: { ...this.state.changeName,
                        emptyName: true,
                        updateFail: true
                    }
                })
            }

            if( this.state.changeName.surname.trim() === '' )
            {
                success = false;
                this.setState({
                    changeName: { ...this.state.changeName,
                        emptySurname: true,
                        updateFail: true
                    }
                })
            }
            if ( success && ( this.state.changeName.name !== this.props.currentUser.name || this.state.changeName.surname !== this.props.currentUser.surname ) ) {
                this.props.changeName( this.state.changeName.name, this.state.changeName.surname, this.props.currentUser.uuid );
            }                                 
        }
        //// Change name methods

        render(){            
            return(     
                 <WrappedComponent 
                    changeName = {{
                        text: this.props.myAccountText.changeNameText,
                        email: this.props.currentUser.email,
                        name: this.state.changeName.name,
                        surname: this.state.changeName.surname,
                        emptyName: this.state.changeName.emptyName,
                        emptySurname: this.state.changeName.emptySurname,
                        updateSuccess: this.state.changeName.updateSuccess,
                        updateFail: this.state.changeName.updateFail,
                        nameHandle: this.changeName_nameHandle,
                        surnameHandle: this.changeName_surnameHandle,
                        submitHandle: this.changeName_submitHandle,
                        loading: this.state.changeName.loading
                    }}
                    changePassword = {{
                        text: this.props.myAccountText.changePasswordText,
                        oldPassword: this.state.changePassword.oldPassword,
                        newPassword: this.state.changePassword.newPassword,
                        repeatPassword: this.state.changePassword.repeatPassword,
                        emptyOldPassword: this.state.changePassword.emptyOldPassword,
                        emptynewPassword: this.state.changePassword.emptynewPassword,
                        notMatchPassword: this.state.changePassword.notMatchPassword,
                        wrongOldPassword: this.state.changePassword.wrongOldPassword,
                        updateSuccess: this.state.changePassword.updateSuccess,
                        updateFail: this.state.changePassword.updateFail,
                        loading: this.state.changePassword.loading,
                        oldPasswordHandle: () => {},
                        oldPasswordCheck: () => {},
                        newPasswordHandle: () => {},
                        repeatPasswordHandle: () => {},
                        repeatPasswordCheck: () => {},
                        submitHandle: () => {}
                    }}
                    closeAccount = {{
                        text: this.props.myAccountText.closeAccountText,
                        userEnabled: this.props.currentUser.enabled,
                        password: this.state.closeAccount.password,
                        repeatPassword: this.state.closeAccount.repeatPassword,
                        email: this.state.closeAccount.email,
                        emptyPassword: this.state.closeAccount.emptyPassword,
                        passwordNotMatch: this.state.closeAccount.passwordNotMatch,
                        checkEmail: this.state.closeAccount.checkEmail,
                        invalidEmail: this.state.closeAccount.invalidEmail,
                        updateSuccess: this.state.closeAccount.updateSuccess,
                        updateFail: this.state.closeAccount.updateFail,
                        loading: this.state.closeAccount.loading,
                        passwordHandle: () => {},
                        repeatPasswordHandle: () => {},
                        repeatPasswordCheck: () => {},
                        emailHandle: () => {},
                        closeHandle: () => {},
                        disableHandle: () => {},
                        checkEmailHandle: () => {}
                    }}
                    myAccountText = { this.props.myAccountText.myAccountText }
                    changeTabHandle = { this.changeTabHandle }
                 />
            );
        }
    }

    const mapDispatchToProps = ( dispatch: Function ) : IMyAccountLogicActions => ({
        changeName: ( name: string, surname: string, uuid: string ) => dispatch( changeName( name, surname, uuid ) ),
        resetMyAccountStatus: () => dispatch( resetMyAccountStatus() )
    });

    const mapStateToProps = ( state: Istore ) : IMyAccountLogicProps => {
        return {       
            myAccountText: state.appSettings.myAccountText,
            currentUser: state.myAccount.loggedUser,
            changeNameSuccess: state.myAccount.changeName.success,
            changePasswordSuccess: state.myAccount.changePassword.success,
            closeAccountSuccess: state.myAccount.closeAccount.success
        }
    };

    return connect( mapStateToProps, mapDispatchToProps )( MyAccountLogic );
}

export default myAccountLogic;