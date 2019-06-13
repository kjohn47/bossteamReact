import * as React from 'react';
import {Istore} from '../../../interfaces/store';
import {connect} from 'react-redux';
import { 
    IRegistrationPropsView, 
    IRegistrationPropsRedux, 
    IRegistrationActions, 
    IRegistrationStateLogic, 
    RegistrationLogicType
    } from '../../../interfaces/registration';
import { checkRegexText, REGEX_FIELD, pageHome } from '../../../settings';
import { checkUserNameRegistration, makeUserRegistration, resetRegistration } from '../../../store/actions/registration';
import { Redirect } from 'react-router';

function registrationLogic( WrappedComponent: React.ComponentType<IRegistrationPropsView> ) : React.ComponentType
{
    class RegistrationLogic extends React.Component< RegistrationLogicType, IRegistrationStateLogic >
    {
        constructor( props: RegistrationLogicType )
        {
            super( props );
            this.handleName = this.handleName.bind( this );
            this.handleSurname = this.handleSurname.bind( this );
            this.handleEmail = this.handleEmail.bind( this );
            this.handleUsername = this.handleUsername.bind( this );
            this.handlePassword = this.handlePassword.bind( this );
            this.checkUsername = this.checkUsername.bind( this );
            this.handleSubmit = this.handleSubmit.bind( this );
            this.state = {
                name: '',
                surname: '',
                email: '',
                username: '',
                submitedUsername: '',
                password: '',
                nameIsEmpty: false,
                surnameIsEmpty: false,
                emailIsNotValid: false,
                usernameIsEmpty: false,
                passwordIsEmpty: false,
                triedSubmit: false,
                validatingUsername: false
            }
        }
        
        componentDidUpdate( prevProps: RegistrationLogicType ) {
            if ( this.props.registrationSuccess !== prevProps.registrationSuccess ) {
                if( this.props.registrationSuccess && this.state.triedSubmit ) {
                    this.setState({
                        name: '',
                        surname: '',
                        email: '',
                        username: '',
                        password: '',
                        validatingUsername: false
                    });
                }
            }
        }
        
        componentWillUnmount() {
            this.props.resetRegistration();
        }


        handleName( event: React.FormEvent<HTMLInputElement> ): void {
            let newText = checkRegexText( event.currentTarget.value, this.state.name, REGEX_FIELD.NAME );
            this.setState({
                name: newText,
                nameIsEmpty: false
            });
        }
        
        handleSurname( event: React.FormEvent<HTMLInputElement> ): void {
            let newText = checkRegexText( event.currentTarget.value, this.state.surname, REGEX_FIELD.NAME );
            this.setState({
                surname: newText,
                surnameIsEmpty: false
            });
        }

        handleEmail( event: React.FormEvent<HTMLInputElement> ): void {
            let newText = checkRegexText( event.currentTarget.value, this.state.email, REGEX_FIELD.EMAIL );
            this.setState({
                email: newText,
                emailIsNotValid: false
            })
        }

        handleUsername( event: React.FormEvent<HTMLInputElement> ): void {
            let newText = checkRegexText( event.currentTarget.value, this.state.username, REGEX_FIELD.USERNAME );
            this.setState({
                username: newText,
                usernameIsEmpty: false,
                validatingUsername: false
            })
        }

        checkUsername(): void {
            if( this.state.username.length > 0 ) {
                if( this.state.username !== this.state.submitedUsername )
                {
                    this.props.checkUserNameRegistration( this.state.username );
                    this.setState({
                        validatingUsername: true,
                        submitedUsername: this.state.username
                    })
                }
            }
        }

        handlePassword( event: React.FormEvent<HTMLInputElement> ): void {
            this.setState({
                password: event.currentTarget.value,
                passwordIsEmpty: false
            })
        }

        handleSubmit(): void { 
            this.setState({
                triedSubmit: false
            });

            let isvalid = true;

            if( this.state.username.trim() === '' )
            {
                this.setState({
                    usernameIsEmpty: true,
                    validatingUsername: false
                });
                isvalid = false;
            }     

            if( this.state.name.trim() === '' )
            {
                this.setState({
                    nameIsEmpty: true
                });
                isvalid = false;
            }

            if( this.state.surname.trim() === '' )
            {
                this.setState({
                    surnameIsEmpty: true
                });
                isvalid = false;
            }          
            
            var emailRegex = /^[\.a-zA-Z0-9]+@+[a-zA-Z0-9\.]+\.+[A-Za-z]+$/

            if( this.state.email.trim() === '' || !emailRegex.test( this.state.email ) )
            {
                this.setState({
                    emailIsNotValid: true
                });
                isvalid = false;
            }     

            if( this.state.password.trim() === '' )
            {
                this.setState({
                    passwordIsEmpty: true
                });
                isvalid = false;
            }     

            if( isvalid && !this.props.usernameInUse )
            {                
                this.props.makeUserRegistration( this.state.name, this.state.surname, this.state.email, this.state.username, this.state.password );
                this.setState({
                    triedSubmit: true,
                    submitedUsername: this.state.username
                });
            }
        }

        render(){
            return(
                this.props.isLogged?
                    <Redirect to = { pageHome } />
                :
                    <WrappedComponent 
                        name = { this.state.name }
                        surname = { this.state.surname }
                        email = { this.state.email }
                        username = { this.state.username }
                        submitedUsername = { this.state.submitedUsername }
                        password = { this.state.password }
                        nameIsEmpty = { this.state.nameIsEmpty }
                        surnameIsEmpty = { this.state.surnameIsEmpty }
                        emailIsNotValid = { this.state.emailIsNotValid }
                        usernameIsEmpty = { this.state.usernameIsEmpty }
                        usernameIsInUse = { this.props.usernameInUse }
                        passwordIsEmpty = { this.state.passwordIsEmpty }                  
                        handleName = { this.handleName }
                        handleSurname = { this.handleSurname }
                        handleEmail = { this.handleEmail }
                        handleUsername = { this.handleUsername }
                        handlePassword = { this.handlePassword }
                        handleSubmit = { this.handleSubmit }
                        registrationText = { this.props.registrationText }
                        isUsernameLoading = { this.props.isUsernameLoading }   
                        checkUsername = { this.checkUsername }    
                        failedToRegist = { this.state.triedSubmit && !this.props.registrationSuccess } 
                        successToRegist = { this.state.triedSubmit && this.props.registrationSuccess }     
                        validUsername = { this.state.validatingUsername && !this.props.usernameInUse && !this.props.isUsernameLoading }                                   
                    />
            )
        }
    }

    const mapStateToProps = (state: Istore ): IRegistrationPropsRedux => {
        return {
            isLogged: state.myAccount.isLogged,
            registrationText: state.appSettings.registrationText,
            usernameInUse: state.registration.usernameInUse,
            isUsernameLoading: state.appSettings.fetchData.loading.localLoading.loadUserRegistration,
            registrationSuccess: state.registration.registrationSuccess
        }
    }

    const mapDispatchToProps = (dispatch: Function): IRegistrationActions => ({
        makeUserRegistration: ( name: string, surname: string, email: string, username: string, password: string ) => dispatch( makeUserRegistration( name, surname, email, username, password ) ),
        checkUserNameRegistration: ( username: string ) => dispatch( checkUserNameRegistration( username ) ),
        resetRegistration: () => dispatch( resetRegistration() )
    })

    return connect(mapStateToProps, mapDispatchToProps)(RegistrationLogic)
}

export default registrationLogic;