import { Request, Response } from 'express';
import { getTrajectoriesService, getLastTrajectoryService, getLastTrajectoriesService, NotFoundError, DatabaseError} from '../services/trajectoryService';

const getTrajectories = async (req: Request, res: Response) => {
  try {
    // Verificar qué se ingresa en re
    // Verificar qué se ingresa en req.params -----  taxiId = 6418, date = 02-02-2008
    // id, fecha ----- http://localhost:3001/trajectories?taxiId=6418&date=02-02-2008
    //http://localhost:3001/trajectories?taxiId=6418&date=02-03-2008&page=1&limit=5
    const { taxiId, date, page = '1', limit = '10' } = req.query;

    // Verificación de que taxiId y date estén presentes
    if (!taxiId || !date) {
      return res.status(400).json({ error: 'Se requiere proporcionar un ID de taxi y una fecha válida' });
    }

    const taxiTrajectories = await getTrajectoriesService(
      taxiId as string,
      date as string,
      parseInt(page as string),
      parseInt(limit as string)
    );

    return res.status(200).json(taxiTrajectories);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      return res.status(500).json({ error: error.message });
    } else {
      console.error('Error inesperado:', error);
      return res.status(500).json({ error: 'Error de Conexión' });
    }
  }     
};

//'''''''''''''''''''''''''''''''''''''''''''''''''''''''OPCIONAL'''''''''''''''''''''''''''''''''''''''''''''''''''''''
const getLastTrajectory = async (req: Request, res: Response) => {
    //El endpoint responde para cada taxi la siguiente información: id, placa, latitud, longitud y timestamp (fecha y hora).
    //http://localhost:3001/trajectories/last/FHEE-8646
    //http://localhost:3001/trajectories/last/6418
    
    //ingreso con placa o taxiId, para esto vamos hacer el ingreso del query con un id en general
    try {
      const { id } = req.params;
  
      // Verificación de que el ID esté presente
      if (!id) {
        return res.status(400).json({ error: 'Proporcione un ID o placa de taxi' });
      }
  
      const lastTrajectory = await getLastTrajectoryService(id);
  
      return res.status(200).json(lastTrajectory);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
      } else if (error instanceof DatabaseError) {
        return res.status(500).json({ error: error.message });
      } else {
        console.error('Error inesperado:', error);
        return res.status(500).json({ error: 'Error de Conexión' });
      }   
    }
};


const getLastTrajectories = async (req: Request, res: Response) => {
  //http://localhost:3001/trajectories/last
  //http://localhost:3001/trajectories/last?page=1&limit=5
  try {
    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    if (isNaN(pageNum) || isNaN(limitNum)) {
      return res.status(400).json({ error: 'Parámetros de paginación inválidos' });
    }
    const lastTrajectories = await getLastTrajectoriesService(pageNum, limitNum);
    return res.status(200).json(lastTrajectories);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      return res.status(500).json({ error: error.message });
    } else {
      console.error('Error inesperado:', error);
      return res.status(500).json({ error: 'Error de Conexión' });
    }
  }
};
//paginación por cursor 
export default { getTrajectories, getLastTrajectory, getLastTrajectories }