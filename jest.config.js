module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    silent:true,
    collectCoverage:true,
}

/*
const getTrajectories = async (req: Request, res: Response) => {
    try {
        // Verificar qué se ingresa en req.params -----  taxiId = 6418, date = 02-02-2008
        // id, fecha ----- http://localhost:3001/trajectories?taxiId=6418&date=02-02-2008
        //http://localhost:3001/trajectories?taxiId=6418&date=02-03-2008&page=1&limit=5
        const { taxiId, date, page = '1', limit = '10' } = req.query;
        const taxiTrajectories = await getTrajectoriesService(
          taxiId as string,
          date as string,
          parseInt(page as string),
          parseInt(limit as string)
        );
        if (taxiTrajectories.length === 0) {
         return res.status(404).json({ error: 'No se encontraron resultados en la búsqueda' });
        }

        return res.status(200).json(taxiTrajectories);
      } catch (error) {
          console.error('Error de Conexión', error);
          return res.status(500).json({ error: 'Error de Conexión' });
        }
   };

   const getTrajectoriesService = async (taxiId?: string, date?: string, page: number = 1, limit: number = 10) => {
  const startIndex = (page - 1) * limit;

  const dateList = new Date(date as string);
  const starOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate()));
  const endOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate() + 1));

  if (!taxiId && !date) {
    throw new Error('Ingrese un valor correcto');
  }

  const whereCondition: any = {};
  if (taxiId) {
    whereCondition.taxi_id = parseInt(taxiId as string);
  }
  if (date) {
    whereCondition.date = { gte: starOfDay, lt: endOfDay };
  }

  const taxiTrajectories = await prisma.trajectories.findMany({
    where: whereCondition,
    select: {
      latitude: true,
      longitude: true,
      date: true,
    },
    skip: startIndex,
    take: limit,
  });

  return taxiTrajectories;
};


*/