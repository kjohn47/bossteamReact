import { IRegistrationTextTranslations } from "../../interfaces/registration";

export const TEXT_REGISTRATION: IRegistrationTextTranslations = {
    PT: {
        title: "Registar:",
        name: "Nome:",
        surname: "Sobrenome:",
        email: "E-Mail:",
        username: "Utilizador:",
        password: "Password:",
        submit: "Enviar",
        emptyValidation: "O campo '[FIELD]' tem de ser preenchido",
        invalidEmail: "Formato e-mail inválido. 'aaa@bbb.com'",
        userInUse: "Este utilizador já se encontra a ser utilizado"
    },
    EN: {
        title: "Registration:",
        name: "Name:",
        surname: "Surname:",
        email: "E-Mail:",
        username: "Username:",
        password: "Password:",
        submit: "Send",
        emptyValidation: "The field '[FIELD]' cannot be empty",
        invalidEmail: "Invalid e-mail format. 'aaa@bbb.com'",
        userInUse: "This username is already in use"
    }

}