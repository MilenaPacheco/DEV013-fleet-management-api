import express, { Application, Request, Response } from 'express';
import router from './routes/index';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { title } from 'process';


const app: Application = express();
const PORT: number = 3001;
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fleet Management",
            version: "1.0.0"
        },
        servers: [
        {
            url: "http://localhost:3001", description: 'Local server'
        }
        ]
    },
    apis:  ['./src/swagger.ts']
}
          
app.set('json spaces', 2);
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/taxi-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use(router);
/*app.get("/taxi", async (req, res) => {
    const taxis = await prisma.taxis.findMany();
    res.status(200).json({"ok": 1, "lista": taxis});
});*/
//empezando el servidor condicionado al test
console.log('test', process.env.NODE_ENV)
if(process.env.NODE_ENV?.trim() !== 'test'){
    app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});

}
export default app;
