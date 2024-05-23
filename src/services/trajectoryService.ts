import prisma from '../db';
class NotFoundError extends Error {};
class DatabaseError extends Error {};

//LLENAR LOS FORMULARIOS 2 

const getTrajectoriesService = async (taxiId: string, date: string, page: number = 1, limit: number = 10) => {
  try {
    const startIndex = (page - 1) * limit;

    const dateList = new Date(date);
    const startOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate()));
    const endOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate() + 1));

    const whereCondition: any = {};
    whereCondition.taxi_id = parseInt(taxiId);
    whereCondition.date = { gte: startOfDay, lt: endOfDay };

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

    if (taxiTrajectories.length === 0) {
      throw new NotFoundError('No se encontraron resultados en la búsqueda');
    }
    return taxiTrajectories;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new DatabaseError('Error al acceder a la base de datos');
    }
  }
};
   
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''OPCIONAL'''''''''''''''''''''''''''''''''''''''''''''''''''''''
const getLastTrajectoryService = async (id: string) => {
  try {
    const plateRegex = /^[A-Z]{4}-\d{4}$/;
    let taxi_id: number | null = null;

    if (plateRegex.test(id)) {
      // Buscar el taxi_id basado en la placa
      const taxi = await prisma.taxis.findFirst({
        where: { plate: id },
        select: { id: true }
      });

      if (!taxi) {
        throw new NotFoundError('No se encontró ningún taxi con la placa proporcionada');
      }

      taxi_id = taxi.id;
    } else {
      taxi_id = parseInt(id);
      if (isNaN(taxi_id)) {
        throw new NotFoundError('Placa de taxi no válida');
      }
    }

    console.log('taxi_id', taxi_id);

    const lastTrajectory = await prisma.trajectories.findFirst({
      where: { taxi_id: taxi_id },
      orderBy: { date: 'desc' },
    });

    if (!lastTrajectory) {
      throw new NotFoundError('No se encontraron resultados en la búsqueda');
    }

    return lastTrajectory;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new DatabaseError('Error al acceder a la base de datos');
    }
  }
};

const getLastTrajectoriesService = async (page: number = 1, limit: number = 10) => {
  try {
    const offset = (page - 1) * limit;
    // Obtener todos los taxi_id únicos de la tabla trajectories
    const taxiIds = await prisma.trajectories.findMany({
      select: {
        taxi_id: true,
      },
      distinct: ['taxi_id'],
      skip: offset,
      take: limit,
    });
    //console.log('ARRAY TAXI IDS', taxiIds);
    //console.log('ARRAY TAXI IDS', taxiIds[0]);

    if (taxiIds.length === 0) {
      throw new NotFoundError('No se encontraron taxis en la base de datos');
    }
    const lastTrajectories = [];

    // Para cada taxi_id, obtener la última trayectoria
    for (const { taxi_id } of taxiIds) {
      const lastTrajectory = await prisma.trajectories.findFirst({
        where: { taxi_id },
        orderBy: { date: 'desc' },
        select: {
          taxi_id: true,
          latitude: true,
          longitude: true,
          date: true,
        },
      });
      //console.log('FOR ITEM #', lastTrajectory);
      if (lastTrajectory) {
        lastTrajectories.push(lastTrajectory);
      }
    }

    if (lastTrajectories.length === 0) {
      throw new NotFoundError('No se encontraron resultados en la búsqueda');
    }

    return lastTrajectories;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new DatabaseError('Error al acceder a la base de datos');
    }
  }
};


export { getTrajectoriesService, getLastTrajectoryService, getLastTrajectoriesService, NotFoundError, DatabaseError};