import { IloginMenuTranslations, IloginFormHeaderTranslations } from "../../interfaces/login";
import { ptCode, enCode } from '../../settings';

export const TEXT_LOGIN_MENU_OBJECT: IloginMenuTranslations = {
        [ptCode]: {
                username : 'Nome do Utilizador',
                password : 'Password',
                register : 'Registar',
                submit : 'Entrar',
                emptyUser: 'Campo Utilizador Vazio',
                emptyPassword: 'Campo Password Vazio',
                invalidLogin: 'Utilizador ou Password Inválido',
                passwordRecover: 'Clique aqui para recuperar a password'
        },
        [enCode]: {
                username : 'Username',
                password : 'Password',
                register : 'Register',
                submit : 'Enter',
                emptyUser: 'Empty User Field',
                emptyPassword: 'Empty Password Field',
                invalidLogin: 'Invalid User or Password',
                passwordRecover: 'Click here to recover password'
        }
}

export const TEXT_NEED_LOGIN_OBJECT: IloginFormHeaderTranslations = {
        [ptCode]: {
                title: 'Login:',
                warning: 'Necessita fazer login para visualizar esta página!'
        },
        [enCode]: {
                title: 'Login',
                warning: 'You need to make login to be able to see this page!'
        }
}