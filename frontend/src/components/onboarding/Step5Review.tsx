'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import {
  User,
  CreditCard,
  HeartPulse,
  Building2,
  Edit2,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  AlertCircle,
  Building,
} from 'lucide-react';
import type { DriverOnboardingData, OnboardingStep } from '../../types/onboarding';

interface Step5Props {
  data: DriverOnboardingData;
  onEditStep: (step: OnboardingStep) => void;
  onSubmit: () => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
}

export const Step5Review: React.FC<Step5Props> = ({
  data,
  onEditStep,
  onSubmit,
  onBack,
  isSubmitting,
}) => {
  const [agreed, setAgreed] = useState(data.declarationAccepted);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFinalSubmit = async () => {
    if (!agreed) {
      setErrorMsg('You must check the statutory declaration box before submitting.');
      return;
    }
    setErrorMsg('');
    await onSubmit();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="border-b border-[#E7E8E4] pb-4">
        <h2 className="text-xl font-bold text-[#20212A] tracking-tight">
          Review Application & E-Declaration
        </h2>
        <p className="text-xs text-[#6E707A] mt-1">
          Verify your details below. Once submitted, your profile will be verified against the Sarathi and Vahan national registries.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#C84C4C] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Registration Mode Highlight Banner */}
      <div className="p-4 rounded-xl border border-[#E7E8E4] bg-[#F0EEF5] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#362F4F] text-[#E4FF30]">
            {data.registrationType === 'INDEPENDENT' ? (
              <Briefcase className="w-5 h-5" />
            ) : (
              <Building className="w-5 h-5" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E707A]">
              Operating Platform Mode
            </span>
            <h4 className="text-sm font-bold text-[#20212A]">
              {data.registrationType === 'INDEPENDENT'
                ? 'Independent Professional Driver'
                : `Attached Fleet Driver (Code: ${data.fleetInviteCode || 'Direct Entity'})`}
            </h4>
            <p className="text-xs text-[#6E707A]">
              {data.registrationType === 'INDEPENDENT'
                ? data.openForHire
                  ? `Open for load assignments • Region: ${data.preferredOperatingHub || 'Pan-India'}`
                  : 'Independent Contractor'
                : 'Account directly associated with transport organisation'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEditStep(1)}
          className="text-xs text-[#362F4F] font-semibold hover:underline flex items-center gap-1"
        >
          <Edit2 className="w-3 h-3" /> Change
        </button>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Personal Info Card */}
        <div className="p-4 rounded-xl border border-[#E7E8E4] bg-[#FBFCFA] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E8E4] mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#362F4F]">
                <User className="w-3.5 h-3.5" />
                <span>Personal & Identity</span>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-xs text-[#362F4F] font-semibold hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Name:</span>
                <span className="font-semibold text-[#20212A]">{data.name || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Mobile:</span>
                <span className="font-semibold text-[#20212A]">{data.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">DOB:</span>
                <span className="font-semibold text-[#20212A]">{data.dateOfBirth || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Aadhaar / ID:</span>
                <span className="font-semibold text-[#20212A]">{data.nationalIdNumber || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Location:</span>
                <span className="font-semibold text-[#20212A]">
                  {data.city && data.state ? `${data.city}, ${data.state} (${data.postalCode})` : 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. License Card */}
        <div className="p-4 rounded-xl border border-[#E7E8E4] bg-[#FBFCFA] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E8E4] mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#362F4F]">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Driving License</span>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-xs text-[#362F4F] font-semibold hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6E707A]">DL Number:</span>
                <span className="font-semibold text-[#20212A] font-mono">
                  {data.licenseNumber || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Validity Expiry:</span>
                <span className="font-semibold text-[#20212A]">{data.licenseExpiryDate || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Experience:</span>
                <span className="font-semibold text-[#20212A]">
                  {data.yearsOfExperience !== '' ? `${data.yearsOfExperience} Years` : 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Vehicle Classes:</span>
                <span className="font-semibold text-[#20212A]">
                  {data.vehicleCategories?.length > 0 ? data.vehicleCategories.join(', ') : 'None selected'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Emergency Card */}
        <div className="p-4 rounded-xl border border-[#E7E8E4] bg-[#FBFCFA] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E8E4] mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#362F4F]">
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Emergency Contact</span>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-xs text-[#362F4F] font-semibold hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Person:</span>
                <span className="font-semibold text-[#20212A]">{data.emergencyContactName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Relation:</span>
                <span className="font-semibold text-[#20212A]">
                  {data.emergencyContactRelation || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Emergency Phone:</span>
                <span className="font-semibold text-[#20212A]">
                  {data.emergencyContactPhone || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bank Details Card */}
        <div className="p-4 rounded-xl border border-[#E7E8E4] bg-[#FBFCFA] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E8E4] mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#362F4F]">
                <Building2 className="w-3.5 h-3.5" />
                <span>Payout Bank</span>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(4)}
                className="text-xs text-[#362F4F] font-semibold hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Bank Name:</span>
                <span className="font-semibold text-[#20212A]">{data.bankName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Beneficiary:</span>
                <span className="font-semibold text-[#20212A]">
                  {data.accountHolderName || data.name || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">Account Number:</span>
                <span className="font-semibold text-[#20212A] font-mono">
                  {data.bankAccountNumber
                    ? `•••• •••• ${data.bankAccountNumber.slice(-4)}`
                    : 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E707A]">IFSC Code:</span>
                <span className="font-semibold text-[#20212A] font-mono">
                  {data.bankRoutingNumber || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Declaration Checkbox */}
      <div className="p-4 rounded-xl border border-[#E7E8E4] bg-white">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              if (errorMsg) setErrorMsg('');
            }}
            className="mt-0.5 w-4 h-4 rounded text-[#362F4F] focus:ring-[#362F4F] border-[#D1D3CA]"
          />
          <div className="text-xs text-[#20212A]">
            <span className="font-semibold">Statutory Commercial Driver Declaration</span>
            <p className="text-[#6E707A] mt-0.5 leading-relaxed">
              I certify that all details, driving license numbers, and banking particulars entered above are authentic and belong to me. I authorize FleetOS to verify my credentials with the Ministry of Road Transport and Highways (MoRTH/Sarathi) and UIDAI repositories for dispatch qualification.
            </p>
          </div>
        </label>
      </div>

      {/* Action Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#E7E8E4]">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>

        <Button
          type="button"
          variant="secondary"
          isLoading={isSubmitting}
          onClick={handleFinalSubmit}
          rightIcon={<CheckCircle2 className="w-4 h-4" />}
          className="shadow-md"
        >
          Submit Independent Registration
        </Button>
      </div>
    </div>
  );
};
