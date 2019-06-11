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
                    email: this.props.currentUser.email,
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
                    wrongOldPassword: false,
                    updateFail: false,
                    updateSuccess: false
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
                    updateSuccess: false
                }
            }
            this.state = {...this._defaultState};            
            this.changeTabHandle = this.changeTabHandle.bind( this );
        }

        changeTabHandle() {
            this.setState({...this._defaultState});
        }

        render(){            
            return(     
                 <WrappedComponent 
                    changeName = {{
                        text: this.props.myAccountText.changeNameText,
                        email: this.state.changeName.email,
                        name: this.state.changeName.name,
                        surname: this.state.changeName.surname,
                        emptyName: this.state.changeName.emptyName,
                        emptySurname: this.state.changeName.emptySurname,
                        updateSuccess: this.state.changeName.updateSuccess,
                        updateFail: this.state.changeName.updateFail,
                        nameHandle: () => {},
                        surnameHandle: () => {},
                        submitHandle: () => {}
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

    });

    const mapStateToProps = ( state: Istore ) : IMyAccountLogicProps => {
        return {       
            myAccountText: state.appSettings.myAccountText,
            currentUser: state.appSettings.loggedUser
        }
    };

    return connect( mapStateToProps, mapDispatchToProps )( MyAccountLogic );
}

export default myAccountLogic;