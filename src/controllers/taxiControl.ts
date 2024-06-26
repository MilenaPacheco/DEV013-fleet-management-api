import { Request, Response } from 'express';
import { getTaxisService, getTaxiService, createTaxiService, updateTaxiService, NotFoundError, DatabaseError } from '../services/taxiService';
import { error } from 'console';


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

const createTaxi = async (req: Request, res: Response) => {
  //http://localhost:3001/taxis
  const {id, plate} = req.body;
  try {
    //verificar que se ingresen los datos necesarios id y plate
    if(!id || !plate){
      return res.status(404).json({ error: 'Ingrese los datos requeridos'});
    }
    //Ingrso de datos correctos
    if(isNaN(id)){
      return res.status(400).json({ error: 'ID inválido' });
    }
    const newTaxi = await createTaxiService(parseInt(id), plate);
    return res.status(200).json(newTaxi)
  } catch (error) {
    if(error instanceof DatabaseError){
      return res.status(500).json({ error: error.message });
    }else{
      return res.status(500).json({ error: 'Error de Conexión' });
    }
  }
};

export const updateTaxi = async (req: Request, res: Response) => {
  const taxi = req.params;
  const newData = req.body;
  console.log('taxi', taxi)
  //http://localhost:3001/taxis?id=123
  try {
    // Verificar que se ingresen los datos necesarios
    if (!taxi) {
      return res.status(400).json({ error: 'Ingrese ID o placa' });
    }
    // Verificar que id sea un número
    /*const numericId = parseInt(id as string);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }*/
    const updatedTaxi = await updateTaxiService(taxi, newData);
    return res.status(200).json(updatedTaxi);
  } catch (error) {
    if (error instanceof DatabaseError) {
      return res.status(500).json({ error: error.message });
    } else {
      console.error('Error inesperado:', error);
      return res.status(500).json({ error: 'Error de Conexión' });
    }
  }
};


// id, fecha ----- http://localhost:3001/trajectories?taxiId=6418&date=02-02-2008
export default { getTaxis, getTaxi, createTaxi, updateTaxi}       