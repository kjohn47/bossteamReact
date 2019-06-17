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
import { checkRegexText, REGEX_FIELD, results, checkEmailRegex } from '../../../settings';
import { resetMyAccountStatus, changeName, checkPassword, changePassword, checkEmail, resetMyAccountSuccess, disableAccount, enableAccount, closeAccount } from '../../../store/actions/myAccount';

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
                    updateSuccess: false
                },
                changePassword: {
                    oldPassword: "",
                    newPassword: "",
                    repeatPassword: "",
                    emptyOldPassword: false,
                    emptynewPassword: false,
                    notMatchPassword: false,
                    updateFail: false,
                    updateSuccess: false,
                    validPasswordRepeat: false
                },
                closeAccount: {
                    password: "",
                    email: "",
                    emptyPassword: false,
                    invalidEmail: false,
                    updateFail: false,
                    updateSuccess: false
                }
            }
            this.state = {...this._defaultState};
            this.changeTabHandle = this.changeTabHandle.bind( this );
            this.changeName_nameHandle = this.changeName_nameHandle.bind( this );
            this.changeName_surnameHandle = this.changeName_surnameHandle.bind( this );
            this.changeName_submitHandle = this.changeName_submitHandle.bind( this );
            this.changePassword_oldPasswordHandle = this.changePassword_oldPasswordHandle.bind( this );
            this.changePassword_newPasswordHandle = this.changePassword_newPasswordHandle.bind( this );
            this.changePassword_repeatPasswordHandle = this.changePassword_repeatPasswordHandle.bind( this );
            this.changePassword_oldPasswordCheck = this.changePassword_oldPasswordCheck.bind( this );
            this.changePassword_repeatPasswordCheck = this.changePassword_repeatPasswordCheck.bind( this );
            this.changePassword_submitHandle = this.changePassword_submitHandle.bind( this );
            this.closeAccount_CheckPassword = this.closeAccount_CheckPassword.bind( this );
            this.closeAccount_passwordHandle = this.closeAccount_passwordHandle.bind( this );
            this.closeAccount_emailHandle = this.closeAccount_emailHandle.bind( this );
            this.closeAccount_CheckEmail = this.closeAccount_CheckEmail.bind( this );
            this.closeAccount_checkValues = this.closeAccount_checkValues.bind( this );
            this.closeAccount_disableHandle = this.closeAccount_disableHandle.bind( this );
            this.closeAccount_closeHandle = this.closeAccount_closeHandle.bind( this );
        }

        //// MyAccount methods
        changeTabHandle() {
            this.setState({...this._defaultState});
            this.props.resetMyAccountStatus();
            this.props.resetMyAccountSuccess();
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
                    this._defaultState = {...this._defaultState,
                        changeName: {...this._defaultState.changeName,
                            name: this.props.currentUser.name,
                            surname: this.props.currentUser.surname
                        }
                    }
                    this.props.resetMyAccountStatus();
                }
                else if( this.props.changeNameSuccess === results.failure ) {
                    this.setState({
                        changeName: { ...this.state.changeName,
                            updateFail: true
                        }
                    });
                } 
                this.props.resetMyAccountSuccess();               
            }
            //// Change name

            //// Change password:
            if( prevProps.changePasswordSuccess !== this.props.changePasswordSuccess && this.props.changePasswordSuccess !== results.default )
            {
                if( this.props.changePasswordSuccess === results.success ) {
                    this.setState({
                        changePassword: { ...this.state.changePassword,
                            updateSuccess: true,
                            validPasswordRepeat: false,
                            oldPassword: '',
                            newPassword: '',
                            repeatPassword: ''
                        }
                    });
                    this.props.resetMyAccountStatus();
                }
                else if( this.props.changePasswordSuccess === results.failure ) {
                    this.setState({
                        changePassword: { ...this.state.changePassword,
                            updateFail: true
                        }
                    });
                }
                this.props.resetMyAccountSuccess();                
            }
            //// Change password

            //// Close Account:
            if( prevProps.closeAccountSuccess !== this.props.closeAccountSuccess && this.props.closeAccountSuccess !== results.default )
            {
                if( this.props.closeAccountSuccess === results.success ) {
                    this.setState({
                        closeAccount: { ...this.state.closeAccount,
                            updateSuccess: true,
                            email: "",
                            password: "",
                            emptyPassword: false,
                            invalidEmail: false,
                            updateFail: false
                        }
                    });
                    this.props.resetMyAccountStatus();
                }
                else if( this.props.closeAccountSuccess === results.failure ) {
                    this.setState({
                        closeAccount: { ...this.state.closeAccount,
                            updateFail: true
                        }
                    });
                }
                this.props.resetMyAccountSuccess();
            }
            //// Close Account
        }
        //// MyAccount methods

        //// Change name methods
        changeName_nameHandle( event: React.FormEvent<HTMLInputElement> ): void {
            let newText = checkRegexText( event.currentTarget.value, this.state.changeName.name, REGEX_FIELD.NAME );
            this.setState({
                changeName: { ...this.state.changeName,
                    name: newText,
                    emptyName: false                                     
                }
            });
        }

        changeName_surnameHandle( event: React.FormEvent<HTMLInputElement> ): void {
            let newText = checkRegexText( event.currentTarget.value, this.state.changeName.surname, REGEX_FIELD.NAME );
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

        //// Change password methods
        changePassword_oldPasswordHandle( event: React.FormEvent<HTMLInputElement> ): void {
            this.setState({
                changePassword: { ...this.state.changePassword,
                    oldPassword: event.currentTarget.value,
                    emptyOldPassword: false
                }
            })
        }

        changePassword_newPasswordHandle( event: React.FormEvent<HTMLInputElement> ): void {
            this.setState({
                changePassword: { ...this.state.changePassword,
                    newPassword: event.currentTarget.value,
                    repeatPassword: '',
                    emptynewPassword: false
                }
            })
        }

        changePassword_repeatPasswordHandle( event: React.FormEvent<HTMLInputElement> ): void {
            this.setState({
                changePassword: { ...this.state.changePassword,
                    repeatPassword: event.currentTarget.value,
                    notMatchPassword: false
                }
            });
        }

        changePassword_oldPasswordCheck(): void { 
            if( this.state.changePassword.oldPassword.trim() !== '' ) {
                this.props.checkPassword( this.state.changePassword.oldPassword, this.props.currentUser.uuid, true );
            }
        }

        changePassword_repeatPasswordCheck(): void {            
            if( this.state.changePassword.newPassword.trim() !== '' && this.state.changePassword.repeatPassword.trim() !== '' ) {            
                if( this.state.changePassword.newPassword === this.state.changePassword.repeatPassword ) {
                    this.setState({
                        changePassword: { ...this.state.changePassword,
                            notMatchPassword: false,
                            validPasswordRepeat: true
                        }
                    });
                }
                else {
                    this.setState({
                        changePassword: { ...this.state.changePassword,
                            notMatchPassword: true,
                            validPasswordRepeat: false
                        }
                    });
                }
            }
            else {
                this.setState({
                    changePassword: { ...this.state.changePassword,
                        notMatchPassword: false,
                        validPasswordRepeat: false
                    }
                });
            }
        }

        changePassword_submitHandle(): void {
            let success: boolean = this.state.changePassword.validPasswordRepeat && this.props.validPassword;
            let emptyOldPw: boolean = false;
            let emptyNewPw: boolean = false;
            let pwRepeat: boolean = false;
            this.setState({
                changePassword: { ...this.state.changePassword,
                    updateFail: false,
                    updateSuccess: false
                 }
            });

            if( this.state.changePassword.oldPassword.trim() === '' ) {
                emptyOldPw = true;
                success = false;
            }
            
            if( this.state.changePassword.newPassword.trim() === '' ) {
                emptyNewPw = true;
                success = false;
            }

            if( this.state.changePassword.newPassword !== this.state.changePassword.repeatPassword ) {
                success = false;
                pwRepeat = true;
            }

            if( success ) {
                this.props.changePassword( this.state.changePassword.oldPassword, this.state.changePassword.newPassword, this.props.currentUser.uuid );
            }
            else {
                this.setState({
                    changePassword: { ...this.state.changePassword,
                        updateSuccess: false,
                        updateFail: true,
                        emptynewPassword: emptyNewPw,
                        emptyOldPassword: emptyOldPw,
                        notMatchPassword: pwRepeat
                    }
                });
            }
        }
        //// Change password methods

        //// Close Account Methods
        closeAccount_checkValues(): boolean {
            let success = this.props.validPassword && this.props.validEmail;
            let emptyPW = this.state.closeAccount.emptyPassword;
            let invalidMail = this.state.closeAccount.invalidEmail;
            this.setState({
                closeAccount: { ...this.state.closeAccount,
                    updateFail: false,
                    updateSuccess: false
                }
            });

            if( this.state.closeAccount.password.trim() === '' ) {
                success = false;
                emptyPW = true;
            }

            if( this.state.closeAccount.email.trim() === '' || !checkEmailRegex( this.state.closeAccount.email ) ) {
                success = false;
                invalidMail = true;
            }
            
            if( !success ) {
                this.setState({
                    closeAccount: { ...this.state.closeAccount,
                        emptyPassword: emptyPW,
                        invalidEmail: invalidMail,
                        updateFail: true,
                        updateSuccess: false
                    }
                });
            }

            return success;
        }

        closeAccount_passwordHandle( event: React.FormEvent<HTMLInputElement> ): void {
            this.setState({
                closeAccount: { ...this.state.closeAccount,
                    password: event.currentTarget.value,
                    emptyPassword: false                    
                }
            });
        }

        closeAccount_emailHandle( event: React.FormEvent<HTMLInputElement> ): void {
            let newText: string = checkRegexText( event.currentTarget.value, this.state.closeAccount.email, REGEX_FIELD.EMAIL );
            this.setState({
                closeAccount: { ...this.state.closeAccount,
                    email: newText,
                    invalidEmail: false
                }
            });
        }

        closeAccount_CheckPassword(): void {
            if( this.state.closeAccount.password.trim() !== '' ) {
                this.props.checkPassword( this.state.closeAccount.password, this.props.currentUser.uuid, false );
            }
        }

        closeAccount_CheckEmail(): void {
            if( this.state.closeAccount.email.trim() !== '' ) {
                if( checkEmailRegex( this.state.closeAccount.email ) ) {
                    this.props.checkEmail( this.state.closeAccount.email, this.props.currentUser.uuid );
                }
                else {
                    this.setState({
                        closeAccount: { ...this.state.closeAccount,
                            invalidEmail: true
                        }
                    });
                }                
            }
        }

        closeAccount_disableHandle(): void {
            if( this.closeAccount_checkValues() ) {
                if( this.props.currentUser.enabled ) {
                    this.props.disableAccount( this.state.closeAccount.email, this.state.closeAccount.password, this.props.currentUser.uuid );
                }
                else {
                    this.props.enableAccount( this.state.closeAccount.email, this.state.closeAccount.password, this.props.currentUser.uuid );
                }
            }
        }

        closeAccount_closeHandle(): void {
            if( this.closeAccount_checkValues() ) {
                this.props.closeAccount( this.state.closeAccount.email, this.state.closeAccount.password, this.props.currentUser.uuid );
            }
        }
        //// Close Account Methods

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
                        loading: this.props.loading
                    }}
                    changePassword = {{
                        text: this.props.myAccountText.changePasswordText,
                        oldPassword: this.state.changePassword.oldPassword,
                        newPassword: this.state.changePassword.newPassword,
                        repeatPassword: this.state.changePassword.repeatPassword,
                        emptyOldPassword: this.state.changePassword.emptyOldPassword,
                        emptynewPassword: this.state.changePassword.emptynewPassword,
                        notMatchPassword: this.state.changePassword.notMatchPassword,
                        validPasswordRepeat: this.state.changePassword.validPasswordRepeat,
                        oldPasswordLoading: this.props.passwordLoading,
                        wrongOldPassword: this.props.wrongPassword,
                        validOldPassword: this.props.validPassword,
                        updateSuccess: this.state.changePassword.updateSuccess,
                        updateFail: this.state.changePassword.updateFail,
                        loading: this.props.loading,
                        oldPasswordHandle: this.changePassword_oldPasswordHandle,
                        oldPasswordCheck: this.changePassword_oldPasswordCheck,
                        newPasswordHandle: this.changePassword_newPasswordHandle,
                        repeatPasswordHandle: this.changePassword_repeatPasswordHandle,
                        repeatPasswordCheck: this.changePassword_repeatPasswordCheck,
                        submitHandle: this.changePassword_submitHandle
                    }}
                    closeAccount = {{
                        text: this.props.myAccountText.closeAccountText,
                        userEnabled: this.props.currentUser.enabled,
                        password: this.state.closeAccount.password,
                        email: this.state.closeAccount.email,
                        emptyPassword: this.state.closeAccount.emptyPassword,
                        passwordNotMatch: this.props.wrongPassword,
                        passwordLoading: this.props.passwordLoading,
                        emailLoading: this.props.emailLoading,
                        checkEmail: this.props.wrongEmail,
                        validPassword: this.props.validPassword,
                        validEmail: this.props.validEmail,
                        invalidEmail: this.state.closeAccount.invalidEmail,
                        updateSuccess: this.state.closeAccount.updateSuccess,
                        updateFail: this.state.closeAccount.updateFail,
                        loading: this.props.loading,
                        passwordHandle: this.closeAccount_passwordHandle,
                        passwordCheck: this.closeAccount_CheckPassword,
                        emailHandle: this.closeAccount_emailHandle,
                        closeHandle: this.closeAccount_closeHandle,
                        disableHandle: this.closeAccount_disableHandle,
                        emailCheck: this.closeAccount_CheckEmail
                    }}
                    myAccountText = { this.props.myAccountText.myAccountText }
                    changeTabHandle = { this.changeTabHandle }
                    isLoading = { this.props.loading || this.props.emailLoading || this.props.passwordLoading }
                 />
            );
        }
    }

    const mapDispatchToProps = ( dispatch: Function ) : IMyAccountLogicActions => ({
        changeName: ( name: string, surname: string, uuid: string ) => dispatch( changeName( name, surname, uuid ) ),
        resetMyAccountStatus: () => dispatch( resetMyAccountStatus() ),
        resetMyAccountSuccess: () => dispatch( resetMyAccountSuccess() ),
        checkPassword: ( password: string, uuid: string, passwordChange: boolean ) => dispatch( checkPassword( password, uuid, passwordChange ) ),
        changePassword: ( oldPassword: string, newPassword: string, uuid: string ) => dispatch( changePassword( oldPassword, newPassword, uuid ) ),
        checkEmail: ( email: string, uuid: string ) => dispatch( checkEmail( email, uuid ) ),
        disableAccount: ( email: string, password: string, uuid: string ) => dispatch( disableAccount( email, password, uuid ) ),
        enableAccount: ( email: string, password: string, uuid: string ) => dispatch( enableAccount( email, password, uuid ) ),
        closeAccount: ( email: string, password: string, uuid: string ) => dispatch( closeAccount( email, password, uuid ) )
    });

    const mapStateToProps = ( state: Istore ) : IMyAccountLogicProps => {
        return {       
            myAccountText: state.appSettings.myAccountText,
            currentUser: state.myAccount.loggedUser,
            changeNameSuccess: state.myAccount.changeName.success,
            changePasswordSuccess: state.myAccount.changePassword.success,
            closeAccountSuccess: state.myAccount.closeAccount.success,
            loading: state.appSettings.fetchData.loading.localLoading.loadMyAccount,
            passwordLoading: state.appSettings.fetchData.loading.localLoading.loadMyAccountPassword,
            wrongPassword: state.myAccount.changePassword.wrongOldPassword || state.myAccount.closeAccount.wrongPassword,
            validPassword: state.myAccount.changePassword.validOldPassword || state.myAccount.closeAccount.validPassword,
            wrongEmail: state.myAccount.closeAccount.wrongEmail,
            validEmail: state.myAccount.closeAccount.validEmail,
            emailLoading: state.appSettings.fetchData.loading.localLoading.loadMyAccountEmail
        }
    };

    return connect( mapStateToProps, mapDispatchToProps )( MyAccountLogic );
}

export default myAccountLogic;