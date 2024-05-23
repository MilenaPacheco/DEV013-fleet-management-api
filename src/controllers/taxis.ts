import express from 'express';
import { Request, Response } from 'express';
import prisma from '../db';

const router = express.Router();

router.get('/taxi', async (req: Request, res: Response) => {
    try {
        const { _page = 1, _limit = 10 } = req.query;
        const page = parseInt(_page as string, 10);
        const limit = parseInt(_limit as string, 10);
        const startIndex = (page - 1) * limit;

        const allTaxis = await prisma.taxis.findMany({take: limit, skip: startIndex});
        if (allTaxis.length === 0) {
            return res.status(404).json({ error: 'No se encontraron taxis' });
        }
        const mappedTaxis = allTaxis.map((taxi) => ({
            id: taxi.id,
            plate: taxi.plate,
        }));
        return res.status(200).json(mappedTaxis); 
    } catch (error) {
        console.error('Error de Conexión')
        res.status(500).json({ error:  'Error de Conexión'})
    }
})

export default router;