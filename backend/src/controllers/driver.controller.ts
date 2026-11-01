import type { Request, Response } from 'express';
import { driverService } from '../services/driver.service.js';
import type { DriverStatus, RegisterDriverDTO, UpdateDriverDTO, UpsertDriverDetailsDTO } from '../types/driver.js';

export class DriverController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, phone, licenseNumber, organisationId, deviceId } = req.body as Partial<RegisterDriverDTO>;

            if (!name || !email || !phone || !licenseNumber) {
                res.status(400).json({
                    error: 'Validation failed: name, email, phone, and licenseNumber are required',
                });
                return;
            }

            const driver = await driverService.register({
                name,
                email,
                phone,
                licenseNumber,
                organisationId,
                deviceId,
            });
            res.status(201).json({ data: driver });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to register driver';
            res.status(409).json({ error: message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const includeDetails = req.query.includeDetails === 'true';
            const driver = await driverService.getById(id, includeDetails);
            if (!driver) {
                res.status(404).json({ error: `Driver with id '${id}' not found` });
                return;
            }
            res.json({ data: driver });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const status = req.query.status as DriverStatus | undefined;
            const includeDetails = req.query.includeDetails === 'true';
            const drivers = await driverService.list({ status, includeDetails });
            res.json({ data: drivers, total: drivers.length });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const updatePayload: UpdateDriverDTO = req.body;
            const updated = await driverService.update(id, updatePayload);

            if (!updated) {
                res.status(404).json({ error: `Driver with id '${id}' not found` });
                return;
            }

            res.json({ data: updated });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const deleted = await driverService.delete(id);
            if (!deleted) {
                res.status(404).json({ error: `Driver with id '${id}' not found` });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getDetails(req: Request, res: Response): Promise<void> {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const details = await driverService.getDetails(id);
            if (!details) {
                res.status(404).json({ error: `Onboarding details for driver '${id}' not found` });
                return;
            }
            res.json({ data: details });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async saveDetails(req: Request, res: Response): Promise<void> {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const payload: UpsertDriverDetailsDTO = req.body;
            const details = await driverService.saveOnboardingDetails(id, payload);
            res.json({ data: details });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to save onboarding details';
            res.status(400).json({ error: message });
        }
    }
}

export const driverController = new DriverController();
