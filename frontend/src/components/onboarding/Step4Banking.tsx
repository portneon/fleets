'use client';

import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { FileUploadCard } from '../ui/FileUploadCard';
import { Button } from '../ui/Button';
import { Building2, User, CreditCard, Landmark, ArrowLeft, ArrowRight } from 'lucide-react';
import type { DriverOnboardingData } from '../../types/onboarding';

interface Step4Props {
  data: DriverOnboardingData;
  onChange: (fields: Partial<DriverOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4Banking: React.FC<Step4Props> = ({ data, onChange, onNext, onBack }) => {
  const [confirmAccNo, setConfirmAccNo] = useState(data.bankAccountNumber || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const popularBanks = [
    'State Bank of India (SBI)',
    'HDFC Bank',
    'ICICI Bank',
    'Punjab National Bank (PNB)',
    'Bank of Baroda',
    'Axis Bank',
    'Canara Bank',
    'Union Bank of India',
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!data.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    }

    const cleanAcc = data.bankAccountNumber.replace(/\s+/g, '');
    if (!cleanAcc) {
      newErrors.bankAccountNumber = 'Bank account number is required';
    } else if (cleanAcc.length < 8) {
      newErrors.bankAccountNumber = 'Please enter a valid bank account number';
    }

    if (!confirmAccNo.trim()) {
      newErrors.confirmAccNo = 'Please re-enter your account number to confirm';
    } else if (confirmAccNo.trim() !== cleanAcc) {
      newErrors.confirmAccNo = 'Account numbers do not match. Please verify.';
    }

    const cleanIFSC = data.bankRoutingNumber.trim().toUpperCase();
    if (!cleanIFSC) {
      newErrors.bankRoutingNumber = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(cleanIFSC)) {
      newErrors.bankRoutingNumber = 'Invalid IFSC code format (e.g. SBIN0001234)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="border-b border-[#E7E8E4] pb-4">
        <h2 className="text-xl font-bold text-[#20212A] tracking-tight">
          Direct Payout & Bank Account
        </h2>
        <p className="text-xs text-[#6E707A] mt-1">
          Trip freight settlements, diesel advances, and incentive payments will be directly credited via IMPS/NEFT to this account.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <FormInput
            label="Bank Name"
            required
            placeholder="Select from below or type bank name"
            value={data.bankName}
            onChange={(e) => {
              onChange({ bankName: e.target.value });
              if (errors.bankName) setErrors((prev) => ({ ...prev, bankName: '' }));
            }}
            error={errors.bankName}
            leftIcon={<Landmark className="w-4 h-4" />}
          />
          {/* Quick Bank Chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {popularBanks.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => {
                  onChange({ bankName: b });
                  if (errors.bankName) setErrors((prev) => ({ ...prev, bankName: '' }));
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                  data.bankName === b
                    ? 'border-[#362F4F] bg-[#362F4F] text-white font-medium'
                    : 'border-[#E7E8E4] bg-white text-[#6E707A] hover:text-[#20212A] hover:bg-[#F6F7F5]'
                }`}
              >
                {b.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        <FormInput
          label="Account Holder Name"
          required
          placeholder="Name as registered with your bank"
          value={data.accountHolderName}
          onChange={(e) => {
            onChange({ accountHolderName: e.target.value });
            if (errors.accountHolderName) setErrors((prev) => ({ ...prev, accountHolderName: '' }));
          }}
          error={errors.accountHolderName}
          leftIcon={<User className="w-4 h-4" />}
          helperText="Must match your Aadhaar / Driver identity"
        />

        <FormInput
          label="IFSC Code"
          required
          maxLength={11}
          placeholder="e.g. SBIN0001423"
          value={data.bankRoutingNumber}
          onChange={(e) => {
            onChange({ bankRoutingNumber: e.target.value.toUpperCase() });
            if (errors.bankRoutingNumber) setErrors((prev) => ({ ...prev, bankRoutingNumber: '' }));
          }}
          error={errors.bankRoutingNumber}
          leftIcon={<Building2 className="w-4 h-4" />}
          helperText="11-character Indian Financial System Code"
        />

        <FormInput
          label="Bank Account Number"
          required
          type="password"
          placeholder="Enter bank account number"
          value={data.bankAccountNumber}
          onChange={(e) => {
            onChange({ bankAccountNumber: e.target.value.replace(/\s+/g, '') });
            if (errors.bankAccountNumber) setErrors((prev) => ({ ...prev, bankAccountNumber: '' }));
          }}
          error={errors.bankAccountNumber}
          leftIcon={<CreditCard className="w-4 h-4" />}
        />

        <FormInput
          label="Re-enter Bank Account Number"
          required
          type="text"
          placeholder="Re-confirm account number"
          value={confirmAccNo}
          onChange={(e) => {
            setConfirmAccNo(e.target.value.replace(/\s+/g, ''));
            if (errors.confirmAccNo) setErrors((prev) => ({ ...prev, confirmAccNo: '' }));
          }}
          error={errors.confirmAccNo}
          leftIcon={<CreditCard className="w-4 h-4" />}
        />
      </div>

      {/* Upload cancelled cheque or passbook copy */}
      <div className="pt-2">
        <FileUploadCard
          label="Cancelled Cheque or Bank Passbook Copy"
          sublabel="Must clearly display account number, IFSC code, and account holder name"
          uploadedUrl={data.passbookDocumentUrl}
          onFileSelect={(url) => onChange({ passbookDocumentUrl: url })}
        />
      </div>

      {/* Action Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-[#E7E8E4]">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>

        <Button
          type="submit"
          variant="primary"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Proceed to Review & E-Sign
        </Button>
      </div>
    </form>
  );
};
