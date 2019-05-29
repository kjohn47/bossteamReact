import { IloginMenuTranslations, IloginFormHeaderTranslations } from "../../interfaces/login";

export const TEXT_LOGIN_MENU: IloginMenuTranslations = {
        PT: {
                username : 'Nome do Utilizador',
                password : 'Password',
                register : 'Registar',
                submit : 'Entrar',
                emptyUser: 'Campo Utilizador Vazio',
                emptyPassword: 'Campo Password Vazio',
                invalidLogin: 'Utilizador ou Password Inválido'
        },
        EN: {
                username : 'Username',
                password : 'Password',
                register : 'Register',
                submit : 'Enter',
                emptyUser: 'Empty User Field',
                emptyPassword: 'Empty Password Field',
                invalidLogin: 'Invalid User or Password'
        }
}

export const TEXT_NEED_LOGIN: IloginFormHeaderTranslations = {
        PT: {
                title: 'Login:',
                warning: 'Necessita fazer login para visualizar esta página!'
        },
        EN: {
                title: 'Login',
                warning: 'You need to make login to be able to see this page!'
        }
}