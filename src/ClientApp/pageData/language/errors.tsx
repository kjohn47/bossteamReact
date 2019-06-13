import { IErrorHandlingErrors, IPageNotFoundTextTranslation } from "../../interfaces/common";

export const TEXT_PAGE_NOT_FOUND: IPageNotFoundTextTranslation = {
    PT: {
        errorTitle: "Erro: 404",
        errorMessage: "Página procurada não foi encontrada!"
    },
    EN: {
        errorTitle: "Error: 404",
        errorMessage: "Searched page was not found!"
    }
}

export const ERRORS: IErrorHandlingErrors = {
    ERROR_GENERIC: {
        PT: {
            errorMessage: "Ocurreu um erro a carregar a página",
            errorTitle: "Erro: Desconhecido"
        },
        EN: {
            errorMessage: "An error occurred when loading the page",
            errorTitle: "Error: Unknown"
        }
    },
    ERROR_ADD_COMMENT: {
        PT: {
            errorMessage: "Ocurreu um erro a adicionar o comentario",
            errorTitle: "Erro: Comentário"
        },
        EN: {
            errorMessage: "An error occurred when adding a comment",
            errorTitle: "Error: Comment"
        }
    },
    ERROR_HOME_PAGE: {
        PT: {
            errorMessage: "Ocurreu um erro a carregar a homepage",
            errorTitle: "Erro: HomePage"
        },
        EN: {
            errorMessage: "An error occurred when loading the homepage",
            errorTitle: "Error: HomePage"
        }
    },
    ERROR_GET_NEWS_LIST: {
        PT: {
            errorMessage: "Ocurreu um erro a carregar a lista de notícias",
            errorTitle: "Erro: Lista Notícias"
        },
        EN: {
            errorMessage: "An error occurred when loading the news list",
            errorTitle: "Error: News List"
        }
    },
    ERROR_GET_NEWS_DATA: {
        PT: {
            errorMessage: "Ocurreu um erro a carregar os dados da notícia",
            errorTitle: "Erro: Notícias"
        },
        EN: {
            errorMessage: "An error occurred when loading news data",
            errorTitle: "Error: News"
        }
    },
    ERROR_LOGIN: {
        PT: {
            errorMessage: "Ocurreu um erro a iniciar a sessão",
            errorTitle: "Erro: Login"
        },
        EN: {
            errorMessage: "An error occurred when starting the session",
            errorTitle: "Error: Login"
        }
    },
    ERROR_LOGOUT: {
        PT: {
            errorMessage: "Ocurreu um erro a terminar a sessão",
            errorTitle: "Erro: Logout"
        },
        EN: {
            errorMessage: "An error occurred when ending the session",
            errorTitle: "Error: Logout"
        }
    },
    ERROR_USER_REGISTRATION: {
        PT: {
            errorMessage: "Ocurreu um erro a registar o utilizador",
            errorTitle: "Erro: Registo"
        },
        EN: {
            errorMessage: "An error occurred when making user registration",
            errorTitle: "Error: Registration"
        }
    },
    ERROR_MYACCOUNT_CHANGENAME: {
        PT: {
            errorMessage: "Ocurreu um erro a alterar o nome do utilizador",
            errorTitle: "Erro: A Minha Conta - Alterar Nome"
        },
        EN: {
            errorMessage: "An error occurred when changing user name",
            errorTitle: "Error: My Account - Change Name"
        }
    },
    ERROR_MYACCOUNT_CHANGEPASSWORD: {
        PT: {
            errorMessage: "Ocurreu um erro a alterar a password do utilizador",
            errorTitle: "Erro: A Minha Conta - Alterar Password"
        },
        EN: {
            errorMessage: "An error occurred when changing user password",
            errorTitle: "Error: My Account - Change Password"
        }
    }
}