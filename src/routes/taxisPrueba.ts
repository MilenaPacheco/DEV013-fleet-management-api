import express from 'express';
import getTaxi from '../controllers/taxiControl'
//import router from 'express';

const router = express.Router();
router.get('/taxi', getTaxi.getTaxi)

export default router;
/*
import express from 'express';
import { Request, Response } from 'express';
import getTaxi from './taxisPrueba'

const router = express.Router();

router.get('/taxi', (req: Request, res: Response) => {
    res.json({"saludo": "Hola"})
});

export default router;
*/