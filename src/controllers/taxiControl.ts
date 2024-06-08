import { Request, Response } from 'express';
import { getTaxisService, getTaxiService, createTaxiService, updateTaxiService, deleteTaxiService, NotFoundError, DatabaseError } from '../services/taxiService';
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

const updateTaxi = async (req: Request, res: Response) => {
  //actualizar taxi para 
  const { id } = req.params; // Obtener id desde los parámetros de la ruta
  const newData = req.body;

  try {
    // Verificar que se ingrese alg//un valor ID en la url
    if (!id) {
      return res.status(400).json({ error: 'Ingrese ID o placa del taxi a actualizar' });
    }
    //verificar contenido del body
    if(!Object.keys(newData).length){
      return res.status(400).json({ error: 'Ingrese algún valor a actualizar' });
    }
    //verificar contenido de la forma correcta del ID o placa
    let numericId = parseInt(id);
    if (isNaN(numericId) && !id.match(/^[A-Z]{4}-\d{4}$/)) {
      return res.status(400).json({ error: 'ID o placa inválidos' });
    }
    // Verificar contenido de la forma correcta del body
    // El id debe ser completamente numérico y la placa debe tener la estructura correcta
    if ((newData.id && !/^\d+$/.test(newData.id)) || (newData.plate && !/^[A-Z]{4}-\d{4}$/.test(newData.plate))) {
      return res.status(400).json({ error: 'Ingrese ID y placa válidos para actualizar' });
    }
    const updatedTaxi = await updateTaxiService(id, newData);
    return res.status(200).json(updatedTaxi);
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

const deleteTaxi = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtener id desde los parámetros de la ruta
  try {
    if(!id){
      return res.status(400).json({ error: 'Ingrese ID o placa del taxi que desea eliminar ' });
    }
    //verificar contenido de la forma correcta del ID o placa
    if (!/^\d+$/.test(id) && !/^[A-Z]{4}-\d{4}$/.test(id)) {
      return res.status(400).json({ error: 'ID o placa inválidos' });
    }
    const deletedTaxi = deleteTaxiService(id);
    return res.status(200).json({message: 'El Taxi se ha eliminado exitosamente', taxi: deletedTaxi})
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
}


// id, fecha ----- http://localhost:3001/trajectories?taxiId=6418&date=02-02-2008
export default { getTaxis, getTaxi, createTaxi, updateTaxi, deleteTaxi}       