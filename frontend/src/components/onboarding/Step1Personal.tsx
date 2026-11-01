'use client';

import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { FileUploadCard } from '../ui/FileUploadCard';
import { Button } from '../ui/Button';
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Hash,
  ArrowRight,
  Briefcase,
  Building,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import type { DriverOnboardingData, DriverRegistrationType } from '../../types/onboarding';

interface Step1Props {
  data: DriverOnboardingData;
  onChange: (fields: Partial<DriverOnboardingData>) => void;
  onNext: () => void;
}

export const Step1Personal: React.FC<Step1Props> = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const operatingHubs = [
    'Pan-India Long Haul',
    'Western Corridor (Mumbai - Pune - Gujarat)',
    'Northern Hub (Delhi NCR - Punjab - Rajasthan)',
    'Southern Corridor (Bengaluru - Chennai - Hyderabad)',
    'Eastern Hub (Kolkata - Odisha - Bihar)',
    'Local / Intra-City Deliveries Only',
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.name.trim()) {
      newErrors.name = 'Full legal name is required as per government ID';
    } else if (data.name.trim().length < 3) {
      newErrors.name = 'Please enter your complete legal name';
    }

    const cleanPhone = data.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = '10-digit mobile number is required';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(data.dateOfBirth);
      const ageDifMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 18) {
        newErrors.dateOfBirth = 'Commercial drivers must be at least 18 years of age';
      }
    }

    if (!data.address.trim()) {
      newErrors.address = 'Residential street address is required';
    }
    if (!data.city.trim()) {
      newErrors.city = 'City or district is required';
    }
    if (!data.state.trim()) {
      newErrors.state = 'State is required';
    }

    const cleanPin = data.postalCode.replace(/\D/g, '');
    if (!cleanPin) {
      newErrors.postalCode = 'PIN code is required';
    } else if (cleanPin.length !== 6) {
      newErrors.postalCode = 'Enter a valid 6-digit Indian PIN code';
    }

    const cleanAadhaar = data.nationalIdNumber.replace(/\D/g, '');
    if (!cleanAadhaar) {
      newErrors.nationalIdNumber = '12-digit Aadhaar / ID number is required';
    } else if (cleanAadhaar.length !== 12) {
      newErrors.nationalIdNumber = 'Aadhaar must be exactly 12 digits';
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      {/* 1. Registration Work Mode Selection */}
      <div>
        <div className="border-b border-[#E7E8E4] pb-3 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#362F4F] bg-[#F0EEF5] px-2.5 py-1 rounded-md">
            Registration Mode
          </span>
          <h2 className="text-xl font-bold text-[#20212A] tracking-tight mt-2">
            How will you operate on FleetOS?
          </h2>
          <p className="text-xs text-[#6E707A] mt-0.5">
            You can register independently to discover work, or attach your account to an existing transport entity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Option A: Independent Professional Driver */}
          <div
            onClick={() => onChange({ registrationType: 'INDEPENDENT', fleetInviteCode: '' })}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 flex flex-col justify-between ${
              data.registrationType === 'INDEPENDENT'
                ? 'border-[#362F4F] bg-[#F0EEF5] shadow-sm'
                : 'border-[#E7E8E4] bg-white hover:bg-[#F6F7F5]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-lg ${
                    data.registrationType === 'INDEPENDENT'
                      ? 'bg-[#362F4F] text-[#E4FF30]'
                      : 'bg-[#F6F7F5] text-[#6E707A]'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#20212A]">Independent Driver</h4>
                  <span className="text-[11px] text-[#23845B] font-semibold">Self-Employed / Freelance</span>
                </div>
              </div>
              {data.registrationType === 'INDEPENDENT' && (
                <CheckCircle2 className="w-5 h-5 text-[#362F4F] fill-[#E4FF30]" />
              )}
            </div>
            <p className="text-xs text-[#6E707A] mt-3 leading-relaxed">
              Accept loads from multiple transporters, direct highway dispatches, and receive payouts directly to your bank account.
            </p>
          </div>

          {/* Option B: Fleet-Attached Driver */}
          <div
            onClick={() => onChange({ registrationType: 'FLEET_ATTACHED' })}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 flex flex-col justify-between ${
              data.registrationType === 'FLEET_ATTACHED'
                ? 'border-[#362F4F] bg-[#F0EEF5] shadow-sm'
                : 'border-[#E7E8E4] bg-white hover:bg-[#F6F7F5]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-lg ${
                    data.registrationType === 'FLEET_ATTACHED'
                      ? 'bg-[#362F4F] text-[#E4FF30]'
                      : 'bg-[#F6F7F5] text-[#6E707A]'
                  }`}
                >
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#20212A]">Join an Existing Fleet</h4>
                  <span className="text-[11px] text-[#3976B8] font-semibold">Entity Driver / Employee</span>
                </div>
              </div>
              {data.registrationType === 'FLEET_ATTACHED' && (
                <CheckCircle2 className="w-5 h-5 text-[#362F4F] fill-[#E4FF30]" />
              )}
            </div>
            <p className="text-xs text-[#6E707A] mt-3 leading-relaxed">
              Invited by a specific transport company, logistics branch, or fleet operator.
            </p>
          </div>
        </div>

        {/* Conditional Field: Fleet Invite Code */}
        {data.registrationType === 'FLEET_ATTACHED' && (
          <div className="mt-3.5 p-3.5 rounded-xl border border-[#E7E8E4] bg-[#FBFCFA]">
            <FormInput
              label="Fleet / Transporter Invite Code (Optional)"
              placeholder="e.g. FLT-ORG-9921"
              value={data.fleetInviteCode}
              onChange={(e) => onChange({ fleetInviteCode: e.target.value.toUpperCase() })}
              helperText="Provided by your fleet manager or transporter. Leave blank if registering independently."
            />
          </div>
        )}

        {/* Independent Driver Preferences */}
        {data.registrationType === 'INDEPENDENT' && (
          <div className="mt-3.5 p-4 rounded-xl border border-[#E7E8E4] bg-[#FBFCFA] space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={data.openForHire}
                onChange={(e) => onChange({ openForHire: e.target.checked })}
                className="w-4 h-4 rounded text-[#362F4F] focus:ring-[#362F4F]"
              />
              <span className="text-xs font-semibold text-[#20212A]">
                Keep my profile open to hiring by fleet owners & transporters
              </span>
            </label>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#6E707A]">
                Preferred Operating Corridor / Hub
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                {operatingHubs.map((hub) => {
                  const isSelected = data.preferredOperatingHub === hub;
                  return (
                    <button
                      type="button"
                      key={hub}
                      onClick={() => onChange({ preferredOperatingHub: hub })}
                      className={`text-left text-xs p-2.5 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-[#362F4F] bg-[#362F4F] text-white font-medium'
                          : 'border-[#E7E8E4] bg-white text-[#20212A] hover:bg-[#F6F7F5]'
                      }`}
                    >
                      {hub}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Personal & Identity Details */}
      <div>
        <div className="border-b border-[#E7E8E4] pb-3 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#362F4F] bg-[#F0EEF5] px-2.5 py-1 rounded-md">
            Personal Profile
          </span>
          <h3 className="text-lg font-bold text-[#20212A] tracking-tight mt-2">
            Identity & Contact Information
          </h3>
          <p className="text-xs text-[#6E707A] mt-0.5">
            Enter your legal details as documented in official government repositories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Full Legal Name"
            required
            placeholder="As per Government ID"
            value={data.name}
            onChange={(e) => {
              onChange({ name: e.target.value });
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            leftIcon={<User className="w-4 h-4" />}
          />

          <FormInput
            label="Mobile Number"
            required
            type="tel"
            placeholder="10-digit mobile number"
            value={data.phone}
            onChange={(e) => {
              onChange({ phone: e.target.value });
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
            }}
            error={errors.phone}
            leftIcon={<Phone className="w-4 h-4" />}
            helperText="Used for daily trip dispatch & OTP verification"
          />

          <FormInput
            label="Email Address (Optional)"
            type="email"
            placeholder="name@example.com"
            value={data.email}
            onChange={(e) => {
              onChange({ email: e.target.value });
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <FormInput
            label="Date of Birth"
            required
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => {
              onChange({ dateOfBirth: e.target.value });
              if (errors.dateOfBirth) setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
            }}
            error={errors.dateOfBirth}
            leftIcon={<Calendar className="w-4 h-4" />}
          />

          <div className="sm:col-span-2">
            <FormInput
              label="Permanent Residential Address"
              required
              placeholder="Flat/House No., Street, Village/Town"
              value={data.address}
              onChange={(e) => {
                onChange({ address: e.target.value });
                if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
              }}
              error={errors.address}
              leftIcon={<MapPin className="w-4 h-4" />}
            />
          </div>

          <FormInput
            label="City / District"
            required
            placeholder="e.g. Pune, Indore, Kanpur"
            value={data.city}
            onChange={(e) => {
              onChange({ city: e.target.value });
              if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
            }}
            error={errors.city}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="State"
              required
              placeholder="e.g. Maharashtra"
              value={data.state}
              onChange={(e) => {
                onChange({ state: e.target.value });
                if (errors.state) setErrors((prev) => ({ ...prev, state: '' }));
              }}
              error={errors.state}
            />

            <FormInput
              label="Postal PIN Code"
              required
              maxLength={6}
              placeholder="6-digit PIN"
              value={data.postalCode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                onChange({ postalCode: val });
                if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: '' }));
              }}
              error={errors.postalCode}
            />
          </div>

          <div className="sm:col-span-2">
            <FormInput
              label="Aadhaar / National ID Number"
              required
              maxLength={14}
              placeholder="12-digit Aadhaar number"
              value={data.nationalIdNumber}
              onChange={(e) => {
                // Auto-format Aadhaar with spaces: XXXX XXXX XXXX
                const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
                const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
                onChange({ nationalIdNumber: formatted });
                if (errors.nationalIdNumber) setErrors((prev) => ({ ...prev, nationalIdNumber: '' }));
              }}
              error={errors.nationalIdNumber}
              leftIcon={<Hash className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Document Upload */}
        <div className="mt-4">
          <FileUploadCard
            label="Aadhaar Card / ID Proof Document"
            sublabel="Upload photo of front & back (PNG, JPG or PDF)"
            uploadedUrl={data.nationalIdDocumentUrl}
            onFileSelect={(url) => onChange({ nationalIdDocumentUrl: url })}
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end pt-4 border-t border-[#E7E8E4]">
        <Button
          type="submit"
          variant="primary"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Save & Proceed to Driving License
        </Button>
      </div>
    </form>
  );
};
