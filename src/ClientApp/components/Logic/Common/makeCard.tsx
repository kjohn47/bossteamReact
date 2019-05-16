import {IcardMainData, ICardData} from '../../../interfaces/common';

function makeCard( items:IcardMainData[], link: string, buttonText: string)
{
    let cards: ICardData[] = [];
    items.forEach(element => {
        let card: ICardData = {
            title: element.title,
            description: element.description,
            date: element.date,
            imgLink: element.imgLink,
            buttonText: buttonText,
            outlineColor: element.outlineColor,
            buttonLink: link + '/' + element.id
        }
        cards.push(card);
    });
    return cards;
}

export default makeCard;