
//login Menu
export interface IloginMenu {
    username : string;
    password : string;
    submit : string;
    register : string;
}

export interface ILogin {
    loginText?: IloginMenu;
    loginAction?: Function;
}