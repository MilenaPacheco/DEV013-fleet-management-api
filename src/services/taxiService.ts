import prisma from '../db';
class NotFoundError extends Error {};
class DatabaseError extends Error {};

const getTaxisService = async (page: number, limit: number) => {
  //Manejo de errores con subclases personalizando con la clase Error, no es necesario colocar el constructor en este caso, desde su asignación se le agrega un nombre
  //para el manejo de errores utilizar la estructura try/catch 
  const offset = (page - 1) * limit;
  try{
    const taxis = await prisma.taxis.findMany({ take: limit, skip: offset });
    if(taxis.length === 0){
      throw new NotFoundError('No se encontraron taxis en la base de datos');
    };
    return taxis;
  }catch (error){
    if (error instanceof NotFoundError){
      throw error;
    } else{
      throw new DatabaseError('Error al acceder a la base de datos');
    }
  }
};
//'''''''''''''''''''''''''''''''''''''''''''''''''''''''OPCIONAL'''''''''''''''''''''''''''''''''''''''''''''''''''''''
const getTaxiService = async (id: string) => {
  try {
    const plateRegex = /^[A-Z]{4}-\d{4}$/;
    const whereCondition: any = {};
    if (plateRegex.test(id)) {
      whereCondition.plate = id;
    } else {
      whereCondition.id = parseInt(id);
    }
    const taxi = await prisma.taxis.findFirst({ where: whereCondition });
    if (!taxi) {
      throw new NotFoundError('No se encontró ningún taxi con los datos proporcionados');
    }
    return taxi;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new DatabaseError('Error al acceder a la base de datos');
    }
  }
};
  
export { getTaxisService, getTaxiService, NotFoundError, DatabaseError  };