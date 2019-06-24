import { IErrorHandlingErrors, IPageNotFoundTextTranslation } from "../../interfaces/common";
import { 
    ERROR_GENERIC, 
    ERROR_ADD_COMMENT, 
    ERROR_HOME_PAGE, 
    ERROR_GET_NEWS_LIST, 
    ERROR_GET_NEWS_DATA, 
    ERROR_LOGIN, 
    ERROR_LOGOUT, 
    ERROR_USER_REGISTRATION, 
    ERROR_MYACCOUNT_CHANGENAME, 
    ERROR_MYACCOUNT_CHANGEPASSWORD, 
    ERROR_MYACCOUNT_CLOSE_DISABLE, 
    ptCode,
    enCode 
} from "../../settings";

export const TEXT_PAGE_NOT_FOUND_OBJECT: IPageNotFoundTextTranslation = {
    [ptCode]: {
        errorTitle: "Erro: 404",
        errorMessage: "Página procurada não foi encontrada!"
    },
    [enCode]: {
        errorTitle: "Error: 404",
        errorMessage: "Searched page was not found!"
    }
}

//// Add new errors here
export const ERRORS: IErrorHandlingErrors = {
    [ERROR_GENERIC]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a carregar a página",
            errorTitle: "Erro: Desconhecido"
        },
        [enCode]: {
            errorMessage: "An error occurred when loading the page",
            errorTitle: "Error: Unknown"
        }
    },
    [ERROR_ADD_COMMENT]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a adicionar o comentario",
            errorTitle: "Erro: Comentário"
        },
        [enCode]: {
            errorMessage: "An error occurred when adding a comment",
            errorTitle: "Error: Comment"
        }
    },
    [ERROR_HOME_PAGE]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a carregar a homepage",
            errorTitle: "Erro: HomePage"
        },
        [enCode]: {
            errorMessage: "An error occurred when loading the homepage",
            errorTitle: "Error: HomePage"
        }
    },
    [ERROR_GET_NEWS_LIST]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a carregar a lista de notícias",
            errorTitle: "Erro: Lista Notícias"
        },
        [enCode]: {
            errorMessage: "An error occurred when loading the news list",
            errorTitle: "Error: News List"
        }
    },
    [ERROR_GET_NEWS_DATA]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a carregar os dados da notícia",
            errorTitle: "Erro: Notícias"
        },
        [enCode]: {
            errorMessage: "An error occurred when loading news data",
            errorTitle: "Error: News"
        }
    },
    [ERROR_LOGIN]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a iniciar a sessão",
            errorTitle: "Erro: Login"
        },
        [enCode]: {
            errorMessage: "An error occurred when starting the session",
            errorTitle: "Error: Login"
        }
    },
    [ERROR_LOGOUT]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a terminar a sessão",
            errorTitle: "Erro: Logout"
        },
        [enCode]: {
            errorMessage: "An error occurred when ending the session",
            errorTitle: "Error: Logout"
        }
    },
    [ERROR_USER_REGISTRATION]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a registar o utilizador",
            errorTitle: "Erro: Registo"
        },
        [enCode]: {
            errorMessage: "An error occurred when making user registration",
            errorTitle: "Error: Registration"
        }
    },
    [ERROR_MYACCOUNT_CHANGENAME]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a alterar o nome do utilizador",
            errorTitle: "Erro: A Minha Conta - Alterar Nome"
        },
        [enCode]: {
            errorMessage: "An error occurred when changing user name",
            errorTitle: "Error: My Account - Change Name"
        }
    },
    [ERROR_MYACCOUNT_CHANGEPASSWORD]: {
        [ptCode]: {
            errorMessage: "Ocurreu um erro a alterar a password do utilizador",
            errorTitle: "Erro: A Minha Conta - Alterar Password"
        },
        [enCode]: {
            errorMessage: "An error occurred when changing user password",
            errorTitle: "Error: My Account - Change Password"
        }
    },
    [ERROR_MYACCOUNT_CLOSE_DISABLE]: {
        [ptCode]: {
            errorTitle: "Erro: A Minha Conta - Fechar ou desactivar conta",
            errorMessage: "Ocurreu um erro durante o processo de fecho, (des)activação da conta"
        },
        [enCode]: {
            errorTitle: "Error: My Account - Close or disable account",
            errorMessage: "An error occurred when trying to close / enable / disable the account"
        }
    }
}