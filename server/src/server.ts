import express from "express";
import { PrismaClient } from '@prisma/client';
import { convertHourToMinutes } from "./utils/hora-to-minutes";
import cors from 'cors'
import { convertMinutesToHour } from "./utils/minutes-to-hour";


const app = express();

app.use(express.json());

app.use(cors())
const prisma = new PrismaClient();


app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })
    //console.table(games);
    return response.json(games);
})  

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body = request.body;


    const ad = await prisma.ad.create({
        data: {
            gameId,          
            name: body.name,           
            yearsPlaying: body.yearsPlaying,    
            discord: body.discord,        
            weekDays: body.weekDays.join(','),
            hourStart: convertHourToMinutes(body.hourStart),       
            hourEnd: convertHourToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad)
});


app.get("/games/:id/ads", async (request, response) => {

    const gameId = request.params.id;


    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourEnd: true,
            hourStart: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }

    })
    return response.send(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHour(ad.hourStart),
            hourEnd: convertMinutesToHour(ad.hourEnd)
        }
    }));

    
})


app.get("/ads/:id/discord", async (request, response) => {

    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord,
    });


    
})

app.listen(3333);

