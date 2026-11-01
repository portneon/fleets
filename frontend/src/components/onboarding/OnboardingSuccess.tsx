'use client';

import React from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import {
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  PhoneCall,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import type { DriverOnboardingData } from '../../types/onboarding';

interface OnboardingSuccessProps {
  data: DriverOnboardingData;
  onReset?: () => void;
}

export const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({ data, onReset }) => {
  const applicationId = data.driverId || 'FLT-DRV-2026-7789';

  return (
    <div className="w-full flex flex-col items-center text-center py-6 px-4">
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-full bg-[#E4FF30] flex items-center justify-center text-[#20212A] shadow-md mb-4 ring-8 ring-[#F0EEF5]">
        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
      </div>

      <StatusBadge status="in_review" label="Verification In Progress" className="mb-3" />

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20212A] tracking-tight">
        Application Submitted Successfully!
      </h1>
      <p className="text-sm text-[#6E707A] max-w-md mt-1.5 leading-relaxed">
        Thank you, <span className="font-semibold text-[#20212A]">{data.name || 'Driver'}</span>. Your details have been transmitted to the FleetOS dispatch and compliance team.
      </p>

      {/* Application Reference ID Box */}
      <div className="mt-6 p-4 rounded-xl border border-[#E7E8E4] bg-white w-full max-w-md shadow-sm">
        <span className="text-xs uppercase font-bold text-[#6E707A] tracking-wider">
          Driver Application Reference
        </span>
        <div className="text-lg font-mono font-bold text-[#362F4F] mt-1 select-all">
          {applicationId}
        </div>
        <p className="text-[11px] text-[#92949C] mt-1">
          Keep this reference number handy when contacting your transporter or fleet manager.
        </p>
      </div>

      {/* Verification Timeline */}
      <div className="w-full max-w-md mt-6 p-5 rounded-2xl border border-[#E7E8E4] bg-[#FBFCFA] text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E707A] mb-4">
          Onboarding Progress Timeline
        </h3>

        <div className="space-y-4">
          {/* Step 1: Done */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#362F4F] text-[#E4FF30] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#20212A]">Documents & Form Received</p>
              <p className="text-[11px] text-[#6E707A]">All 5 sections submitted with e-declaration</p>
            </div>
          </div>

          {/* Step 2: In Progress */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FEF9C3] text-[#B7791F] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#20212A]">Vahan / Sarathi License Verification</p>
              <p className="text-[11px] text-[#6E707A]">
                Estimated turnaround: 2 to 4 business hours
              </p>
            </div>
          </div>

          {/* Step 3: Upcoming */}
          <div className="flex items-start gap-3 opacity-60">
            <div className="w-6 h-6 rounded-full bg-[#E7E8E4] text-[#92949C] flex items-center justify-center shrink-0 mt-0.5">
              <Truck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#20212A]">Vehicle & Trip Allocation</p>
              <p className="text-[11px] text-[#6E707A]">
                Receive trip dispatch alerts on SMS and FleetOS Mobile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-md">
        <Button
          variant="primary"
          className="flex-1"
          rightIcon={<ChevronRight className="w-4 h-4" />}
          onClick={() => alert('Accessing Driver Daily Operations / Trips view...')}
        >
          View Driver Operations
        </Button>

        {onReset && (
          <Button variant="outline" onClick={onReset}>
            Edit Application
          </Button>
        )}
      </div>
    </div>
  );
};

