import express from 'express';
import taxis from '../controllers/taxiControl'
import trajectories from '../controllers/trajectoriesControl'

//import router from 'express';
//Incremetar tests 
//librerias de json excel

const router = express.Router();
router.get('/taxis', taxis.getTaxis);
router.get('/trajectories', trajectories.getTrajectories);
router.get('/trajectories/last', trajectories.getLastTrajectories);
//Ideas para completar el CRUD
router.post('/taxis', taxis.createTaxi);
router.put('/taxis/:id', taxis.updateTaxi);
router.delete('/taxis/:id', taxis.deleteTaxi);


//opcional GET por placa o id
//router.get('/trajectories/last/taxi', trajectories.getLastTrajectory);
router.get('/trajectories/last/:id', trajectories.getLastTrajectory);
router.get('/taxis/:id?', taxis.getTaxi);

export default router;

//e2e Supertest`
//preguntar como hacer para que la ausencia del parametro id ingrese a la url y lance el error 400