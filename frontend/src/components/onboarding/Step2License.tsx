'use client';

import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { FileUploadCard } from '../ui/FileUploadCard';
import { Button } from '../ui/Button';
import { CreditCard, Calendar, Award, ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';
import type { DriverOnboardingData } from '../../types/onboarding';

interface Step2Props {
  data: DriverOnboardingData;
  onChange: (fields: Partial<DriverOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2License: React.FC<Step2Props> = ({ data, onChange, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const vehicleClasses = [
    { id: 'LMV', label: 'LMV (Light Goods / Pickup / Van)' },
    { id: 'HMV', label: 'HMV / Heavy Truck (14ft - 32ft)' },
    { id: 'TRAILER', label: 'Multi-Axle Trailer / Container Carrier' },
    { id: 'HAZMAT', label: 'Hazardous / Petroleum Goods Endorsement' },
  ];

  const toggleCategory = (catId: string) => {
    const current = data.vehicleCategories || [];
    const exists = current.includes(catId);
    const updated = exists ? current.filter((c) => c !== catId) : [...current, catId];
    onChange({ vehicleCategories: updated });
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const cleanDL = data.licenseNumber.trim();
    if (!cleanDL) {
      newErrors.licenseNumber = 'Driving License (DL) number is required';
    } else if (cleanDL.length < 8) {
      newErrors.licenseNumber = 'Please enter a valid commercial DL number';
    }

    if (!data.licenseExpiryDate) {
      newErrors.licenseExpiryDate = 'License expiration date is required';
    } else {
      const expiry = new Date(data.licenseExpiryDate);
      if (expiry.getTime() < Date.now()) {
        newErrors.licenseExpiryDate = 'Driving License has already expired. Please renew first.';
      }
    }

    if (data.yearsOfExperience === '' || data.yearsOfExperience === undefined) {
      newErrors.yearsOfExperience = 'Years of driving experience is required';
    } else if (Number(data.yearsOfExperience) < 0) {
      newErrors.yearsOfExperience = 'Experience cannot be negative';
    }

    if (!data.vehicleCategories || data.vehicleCategories.length === 0) {
      newErrors.categories = 'Please select at least one vehicle category you are authorized to drive';
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
          Commercial Driving License & Experience
        </h2>
        <p className="text-xs text-[#6E707A] mt-1">
          Your driving license will be authenticated via the Government Sarathi / MoRTH national database.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Driving License (DL) Number"
          required
          placeholder="e.g. MH12 20180012345"
          value={data.licenseNumber}
          onChange={(e) => {
            onChange({ licenseNumber: e.target.value.toUpperCase() });
            if (errors.licenseNumber) setErrors((prev) => ({ ...prev, licenseNumber: '' }));
          }}
          error={errors.licenseNumber}
          leftIcon={<CreditCard className="w-4 h-4" />}
          helperText="State Code + Issue Year + Badge Digits"
        />

        <FormInput
          label="License Expiry Date"
          required
          type="date"
          value={data.licenseExpiryDate}
          onChange={(e) => {
            onChange({ licenseExpiryDate: e.target.value });
            if (errors.licenseExpiryDate) setErrors((prev) => ({ ...prev, licenseExpiryDate: '' }));
          }}
          error={errors.licenseExpiryDate}
          leftIcon={<Calendar className="w-4 h-4" />}
        />

        <div className="sm:col-span-2">
          <FormInput
            label="Years of Commercial Driving Experience"
            required
            type="number"
            min="0"
            max="45"
            placeholder="Total years driving transport vehicles"
            value={data.yearsOfExperience}
            onChange={(e) => {
              onChange({ yearsOfExperience: e.target.value ? Number(e.target.value) : '' });
              if (errors.yearsOfExperience) setErrors((prev) => ({ ...prev, yearsOfExperience: '' }));
            }}
            error={errors.yearsOfExperience}
            leftIcon={<Award className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Authorized Vehicle Categories */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#6E707A]">
          Authorized Vehicle Categories <span className="text-[#C84C4C]">*</span>
        </label>
        <p className="text-xs text-[#92949C]">
          Select all vehicle categories endorsed on your driving license.
        </p>

        {errors.categories && (
          <p className="text-xs text-[#C84C4C] flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.categories}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {vehicleClasses.map((item) => {
            const isSelected = data.vehicleCategories?.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCategory(item.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-150 ${
                  isSelected
                    ? 'border-[#362F4F] bg-[#F0EEF5] text-[#362F4F] font-semibold'
                    : 'border-[#E7E8E4] bg-white text-[#20212A] hover:bg-[#F6F7F5]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    isSelected
                      ? 'bg-[#362F4F] border-[#362F4F] text-[#E4FF30]'
                      : 'border-[#D1D3CA] bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual Document Upload for DL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FileUploadCard
          label="License Front Photo"
          sublabel="Clear photo showing photo, name & DL number"
          uploadedUrl={data.licenseFrontDocUrl}
          onFileSelect={(url) => onChange({ licenseFrontDocUrl: url })}
        />

        <FileUploadCard
          label="License Back Photo"
          sublabel="Clear photo showing vehicle endorsements"
          uploadedUrl={data.licenseBackDocUrl}
          onFileSelect={(url) => onChange({ licenseBackDocUrl: url })}
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
          Save & Proceed to Emergency Contact
        </Button>
      </div>
    </form>
  );
};
