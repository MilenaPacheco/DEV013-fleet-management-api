import { error } from 'console';
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

const createTaxiService = async (id: number, plate: string) => {
  try {
    const taxi = await prisma.taxis.create({
      data: {
          id,
          plate
        },
    });
    return taxi
  } catch (error) {
    throw new DatabaseError('Error al acceder a la base de datos');
  }
};


const updateTaxiService = async (identifier: string, newData: any) => {
  try {
    // Parsear el identifier en caso de que sea número y asignar el criterio de búsqueda
    let whereCondition: any = {};
    if (!isNaN(parseInt(identifier))) { 
      whereCondition.id = parseInt(identifier);
    } else {
      whereCondition.plate = identifier;
    }
    // Parsear el id dentro de newData si existe y es un número
    newData.id = parseInt(newData.id)
    // Realizar verificación y actualización en una sola transacción
    const updatedTaxi = await prisma.$transaction(async (prisma) => {
      const existingTaxi = await prisma.taxis.findUnique({
        where: whereCondition
      });
      const existingId = await prisma.taxis.findUnique({
        where: {id: newData.id}
      })
      if (!existingTaxi) {
        throw new NotFoundError('Taxi no encontrado');
      }
      if(existingId){
        throw new NotFoundError('ID ya existe');
      }
      return prisma.taxis.update({
        where: whereCondition,
        data: newData 
      });
    });
    //console.log('updateTaxi', updatedTaxi);
    return updatedTaxi;
  } catch (error) {
    console.error('Error al actualizar el taxi:', error);
    if (error instanceof NotFoundError) {
      throw error;
    } else {
      throw new DatabaseError('Error al acceder a la base de datos');
    }
  }
};


const deleteTaxiService = async (id: string) => {
  try {
    //verificar si el id es un ID o una placa
    let whereCondition: any = {};
    if(/^\d+$/.test(id)){
      whereCondition.id = parseInt(id);
    } else{
      whereCondition.plate = id;
    }
    const deletedTaxi = await prisma.$transaction(async (prisma) => {
      const existingTaxi =await prisma.taxis.findUnique({
        where: whereCondition
      })
      if(!existingTaxi){
        throw new NotFoundError('El Taxi no existe');
      }
      return prisma.taxis.delete({
        where: whereCondition,
      })
    })
    return deletedTaxi
  } catch (error) {
    if(error instanceof NotFoundError){
      throw error;
    } else{
      throw new DatabaseError('Error al acceder a la base de datos');
    }
  }
};
  
export { getTaxisService, getTaxiService, createTaxiService, updateTaxiService, deleteTaxiService, NotFoundError, DatabaseError  };