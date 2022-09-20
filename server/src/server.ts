import express  from "express";
import cors from 'cors'

import { PrismaClient } from "@prisma/client";
import { convertHourToMinute } from "./utils/convert-hours-to-minutes";
import { convertMinutesToHoursStrings } from "./utils/convert-minutes-to-hours-strings";


const app = express();
app.use(cors()); ///qualquer front end tem acesso ao back



///apenas front end desse dominio teria acesso ao back
// app.use(cors({
//     origin: "http://rocketseat.com.br"
// }))

app.use(express.json()); //para o express entender json

const prisma = new PrismaClient({
    log: ['query']
}); //prisma client é a conexão com o db

app.get('/games', async (req, res) =>{

    const games = await prisma.game.findMany({
        include: {  ///criar um novo campo no db e pega la do prisma studio as info
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })
   

    return res.json(games)
});

app.post('/games/:id/ads', async(req, res) => {

    const gameId = req.params.id; //pega o gameId enviados atraves do servidor
    const body: any = req.body; //pega os dados do body enviados atraves do servidor

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourToMinute(body.hourStart),
            hourEnd: convertHourToMinute(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        },
    })
    
    return res.status(201).json(ad);
});


app.get('/games/:id/ads', async (req, res) =>{

    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        select: { ///seleciona campos que vai aparecer no db
            id: true,
            name: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
            yearsPlaying: true,
        },
        where: { //seleciona o banco pelo id
            gameId,
        },
        orderBy: { ///ordena de acordo com a data de criação do anuncio
            createdAt: "desc"
        }
    })
    ///percorre o array de dados e retorna em colunas os weekDays

    return res.json(ads.map(ad => {
        return { 
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHoursStrings(ad.hourStart),
            hourEnd: convertMinutesToHoursStrings(ad.hourEnd),
            
        }
    }))
})

app.get('/ads/:id/discord', async (req, res) =>{

    const adId = req.params.id;

    //tentar achar o id se nao achar ele dar erro
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId,
        }
    })

        return res.json({
            discord: ad.discord,
        })
})

app.listen('3333')