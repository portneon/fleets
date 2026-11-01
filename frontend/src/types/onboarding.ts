export type OnboardingStep = 1 | 2 | 3 | 4 | 5;

export type DriverRegistrationType = 'INDEPENDENT' | 'FLEET_ATTACHED';

export interface DriverOnboardingData {
  // Step 1: Work Mode & Account
  driverId?: string;
  registrationType: DriverRegistrationType;
  fleetInviteCode: string; // Optional: If attaching to a transporter
  openForHire: boolean; // Independent: Available for loads and transporter hire
  preferredOperatingHub: string; // e.g. Western Corridor, NCR, Intra-City, Pan-India

  // Step 2: Personal & Identity
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  nationalIdNumber: string; // Aadhaar / National ID
  nationalIdDocumentUrl?: string;
  profilePhotoUrl?: string;

  // Step 3: Driving License & Experience
  licenseNumber: string;
  licenseExpiryDate: string;
  yearsOfExperience: number | '';
  vehicleCategories: string[]; // e.g., 'LMV', 'HMV', 'TRAILER', 'HAZMAT'
  licenseFrontDocUrl?: string;
  licenseBackDocUrl?: string;

  // Step 4: Emergency Contacts
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;

  // Step 5: Direct Payout Banking Details
  bankName: string;
  accountHolderName: string;
  bankAccountNumber: string;
  bankRoutingNumber: string; // IFSC Code
  passbookDocumentUrl?: string;

  // Final Review & State
  declarationAccepted: boolean;
  onboardingStep: OnboardingStep;
  isCompleted: boolean;
}

export const emptyOnboardingData: DriverOnboardingData = {
  driverId: '',
  registrationType: 'INDEPENDENT',
  fleetInviteCode: '',
  openForHire: true,
  preferredOperatingHub: '',

  name: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  nationalIdNumber: '',
  nationalIdDocumentUrl: '',
  profilePhotoUrl: '',

  licenseNumber: '',
  licenseExpiryDate: '',
  yearsOfExperience: '',
  vehicleCategories: [],
  licenseFrontDocUrl: '',
  licenseBackDocUrl: '',

  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelation: '',

  bankName: '',
  accountHolderName: '',
  bankAccountNumber: '',
  bankRoutingNumber: '',
  passbookDocumentUrl: '',

  declarationAccepted: false,
  onboardingStep: 1,
  isCompleted: false,
};
