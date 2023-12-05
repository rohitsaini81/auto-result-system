import mongoose from 'mongoose';
import Book from '../models/db.js'
import dotenv from 'dotenv';
import express from 'express';
import { DL_Satta, DL_bazar, Disawar, Faridabad, Gajiyabad, Gali, Shree_Ganesh, del } from '../circle.js';
import { calledgamesobj, setdate, timeString } from '../circle.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router()



router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
// }
router.get('/api/6', async (req, res) => {
    const date = "12" + setdate[2] + (setdate[3] < 10 ? "0" + setdate[3] : setdate[3]) + "/2023"
    try {
        const pro = await Book.find({ "date": setdate });
        res.status(200).send(pro)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.get('/api/7', async (req, res) => {
    try {
        const pro = await Book.find();
        res.status(200).send(pro)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.get('/api/8', async (req, res) => {
    res.sendFile(__dirname + '/domcdn.js')
})
router.get('/api/9', async (req, res) => {
    res.sendFile(__dirname + '/Tokyo.mp4')
})
router.get('/inf', (req, res) => {
    const date = "12" + setdate[2] + (setdate[3] < 10 ? "0" + setdate[3] : setdate[3]) + "/2023"
    res.send(timeString + date + "\n" + calledgamesobj)
})


router.get('/custom/:game', async (req, res) => {

    switch (req.params.game) {
        case 'dls':
            const dl = await DL_Satta()
            console.log(dl)
            res.send(dl)
            break;
        case 'db':
            const db = await DL_bazar()
            console.log(db)
            res.send(db)
            break;
        case 'sg':
            const sg = await Shree_Ganesh()
            console.log(sg)
            res.send(sg)
            break;
        case 'fd':
            const fd = await Faridabad()
            console.log(fd)
            res.send(fd)
            break;
        case 'gb':
            const gb = await Gajiyabad()
            console.log(gb)
            res.send(gb)
            break;
        case 'gl':
            const gl = await Gali()
            console.log(gl)
            res.send(gl)
            break;
        case 'ds':
            const ds = await Disawar()
            console.log(ds)
            res.send(ds)


    }
})

router.get('/del/:id', async (req, res) => {

    const data = await del({ '_id': req.params.id })
    res.send(data)
})



export default router