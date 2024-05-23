import { Request, Response } from 'express';
import { getTaxisService, getTaxiService, NotFoundError, DatabaseError } from '../services/taxiService';


/*getTaxisService:          
Intenta obtener una lista de taxis de la base de datos.
Lanza un NotFoundError si no se encuentran taxis.
Lanza un DatabaseError si ocurre cualquier otro error durante la consulta a la base de datos.

getTaxisService:
Intenta obtener un taxi específico de la base de datos utilizando un ID o una placa.
Lanza un NotFoundError si no se encuentra el taxi.
Lanza un DatabaseError si ocurre cualquier otro error durante la consulta a la base de datos*/

//considerar los nombres
const getTaxis = async (req: Request, res: Response) => {
    try {
        //http://localhost:3001/taxis?_page=1&_limit=5
        //No olvidar ingresar a la clase
        //console.log('HOLA')
        const { page = '1', limit = '10' } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
    
        if (isNaN(pageNum) || isNaN(limitNum)) {
          return res.status(400).json({ error: 'Parámetros de paginación inválidos' });
        }
        const allTaxis = await getTaxisService(pageNum, limitNum);
        return res.status(200).json(allTaxis); 
        } catch (error) {
            if(error instanceof NotFoundError){
                return res.status(404).json({ error: error.message });
            } else if (error instanceof DatabaseError){
                return res.status(500).json({ error: error.message });
            } else {
              console.error('Error inesperado:', error);
              return res.status(500).json({ error: 'Error de Conexión' });
          }
        }
};
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''OPCIONAL'''''''''''''''''''''''''''''''''''''''''''''''''''''''
const getTaxi = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //http://localhost:3001/taxis/6418
    //http://localhost:3001/taxis/FHEE-8646

    // Verificación de que el ID esté presente
    console.log('id', id)
    if (!id) {
      return res.status(400).json({ error: 'Se requiere proporcionar un ID o placa válida' });
    }

    const taxi = await getTaxiService(id);

    return res.status(200).json(taxi);
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

// id, fecha ----- http://localhost:3001/trajectories?taxiId=6418&date=02-02-2008
export default { getTaxis, getTaxi}       