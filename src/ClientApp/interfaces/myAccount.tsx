import { IcurrentUser } from "./currentUser";

//// Change Name

export type IMyAccountChangeNameViewType = IMyAccountChangeNameViewProps & IMyAccountChangeNameViewStates & IMyAccountChangeNameViewMethods;

export interface IMyAccountChangeNameViewProps {
    text:IMyAccountChangeNameViewText;
}

export interface IMyAccountChangeNameViewStates {
    updateFail:boolean;
    updateSuccess:boolean;
    name: string;
    emptyName: boolean;
    surname: string;
    emptySurname:boolean;
    email:string;
}

export interface IMyAccountChangeNameViewMethods {
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

//// Change Name

//// Change Password

export type IMyAccountChangePasswordViewType = IMyAccountChangePasswordViewProps & IMyAccountChangePasswordViewStates & IMyAccountChangePasswordViewMethods;

export interface IMyAccountChangePasswordViewProps {
    text:IMyAccountChangePasswordViewText;
}

export interface IMyAccountChangePasswordViewStates {
    updateFail:boolean;
    updateSuccess:boolean;
    oldPassword: string;
    emptyOldPassword: boolean;
    wrongOldPassword: boolean;
    newPassword: string;
    emptynewPassword: boolean;
    repeatPassword:string;
    notMatchPassword: boolean;
}

export interface IMyAccountChangePasswordViewMethods {
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

//// Change Password

//// Close Account

export type IMyAccountCloseViewType = IMyAccountCloseViewProps & IMyAccountCloseViewStates & IMyAccountCloseViewMethods;

export interface IMyAccountCloseViewProps {
    text:IMyAccountCloseViewText;
    userEnabled:boolean;
}

export interface IMyAccountCloseViewStates {
    updateFail:boolean;
    updateSuccess:boolean;
    password: string;
    emptyPassword: boolean;
    repeatPassword: string;
    passwordNotMatch:boolean;
    email:string;
    invalidEmail: boolean;
    checkEmail: boolean;
}

export interface IMyAccountCloseViewMethods {
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
    enableToolTip: string;
    disable: string;
    close: string;
    enable: string;
}

//// Close Account

//// My Account View

export interface IMyAccountViewProps {
    changeName: IMyAccountChangeNameViewType;
    changePassword: IMyAccountChangePasswordViewType;
    closeAccount: IMyAccountCloseViewType;
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

//// My Account View

//// MyAccount Logic

export interface IMyAccountLogicState {
    changeName: IMyAccountChangeNameViewStates;
    changePassword: IMyAccountChangePasswordViewStates;
    closeAccount: IMyAccountCloseViewStates;
}

export interface IMyAccountLogicProps {
    myAccountText: IMyAccountAllText;
    currentUser: IcurrentUser;
}

export interface IMyAccountLogicActions {

}

export type MyAccountLogicType = IMyAccountLogicProps & IMyAccountLogicActions;

//// MyAccount Logic