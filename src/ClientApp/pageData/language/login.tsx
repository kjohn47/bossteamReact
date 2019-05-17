import { IloginMenu } from "../../interfaces/login";


export const defaultLoginForm: IloginMenu = {
        username : '#Username',
        password : '#Password',
        register : '#Register',
        submit : '#Submit',
        emptyUser: '#Empty User',
        emptyPassword: '#Empty Password',
        invalidLogin: '#Invalid User'

};

export const ptLoginForm: IloginMenu = {
        username : 'Nome do Utilizador',
        password : 'Password',
        register : 'Registar',
        submit : 'Entrar',
        emptyUser: 'Campo Utilizador Vazio',
        emptyPassword: 'Campo Password Vazio',
        invalidLogin: 'Utilizador ou Password Inválido'
};

export const enLoginForm: IloginMenu = {
        username : 'Username',
        password : 'Password',
        register : 'Register',
        submit : 'Enter',
        emptyUser: 'Empty User Field',
        emptyPassword: 'Empty Password Field',
        invalidLogin: 'Invalid User or Password'
};