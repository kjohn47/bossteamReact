import { ICommentAddTranslations, ICommentTranslations } from '../../interfaces/common';
import { ptCode, enCode } from '../../settings';

export const TEXT_COMMENT_OBJECT: ICommentTranslations = {
    [ptCode]: {
        ownerText: "Utilizador:",
        dateText: "Data:"
    },
    [enCode]:{
        ownerText: "User:",
        dateText: "Date:"
    }
}

export const TEXT_COMMENT_ADD_OBJECT: ICommentAddTranslations = {
    [ptCode]:{
        submitBtnText: 'Enviar Comentário',
        invalidCommentText: 'Comentário Inválido'
    },
    [enCode]:{
        submitBtnText: 'Send Comment',
        invalidCommentText: 'Invalid Comment'
    }
}