export interface IMyAccountChangeNameViewProps {
    updateFail:boolean;
    updateSuccess:boolean;
    name: string;
    emptyName: boolean;
    surname: string;
    emptySurname:boolean;
    email:string;
    text:IMyAccountChangeNameViewText;
    nameHandle( event:any ): void;
    surnameHandle( event:any ): void;
    submitHandle(): void;
}

interface IMyAccountChangeNameViewText {
    title: string;
    name: string;
    surname: string;
    email: string;
    success: string;
    fail: string;
    emptyField: string;
    submit: string;
}

export interface IMyAccountChangePasswordViewProps {
    updateFail:boolean;
    updateSuccess:boolean;
    oldPassword: string;
    emptyOldPassword: boolean;
    wrongOldPassword: boolean;
    newPassword: string;
    emptynewPassword: boolean;
    repeatPassword:string;
    notMatchPassword: boolean;
    text:IMyAccountChangePasswordViewText;
    oldPasswordHandle( event:any ): void;
    oldPasswordCheck(): void;
    newPasswordHandle( event:any) : void;
    repeatPasswordHandle( event:any ): void;
    repeatPasswordCheck(): void;
    submitHandle(): void;
}

interface IMyAccountChangePasswordViewText {
    title: string;
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
    success: string;
    fail: string;
    emptyField: string;
    passwordNotMatch: string;
    submit: string;
}

export interface IMyAccountCloseViewProps {
    updateFail:boolean;
    updateSuccess:boolean;
    password: string;
    emptyPassword: boolean;
    repeatPassword: string;
    passwordNotMatch:boolean;
    email:string;
    invalidEmail: boolean;
    checkEmail: boolean;
    text:IMyAccountCloseViewText;
    passwordHandle( event:any ): void;
    repeatPasswordHandle( event:any ): void;
    repeatPasswordCheck(): void;
    emailHandle( event:any ): void;
    checkEmailHandle(): void;
    disableHandle(): void;
    closeHandle(): void;
}

interface IMyAccountCloseViewText {
    title: string;
    password: string;
    repeatPassword: string;
    email: string;
    success: string;
    fail: string;
    emptyField: string;
    invalidEmail: string;
    emailNotEqual: string;
    passwordNotMatch: string;
    disableTooltip: string;
    closeTooltip: string;
    disable: string;
    close: string;
}

export interface IMyAccountViewProps {
    changeName: IMyAccountChangeNameViewProps;
    changePassword: IMyAccountChangePasswordViewProps;
    closeAccount: IMyAccountCloseViewProps;
    myAccountText: IMyAccountText;
    changeTabHandle(): void;
}

interface IMyAccountText {
    title: string;
    nameTab: string;
    passwordTab: string;
    closeTab: string;
}

export interface IMyAccountAllText {
    changeNameText: IMyAccountChangeNameViewText;
    changePasswordText: IMyAccountChangePasswordViewText;
    closeAccountText: IMyAccountCloseViewText
    myAccountText: IMyAccountText;
}

export interface IMyAccountTranslations {
    PT: IMyAccountAllText;
    EN: IMyAccountAllText;
}

export interface IMyAccountLogicState {

}

export interface IMyAccountLogicProps {
    myAccountText: IMyAccountAllText;
}

export interface IMyAccountLogicActions {

}

export type MyAccountLogicType = IMyAccountLogicProps & IMyAccountLogicActions;