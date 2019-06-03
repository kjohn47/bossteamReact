export interface IRegistrationText {
    title: string;
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    submit: string;
    emptyValidation: string;
    invalidEmail: string;
    userInUse: string;
}

export interface IRegistrationTextTranslations {
    PT: IRegistrationText;
    EN: IRegistrationText;
}

export interface IRegistrationAction {
    type: string;
    payload?: IRegistrationPayload;
}

export interface IRegistrationPayload {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;    
}

export interface IRegistrationActions {
    makeUserRegistration( name: string, surname:string, email:string, username: string, password: string ): Function;
    checkUserNameRegistration( username: string ): Function;
}

export interface IRegistrationPropsView {
    handleUsername( event: any ): void;
    handleEmail( event: any ): void;
    handleName( event: any ): void;
    handleSurname( event: any ): void;
    handlePassword( event: any ): void;
    handleSubmit(): void;
    registrationText: IRegistrationText;
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    nameIsEmpty: boolean;
    surnameIsEmpty: boolean;
    emailIsNotValid: boolean;
    usernameIsEmpty: boolean;
    usernameIsInUse: boolean;
    passwordIsEmpty: boolean;
    isUsernameLoading: boolean;
}

export interface IRegistrationStateLogic {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    nameIsEmpty: boolean;
    surnameIsEmpty: boolean;
    emailIsNotValid: boolean;
    usernameIsEmpty: boolean;
    passwordIsEmpty: boolean;
}

export interface IRegistrationPropsRedux {
    registrationText: IRegistrationText;
    isLogged: boolean;
    usernameInUse: boolean;
    isUsernameLoading: boolean;
}

export interface IRegistrationReduxState {
    usernameInUse: boolean;
}

export type RegistrationLogicType = IRegistrationPropsRedux & IRegistrationActions;