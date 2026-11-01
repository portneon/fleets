import type { Driver, DriverDetails, DriverStatus, ProfileStatus, VerificationStatus } from '@prisma/client';

export type { Driver, DriverDetails, DriverStatus, ProfileStatus, VerificationStatus };

export interface RegisterDriverDTO {
    name: string;
    email: string;
    phone: string;
    licenseNumber: string;
    organisationId?: string;
    deviceId?: string;
}

export interface UpdateDriverDTO {
    name?: string;
    email?: string;
    phone?: string;
    licenseNumber?: string;
    status?: DriverStatus;
    profileStatus?: ProfileStatus;
    deviceId?: string;
    token?: string;
    organisationId?: string;
}

export interface UpsertDriverDetailsDTO {
    dateOfBirth?: Date | string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    profilePhotoUrl?: string;
    nationalIdNumber?: string;
    nationalIdDocumentUrl?: string;

    licenseExpiryDate?: Date | string;
    licenseFrontDocUrl?: string;
    licenseBackDocUrl?: string;
    yearsOfExperience?: number;

    emergencyContactName?: string;
    emergencyContactPhone?: string;
    emergencyContactRelation?: string;

    bankName?: string;
    accountHolderName?: string;
    bankAccountNumber?: string;
    bankRoutingNumber?: string;

    registrationType?: string;
    openForHire?: boolean;
    preferredOperatingHub?: string;
    vehicleCategories?: string[];

    onboardingStep?: number;
    isCompleted?: boolean;
}
