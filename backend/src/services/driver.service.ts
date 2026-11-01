import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma.js';
import type {
    Driver,
    DriverDetails,
    DriverStatus,
    RegisterDriverDTO,
    UpdateDriverDTO,
    UpsertDriverDetailsDTO,
} from '../types/driver.js';

export class DriverService {
    /**
     * Register a new driver in PostgreSQL via Prisma.
     * Can be called internally (jobs, seeds, other services) or externally (HTTP controller).
     */
    async register(data: RegisterDriverDTO): Promise<Driver> {
        try {
            return await prisma.driver.create({
                data: {
                    name: data.name.trim(),
                    email: data.email.toLowerCase().trim(),
                    phone: data.phone.trim(),
                    licenseNumber: data.licenseNumber.toUpperCase().trim(),
                    status: 'active',
                    profileStatus: 'PENDING',
                    organisationId: data.organisationId,
                    deviceId: data.deviceId,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                const target = (error.meta?.target as string[])?.join(', ') || 'field';
                throw new Error(`A driver with this ${target} already exists.`);
            }
            throw error;
        }
    }

    /**
     * Get a driver by ID, optionally including their onboarding details and organisation.
     */
    async getById(id: string, includeDetails = true) {
        return prisma.driver.findUnique({
            where: { id },
            include: {
                details: includeDetails,
                organisation: true,
            },
        });
    }

    /**
     * List all drivers with optional status filtering.
     */
    async list(filters?: { status?: DriverStatus; includeDetails?: boolean }) {
        return prisma.driver.findMany({
            where: filters?.status ? { status: filters.status } : undefined,
            include: {
                details: filters?.includeDetails ?? false,
                organisation: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Update basic driver details.
     */
    async update(id: string, data: UpdateDriverDTO): Promise<Driver | null> {
        try {
            return await prisma.driver.update({
                where: { id },
                data: {
                    ...(data.name !== undefined && { name: data.name.trim() }),
                    ...(data.email !== undefined && { email: data.email.toLowerCase().trim() }),
                    ...(data.phone !== undefined && { phone: data.phone.trim() }),
                    ...(data.licenseNumber !== undefined && { licenseNumber: data.licenseNumber.toUpperCase().trim() }),
                    ...(data.status !== undefined && { status: data.status }),
                    ...(data.profileStatus !== undefined && { profileStatus: data.profileStatus }),
                    ...(data.deviceId !== undefined && { deviceId: data.deviceId }),
                    ...(data.token !== undefined && { token: data.token }),
                    ...(data.organisationId !== undefined && { organisationId: data.organisationId }),
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return null;
                }
                if (error.code === 'P2002') {
                    const target = (error.meta?.target as string[])?.join(', ') || 'field';
                    throw new Error(`A driver with this ${target} already exists.`);
                }
            }
            throw error;
        }
    }

    /**
     * Delete a driver by ID. Cascades to driver_details automatically.
     */
    async delete(id: string): Promise<boolean> {
        try {
            await prisma.driver.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                return false;
            }
            throw error;
        }
    }

    /**
     * Get the onboarding details for a driver.
     */
    async getDetails(driverId: string): Promise<DriverDetails | null> {
        return prisma.driverDetails.findUnique({
            where: { driverId },
        });
    }

    /**
     * Upsert driver onboarding details after login.
     * Can be called step-by-step or all at once during driver onboarding.
     */
    async saveOnboardingDetails(driverId: string, data: UpsertDriverDetailsDTO): Promise<DriverDetails> {
        const driver = await prisma.driver.findUnique({ where: { id: driverId } });
        if (!driver) {
            throw new Error(`Driver with id '${driverId}' not found`);
        }

        const dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : undefined;
        const licenseExpiryDate = data.licenseExpiryDate ? new Date(data.licenseExpiryDate) : undefined;

        const baseFields = {
            ...(data.dateOfBirth !== undefined && { dateOfBirth }),
            ...(data.address !== undefined && { address: data.address }),
            ...(data.city !== undefined && { city: data.city }),
            ...(data.state !== undefined && { state: data.state }),
            ...(data.postalCode !== undefined && { postalCode: data.postalCode }),
            ...(data.profilePhotoUrl !== undefined && { profilePhotoUrl: data.profilePhotoUrl }),
            ...(data.nationalIdNumber !== undefined && { nationalIdNumber: data.nationalIdNumber }),
            ...(data.nationalIdDocumentUrl !== undefined && { nationalIdDocumentUrl: data.nationalIdDocumentUrl }),
            ...(data.licenseExpiryDate !== undefined && { licenseExpiryDate }),
            ...(data.licenseFrontDocUrl !== undefined && { licenseFrontDocUrl: data.licenseFrontDocUrl }),
            ...(data.licenseBackDocUrl !== undefined && { licenseBackDocUrl: data.licenseBackDocUrl }),
            ...(data.yearsOfExperience !== undefined && { yearsOfExperience: data.yearsOfExperience }),
            ...(data.emergencyContactName !== undefined && { emergencyContactName: data.emergencyContactName }),
            ...(data.emergencyContactPhone !== undefined && { emergencyContactPhone: data.emergencyContactPhone }),
            ...(data.emergencyContactRelation !== undefined && { emergencyContactRelation: data.emergencyContactRelation }),
            ...(data.bankName !== undefined && { bankName: data.bankName }),
            ...(data.accountHolderName !== undefined && { accountHolderName: data.accountHolderName }),
            ...(data.bankAccountNumber !== undefined && { bankAccountNumber: data.bankAccountNumber }),
            ...(data.bankRoutingNumber !== undefined && { bankRoutingNumber: data.bankRoutingNumber }),
            ...(data.registrationType !== undefined && { registrationType: data.registrationType }),
            ...(data.openForHire !== undefined && { openForHire: data.openForHire }),
            ...(data.preferredOperatingHub !== undefined && { preferredOperatingHub: data.preferredOperatingHub }),
            ...(data.vehicleCategories !== undefined && { vehicleCategories: data.vehicleCategories }),
            ...(data.onboardingStep !== undefined && { onboardingStep: data.onboardingStep }),
            ...(data.isCompleted !== undefined && {
                isCompleted: data.isCompleted,
                ...(data.isCompleted && { submittedAt: new Date(), verificationStatus: 'IN_REVIEW' as const }),
            }),
        };

        const result = await prisma.driverDetails.upsert({
            where: { driverId },
            create: {
                driverId,
                ...baseFields,
            },
            update: baseFields,
        });

        if (data.isCompleted) {
            await prisma.driver.update({
                where: { id: driverId },
                data: { profileStatus: 'IN_REVIEW' },
            });
        }

        return result;
    }
}

export const driverService = new DriverService();
