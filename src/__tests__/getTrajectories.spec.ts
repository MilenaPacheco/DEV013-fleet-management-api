import request from "supertest";
import app from "../index";

describe('GET Trajectories Endpoint', () => {
    it('should return status 200 and trajectories data if valid parameters provided', async () => {
        const trueQuery = {
            taxiId: '6418',
            date: '2008-02-02',
            page: '1',
            limit: '5'
        };
        const response = await request(app)
            .get('/trajectories')
            .query(trueQuery);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body).toHaveLength(5); 

    });

    it('should return status 404 if no trajectories found', async () => {
        const fakeQuery = {
            taxiId: '0000',
            date: '01-01-1900', 
            page: '1',
            limit: '5'
        };
        const response = await request(app)
            .get('/trajectories')
            .query(fakeQuery);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'No se encontraron resultados en la búsqueda' });
    });

});

describe('GET Last All Trajectories Endpoint--/trajectories/last', () => {
    it('should return status 200 and trajectories data if valid parameters provided', async () => {
        const trueQuery = {
            page: '1',
            limit: '2'
        };
        const response = await request(app)
            .get('/trajectories/last')
            .query(trueQuery);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body).toHaveLength(2);

    });
    /*it('should return status 404 if no trajectories are found for the given page', async () => {
        const falseQuery = {
          page: '2',
          limit: '2'
        };
        const response = await request(app)
          .get('/trajectories/last')
          .query(falseQuery);
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'No se encontraron resultados en la búsqueda' });
      });*/

    it('should return status 400 if invalid parameters are provided', async () => {
    const invalidQuery = {
        page: 'invalid',
        limit: 'invalid'
    };
    const response = await request(app)
        .get('/trajectories/last')
        .query(invalidQuery);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Parámetros de paginación inválidos' });
    });
});