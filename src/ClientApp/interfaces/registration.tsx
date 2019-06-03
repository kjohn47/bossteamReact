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
    successText: string;
    failedRegistration: string;
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
    usernameInUse?: boolean;
    registrationSuccess?: boolean;
}

export interface IRegistrationActions {
    makeUserRegistration( name: string, surname:string, email:string, username: string, password: string ): Function;
    checkUserNameRegistration( username: string ): Function;
    resetRegistration(): Function;
}

export interface IRegistrationPropsView {
    handleUsername( event: any ): void;
    handleEmail( event: any ): void;
    handleName( event: any ): void;
    handleSurname( event: any ): void;
    handlePassword( event: any ): void;
    handleSubmit(): void;
    checkUsername(): void;
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
    failedToRegist: boolean;
    validUsername: boolean;
}

export interface IRegistrationSuccessPropsView {
    username: string;
    title: string;
    successText: string;
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
    triedSubmit: boolean;
    validatingUsername: boolean;
}

export interface IRegistrationPropsRedux {
    registrationText: IRegistrationText;
    isLogged: boolean;
    usernameInUse: boolean;
    isUsernameLoading: boolean;
    registrationSuccess: boolean;
}

export interface IRegistrationReduxState {
    usernameInUse: boolean;
    registrationSuccess: boolean;
}

export type RegistrationLogicType = IRegistrationPropsRedux & IRegistrationActions;

export interface ICheckUsernameResult {
    usernameInUse: boolean;
}

export interface IRegistrationResult {
    usernameInUse: boolean;
    registrationSuccess: boolean;
}

export interface IUserRegistrationArg {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
}