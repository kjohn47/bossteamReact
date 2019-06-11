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

        render(){            
            return(     
                 <WrappedComponent 
                    changeName = {{
                        text: this.props.myAccountText.changeNameText,
                        email: "mail@test.com",
                        name: "",
                        surname: "",
                        emptyName: false,
                        emptySurname: false,
                        updateSuccess: false,
                        updateFail: false,
                        nameHandle: () => {},
                        surnameHandle: () => {},
                        submitHandle: () => {}

                    }}
                    changePassword = {{
                        text: this.props.myAccountText.changePasswordText,
                        oldPassword: "",
                        newPassword: "",
                        repeatPassword: "",
                        emptyOldPassword: false,
                        emptynewPassword: false,
                        notMatchPassword: false,
                        wrongOldPassword: false,
                        updateSuccess: false,
                        updateFail: false,
                        oldPasswordHandle: () => {},
                        oldPasswordCheck: () => {},
                        newPasswordHandle: () => {},
                        repeatPasswordHandle: () => {},
                        repeatPasswordCheck: () => {},
                        submitHandle: () => {}
                    }}
                    closeAccount = {{
                        text: this.props.myAccountText.closeAccountText,
                        userEnabled: true,
                        password: "",
                        repeatPassword: "",
                        email: "",
                        emptyPassword: false,
                        passwordNotMatch: false,
                        checkEmail: false,
                        invalidEmail: false,
                        updateSuccess: false,
                        updateFail: false,
                        passwordHandle: () => {},
                        repeatPasswordHandle: () => {},
                        repeatPasswordCheck: () => {},
                        emailHandle: () => {},
                        closeHandle: () => {},
                        disableHandle: () => {},
                        checkEmailHandle: () => {}
                    }}
                    myAccountText = { this.props.myAccountText.myAccountText }
                    changeTabHandle = { () => {} }
                 />
            );
        }
    }    

    const mapDispatchToProps = ( dispatch: Function ) : IMyAccountLogicActions => ({

    });

    const mapStateToProps = ( state: Istore ) : IMyAccountLogicProps => {
        return {       
            myAccountText: state.appSettings.myAccountText          
        }
    };

    return connect( mapStateToProps, mapDispatchToProps )( MyAccountLogic );
}

export default myAccountLogic;