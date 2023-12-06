import Book from '../models/db.js'
import express from 'express';
import { DL_Satta, DL_bazar, Disawar, Faridabad, Gajiyabad, Gali, Shree_Ganesh, del } from '../circle.js';
import { calledgamesobj, setdate, timeString } from '../circle.js';
import { mytiime } from '../servertime.js';

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
router.get('/api/files', (req, res) => {
    const videos = [
      { name: 'video1', url: '/files/video1.mp4' },
      { name: 'video2', url: '/files/video2.mp4' },
      { name: 'video3', url: '/files/Tokyo.mp4' },
      { name: 'JS CDN', url: '/files/domcdn.js' },
      { name: 'Html file1', url: '/files/index.html' },
      { name: 'Html file2', url: '/files/main.html' },
    ];
  
    res.json(videos);
  });
router.get('/inf', (req, res) => {
    const m = mytiime()
    const obj = {
        'runningTime':setdate,
        'called':calledgamesobj,
        'timestring':timeString
    }
    router.get('/reset', async (req, res) => {l
        calledgamesobj.map(e =>  e = false )
        res.sendFile(calledgamesobj)
    })
    const aray = [{m},{obj}]
    res.send(aray)
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