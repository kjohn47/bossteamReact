import {IpresentationServer} from '../../interfaces/home';
import {Iimage} from '../../interfaces/common';

export const mockPresentationFromServer: IpresentationServer = 
{
    PT: {
        description: "Aqui é para quem se destina a página.",
        introduction: "Isto é a página de introdução da bossteam, alguma info sobre a página aqui.",
        title: "BossTeam"
    },
    EN: {
        description: "This is for who this page is.",
        introduction: "This is bossteam intro page, some info of the page here.",
        title: "BossTeam"
    }
};

export const mockHomeImage: Iimage = 
{
    src: "/images/480x360.png",
    alt: "HomeImg"    
};