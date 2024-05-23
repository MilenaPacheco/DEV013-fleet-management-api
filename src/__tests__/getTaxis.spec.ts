import request from "supertest";
import app from "../index";

/*describe ('GET Taxis', () => {
    it('It should return 200', async() =>{
        const res = await request(app).get('/taxis').query({taxi_id:6418});
        expect(res.status).toBe(200)
    });
})*/

describe('GET Taxis Endpoint', () => {
    it('should return status 200 and taxis data', async () => {
        const response = await request(app)
            .get('/taxis')
            .query({ page: 1, limit: 5 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body).toHaveLength(5); 
    });

    it('should return status 404 if no taxis found', async () => {
        const response = await request(app)
            .get('/taxis')
            .query({ page: 999, limit: 10 });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'No se encontraron taxis en la base de datos' });
    });

    it('should handle invalid parameters', async () => {
        const response = await request(app)
            .get('/taxis')
            .query({ page: 'abc', limit: 'de' });

        expect(response.status).toBe(400); 
        expect(response.body).toEqual({ error: 'Parámetros de paginación inválidos' });
    });
});

describe('GET Taxi Endpoint', () => {
    it('should return status 200 and taxi data if valid ID provided', async () => {
        const taxiId = '6418';
        const response = await request(app).get(`/taxis/${taxiId}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined(); 

    });

    it('should return status 404 if invalid ID provided', async () => {
        const taxiId = '0000';
        const response = await request(app).get(`/taxis/${taxiId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'No se encontró ningún taxi con los datos proporcionados' });
    });
    //pendiente para proporcionar endpoint en ausencia 
    /*
    it('should return status 400 if no ID provided', async () => {
        const response = await request(app).get('/taxis/');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Se requiere proporcionar un ID o placa válida' });
    });*/

});

