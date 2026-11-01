import { Router } from 'express';
import { driverController } from '../src/controllers/driver.controller.js';

const router = Router();

// Core Driver CRUD
router.post('/', (req, res) => driverController.register(req, res));
router.get('/', (req, res) => driverController.getAll(req, res));
router.get('/:id', (req, res) => driverController.getById(req, res));
router.put('/:id', (req, res) => driverController.update(req, res));
router.delete('/:id', (req, res) => driverController.delete(req, res));

// Driver Onboarding Details (Post-login onboarding)
router.get('/:id/details', (req, res) => driverController.getDetails(req, res));
router.put('/:id/details', (req, res) => driverController.saveDetails(req, res));

export default router;
