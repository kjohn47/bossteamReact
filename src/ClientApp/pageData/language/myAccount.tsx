import { IMyAccountTranslations } from "../../interfaces/myAccount";

export const TEXT_MY_ACCOUNT: IMyAccountTranslations = {
    PT: {
        myAccountText: {
            title: "Definições de conta:",
            nameTab: "Alterar Nome",
            passwordTab: "Alterar Password",
            closeTab: "Fechar Conta"
        },
        changeNameText: {
            title: "Alterar nome/sobrenome:",
            name: "Nome:",
            surname: "Sobrenome:",
            email: "Email:",
            submit: "Alterar",
            emptyField: "O campo [FIELD] tem de ser preenchido",
            success: "O nome foi alterado com sucesso",
            fail: "Ocorreu um erro a fazer a alteração"            
        },
        changePasswordText: {
            title: "Alterar a password:",
            oldPassword: "Antiga:",
            newPassword: "Nova:",
            repeatPassword: "Repetir:",
            submit: "Alterar",
            emptyField: "O campo [FIELD] tem de ser preenchido",
            passwordNotMatch: "A password colocada não coicide ou está incorreta",
            success: "A password foi alterada com sucesso",
            fail: "Ocorreu um erro a alterar a password"
        },
        closeAccountText: {
            title: "Fechar ou desativar conta de utilizador:",
            password: "Password:",
            email: "Email",
            close: "Fechar",
            disable: "Desativar",
            closeTooltip: "Ao fechar a conta, todos os seus dados serão eliminados e o login será libertado para nova conta. Vai ocorrer um logout após fecho da conta.",
            disableTooltip: "Ao desativar a conta, os dados não serão perdidos, serão desactivados todos os seus posts, comentários em outros posts permanecem. Poderá fazer login e reactivar a conta posteriormente.",
            enableToolTip: "Clique aqui para reactivar a conta",
            emptyField: "O campo [FIELD] tem de ser preenchido",
            emailNotEqual: "O email colocado não coicide com o email do utilizador",
            invalidEmail: "Formato e-mail inválido. 'aaa@bbb.com'",
            passwordNotMatch: "A password colocada não coicide ou está incorreta", 
            success: "A conta foi (des)ativada com sucesso",
            fail: "Ocorreu um erro a fechar/(des)ativar a conta",
            enable: "Activar",
            cancel: "Cancelar",
            closeModalTitle: "Fechar Conta:"
        }
    },
    EN: {
        myAccountText: {
            title: "Account Settings",
            nameTab: "Change Name",
            passwordTab: "Change Password",
            closeTab: "Close Account"
        },
        changeNameText: {
            title: "Change name/surname:",
            name: "Name:",
            surname: "Surname:",
            email: "Email:",
            submit: "Change",
            emptyField: "The field [FIELD] cannot be empty",
            success: "The name was changed with success",
            fail: "An error occured during name change"            
        },
        changePasswordText: {
            title: "Change password:",
            oldPassword: "Old:",
            newPassword: "New:",
            repeatPassword: "Repeat:",
            submit: "Change",
            emptyField: "The field [FIELD] cannot be empty",
            passwordNotMatch: "The password didn't match or is wrong",
            success: "The password was changed with success",
            fail: "An error occured during password change"
        },
        closeAccountText: {
            title: "Close Account:",
            password: "Password:",
            email: "Email:",
            close: "Close",
            disable: "Disable",
            closeTooltip: "By closing the account, all your data will be deleted and your login will be free for new account creation. Logout will happen after closure.",
            disableTooltip: "By disabling your account, you wont loose any data. All your posts will be hidden, comments on other posts will stay visible. You can make login and re-enable your account.",
            enableToolTip: "Click here to enable your account",
            emptyField: "The field [FIELD] cannot be empty",
            emailNotEqual: "The email doesn't match with your user account",
            invalidEmail: "Invalid e-mail format. 'aaa@bbb.com'",
            passwordNotMatch: "The password didn't match or is wrong", 
            success: "The account was disabled/enabled with success",
            fail: "There was an error during account disabling/enabling/closure",
            enable: "Enable",
            cancel: "Cancel",
            closeModalTitle: "Close Account:"
        }
    }
}