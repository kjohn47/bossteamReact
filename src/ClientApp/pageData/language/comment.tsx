import { ICommentAddTranslations, ICommentTranslations } from '../../interfaces/common';

export const TEXT_COMMENT: ICommentTranslations = {
    PT: {
        ownerText: "Utilizador:",
        dateText: "Data:"
    },
    EN:{
        ownerText: "User:",
        dateText: "Date:"
    }
}

export const TEXT_COMMENT_ADD: ICommentAddTranslations = {
    PT:{
        submitBtnText: 'Enviar Comentário',
        invalidCommentText: 'Comentário Inválido'
    },
    EN:{
        submitBtnText: 'Send Comment',
        invalidCommentText: 'Invalid Comment'
    }
}