import {INewsData, IViewNewsDataServer} from '../../interfaces/news';


export const mockNewsFromServer: INewsData[] = [
    {
        date: new Date('1990-01-10T00:00:00Z'),
        outlineColor : "info",
        id: 1,
        imgLink: "/images/318x180.png",
        PT: {            
            title: "Cartão teste 1",
            description: "Isto é um teste de ojecto de dados cartão"
        },
        EN: {
            title: "Card Test 1",
            description: "This is a test of card data object"

        }
    },
    {
        date: new Date('1990-01-10T00:00:00Z'),
        outlineColor : "info",
        id: 2,
        imgLink: "/images/318x180.png",
        PT: {            
            title: "Cartão teste 2",
            description: "Isto é um teste de ojecto de dados cartão"
        },
        EN: {
            title: "Card Test 2",
            description: "This is a test of card data object"

        }
    },
    {
        date: new Date('1990-01-10T00:00:00Z'),
        outlineColor : "info",
        id: 3,
        imgLink: "/images/318x180.png",
        PT: {            
            title: "Cartão teste 3",
            description: "Isto é um teste de ojecto de dados cartão"
        },
        EN: {
            title: "Card Test 3",
            description: "This is a test of card data object"

        }
    },
    {
        date: new Date('1990-01-10T00:00:00Z'),
        outlineColor : "info",
        id: 4,
        imgLink: "/images/318x180.png",
        PT: {            
            title: "Cartão teste 4",
            description: "Isto é um teste de ojecto de dados cartão"
        }
    }
];

export const mockNewsDataServer : IViewNewsDataServer[] = [
    {
        id: 1,
        date: new Date('1990-01-10T00:00:00Z'),
        imgLink: '/images/480x360.png',
        allowComments: true,
        PT: {
            title: "OLA 1",
            description: "Noticia de teste 1",
            content: "Blablabla teste 1 2 3 4 5 6 blaaa"
        },
        EN: {
            title: "Hello 1",
            description: "Test News 1",
            content: "Blablabla test 1 2 3 4 5 6 blaaa"
        },
        comments: [
            {
                Comment: "Comment 1",
                ID: 1,
                Owner: "Me",                
                Time: new Date('1990-01-10T00:00:00Z')
            },
            {
                Comment: "Comment 2",
                ID: 2,
                Owner: "Me",                
                Time: new Date('1990-01-19T00:10:00Z')
            }
        ]
    },
    {
        id: 2,
        date: new Date('1990-01-10T00:00:00Z'),
        imgLink: '/images/480x360.png',
        allowComments: false,
        PT: {
            title: "OLA 2",
            description: "Noticia de teste 2",
            content: "Blablabla teste 1 2 3 4 5 6 blaaa"
        },
        EN: {
            title: "Hello 2",
            description: "Test News 2",
            content: "Blablabla test 1 2 3 4 5 6 blaaa"
        }
    },
    {
        id: 3,
        date: new Date('1990-01-10T00:00:00Z'),
        imgLink: '/images/480x360.png',
        allowComments: true,
        PT: {
            title: "OLA 3",
            description: "Noticia de teste 3",
            content: "Blablabla teste 1 2 3 4 5 6 blaaa"
        },
        EN: {
            title: "Hello 3",
            description: "Test News 3",
            content: "Blablabla test 1 2 3 4 5 6 blaaa"
        }
    },
    {
        id: 4,
        date: new Date('1990-01-10T00:00:00Z'),
        imgLink: '/images/480x360.png',
        allowComments: false,
        PT: {
            title: "OLA 4",
            description: "Noticia de teste 4",
            content: "Blablabla teste 1 2 3 4 5 6 blaaa"
        },
}];