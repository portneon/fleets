import { Router } from 'express';
import vehiclesRouter from './vehicles.js';
import driversRouter from './drivers.js';

const securedRouter = Router();

// Register all protected/secured route modules here
securedRouter.use('/vehicles', vehiclesRouter);
securedRouter.use('/drivers', driversRouter);

export default securedRouter;

