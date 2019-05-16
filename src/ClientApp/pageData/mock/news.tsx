import {INewsData, IViewNewsDataServer} from '../../interfaces/news';


export const mockNewsFromServer: INewsData[] = [
    {
        title: "Cartão teste 1",
        titleEN: "Card Test 1",
        date: new Date('1990-01-10T00:00:00Z'),
        description: "Isto é um teste de ojecto de dados cartão",
        descriptionEN: "This is a test of card data object",
        outlineColor : "info",
        id: 1,
        imgLink: "/images/318x180.png"
    },
    {
        title: "Cartão teste 2",
        titleEN: "Card Test 2",
        date: new Date('1990-01-10T00:00:00Z'),
        description: "Isto é um teste de ojecto de dados cartão",
        descriptionEN: "This is a test of card data object",
        outlineColor : "info",
        id: 2,
        imgLink: "/images/318x180.png"
    },
    {
        title: "Cartão teste 3",
        titleEN: "Card Test 3",
        date: new Date('1990-01-10T00:00:00Z'),
        description: "Isto é um teste de ojecto de dados cartão",
        descriptionEN: "This is a test of card data object",
        outlineColor : "info",
        id: 3,
        imgLink: "/images/318x180.png"
    },
    {
        title: "Cartão teste 4",
        titleEN: "Card Test 4",
        date: new Date('1990-01-10T00:00:00Z'),
        description: "Isto é um teste de ojecto de dados cartão",
        descriptionEN: "This is a test of card data object",
        outlineColor : "info",
        id: 4,
        imgLink: "/images/318x180.png"
    }
];

export const mockNewsDataServer : IViewNewsDataServer[] = [
    {
        id: 1,
        title: 'OLA 1',     
        titleEN: 'Hello 1',           
        description: 'Noticia de teste 1',                
        descriptionEN: 'Test News 1',
        content: 'Blablabla teste 1 2 3 4 5 6 blaaa',
        contentEN: 'Blablabla test 1 2 3 4 5 6 blaaa',
        date: new Date('1990-01-10T00:00:00Z'),
        imgLink: '/images/480x360.png',
        allowComments: true,
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
        title: 'OLA 2',     
        titleEN: 'Hello 2',           
        description: 'Noticia de teste 2',                
        descriptionEN: 'Test News 2',
        content: 'Blablabla teste 1 2 3 4 5 6 blaaa',
        contentEN: 'Blablabla test 1 2 3 4 5 6 blaaa',
        date: new Date('1990-01-10T00:00:00Z'),
        imgLink: '/images/480x360.png',
        allowComments: false
    },
    {
        id: 3,
        title: 'OLA 3',     
        titleEN: 'Hello 3',           
        description: 'Noticia de teste 3',                
        descriptionEN: 'Test News 3',
        content: 'Blablabla teste 1 2 3 4 5 6 blaaa',
        contentEN: 'Blablabla test 1 2 3 4 5 6 blaaa',
        date: new Date('1990-01-10T00:00:00Z'),
        imgLink: '/images/480x360.png',
        allowComments: true
    },
    {
        id: 4,
        title: 'OLA 4',     
        titleEN: 'Hello 4',           
        description: 'Noticia de teste 4',                
        descriptionEN: 'Test News 4',
        content: 'Blablabla teste 1 2 3 4 5 6 blaaa',
        contentEN: 'Blablabla test 1 2 3 4 5 6 blaaa',
        date: new Date('1990-01-10T00:00:00Z'),
        imgLink: '/images/480x360.png',
        allowComments: false
}];