import express, { type Application } from 'express';
import publicRoutes from './routes/index.js';
import securedRoutes from './routes/secured.js';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());

        this.app.use('/', publicRoutes);
        this.app.use('/api', securedRoutes);
    }

    start(port = Number(process.env.PORT) || 3000): void {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}

const server = new Server();
server.start();

export default Server;
