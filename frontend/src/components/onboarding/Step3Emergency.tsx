'use client';

import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { Button } from '../ui/Button';
import { User, Phone, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';
import type { DriverOnboardingData } from '../../types/onboarding';

interface Step3Props {
  data: DriverOnboardingData;
  onChange: (fields: Partial<DriverOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Emergency: React.FC<Step3Props> = ({ data, onChange, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const relationships = ['Spouse', 'Father / Mother', 'Brother / Sister', 'Relative', 'Friend'];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.emergencyContactName.trim()) {
      newErrors.emergencyContactName = 'Emergency contact person name is required';
    }

    const cleanPhone = data.emergencyContactPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.emergencyContactPhone = 'Emergency phone number is required';
    } else if (cleanPhone.length < 10) {
      newErrors.emergencyContactPhone = 'Please enter a valid 10-digit mobile number';
    }

    if (!data.emergencyContactRelation) {
      newErrors.emergencyContactRelation = 'Please select relationship with contact person';
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
          Emergency Contact & Safety Information
        </h2>
        <p className="text-xs text-[#6E707A] mt-1">
          In case of highway accident, roadside breakdown, or medical assistance, who should operations alert?
        </p>
      </div>

      {/* Safety Notice Callout */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F0EEF5] border border-[#E7E8E4]">
        <ShieldAlert className="w-5 h-5 text-[#362F4F] shrink-0 mt-0.5" />
        <div className="text-xs text-[#20212A]">
          <p className="font-semibold">24x7 Driver Safety Hotline</p>
          <p className="text-[#6E707A] mt-0.5">
            FleetOS automatically checks vehicle telematics. This contact will only be dialed during SOS events or highway medical emergencies.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Emergency Contact Person"
          required
          placeholder="Name of family member or next of kin"
          value={data.emergencyContactName}
          onChange={(e) => {
            onChange({ emergencyContactName: e.target.value });
            if (errors.emergencyContactName) setErrors((prev) => ({ ...prev, emergencyContactName: '' }));
          }}
          error={errors.emergencyContactName}
          leftIcon={<User className="w-4 h-4" />}
        />

        <FormInput
          label="Emergency Contact Phone Number"
          required
          type="tel"
          placeholder="10-digit emergency number"
          value={data.emergencyContactPhone}
          onChange={(e) => {
            onChange({ emergencyContactPhone: e.target.value });
            if (errors.emergencyContactPhone) setErrors((prev) => ({ ...prev, emergencyContactPhone: '' }));
          }}
          error={errors.emergencyContactPhone}
          leftIcon={<Phone className="w-4 h-4" />}
          helperText="Must be reachable 24/7 on WhatsApp or Call"
        />

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6E707A]">
            Relationship with Driver <span className="text-[#C84C4C]">*</span>
          </label>
          {errors.emergencyContactRelation && (
            <p className="text-xs text-[#C84C4C]">{errors.emergencyContactRelation}</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {relationships.map((rel) => {
              const isSelected = data.emergencyContactRelation === rel;
              return (
                <button
                  type="button"
                  key={rel}
                  onClick={() => {
                    onChange({ emergencyContactRelation: rel });
                    if (errors.emergencyContactRelation) {
                      setErrors((prev) => ({ ...prev, emergencyContactRelation: '' }));
                    }
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-[#362F4F] bg-[#362F4F] text-white shadow-sm'
                      : 'border-[#E7E8E4] bg-white text-[#20212A] hover:bg-[#F6F7F5]'
                  }`}
                >
                  {rel}
                </button>
              );
            })}
          </div>
        </div>
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
          Save & Proceed to Payout Bank
        </Button>
      </div>
    </form>
  );
};
