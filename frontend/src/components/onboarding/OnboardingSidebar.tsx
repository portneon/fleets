'use client';

import React from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  Check,
  Sparkles,
  Briefcase,
  Building,
} from 'lucide-react';
import type { DriverOnboardingData } from '../../types/onboarding';

interface OnboardingSidebarProps {
  data: DriverOnboardingData;
  isCompleted: boolean;
}

export const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({ data, isCompleted }) => {
  const getInitials = (name: string) => {
    if (!name.trim()) return 'DR';
    return name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const isIndependent = data.registrationType === 'INDEPENDENT';

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-5">
      {/* Driver Identity Card */}
      <div className="bg-white border border-[#E7E8E4] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3.5 pb-4 border-b border-[#E7E8E4]">
          <div className="w-12 h-12 rounded-xl bg-[#362F4F] text-[#E4FF30] flex items-center justify-center font-bold text-base shadow-sm">
            {getInitials(data.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#20212A] truncate">
              {data.name || 'New Driver'}
            </h3>
            <p className="text-xs text-[#6E707A] truncate font-mono">
              {data.phone || 'Phone not set'}
            </p>
          </div>
        </div>

        <div className="pt-3.5 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-[#6E707A]">Registration Type</span>
            <span className="font-semibold text-[#20212A] flex items-center gap-1">
              {isIndependent ? (
                <>
                  <Briefcase className="w-3.5 h-3.5 text-[#23845B]" />
                  Independent
                </>
              ) : (
                <>
                  <Building className="w-3.5 h-3.5 text-[#3976B8]" />
                  Fleet Attached
                </>
              )}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#6E707A]">Application Status</span>
            <StatusBadge
              status={isCompleted ? 'in_review' : 'pending'}
              label={isCompleted ? 'Under Verification' : 'Drafting'}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#6E707A]">Operating Region</span>
            <span className="font-medium text-[#20212A] truncate max-w-[130px]">
              {data.preferredOperatingHub || 'All Hubs'}
            </span>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-[#F0EEF5]">
            <span className="text-[#6E707A]">Local Draft</span>
            <span className="text-[#23845B] font-medium flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3]" /> Auto-Saved
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory Checklist */}
      <div className="bg-white border border-[#E7E8E4] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-[#362F4F]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#20212A]">
            Verification Checklist
          </h4>
        </div>

        <ul className="space-y-3 text-xs">
          <li className="flex items-start gap-2.5">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                data.name && data.phone
                  ? 'bg-[#23845B] text-white'
                  : 'bg-[#E7E8E4] text-[#92949C]'
              }`}
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <div>
              <p className="font-semibold text-[#20212A]">Identity & Contact Verified</p>
              <p className="text-[#6E707A] text-[11px]">Name & 10-digit primary mobile</p>
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                data.licenseNumber
                  ? 'bg-[#23845B] text-white'
                  : 'bg-[#E7E8E4] text-[#92949C]'
              }`}
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <div>
              <p className="font-semibold text-[#20212A]">Commercial Driving License</p>
              <p className="text-[#6E707A] text-[11px]">Valid transport vehicle badge</p>
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                data.nationalIdNumber
                  ? 'bg-[#23845B] text-white'
                  : 'bg-[#E7E8E4] text-[#92949C]'
              }`}
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <div>
              <p className="font-semibold text-[#20212A]">Aadhaar / National ID</p>
              <p className="text-[#6E707A] text-[11px]">12-digit statutory identity</p>
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                data.bankAccountNumber && data.bankRoutingNumber
                  ? 'bg-[#23845B] text-white'
                  : 'bg-[#E7E8E4] text-[#92949C]'
              }`}
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <div>
              <p className="font-semibold text-[#20212A]">Direct Payout Bank Account</p>
              <p className="text-[#6E707A] text-[11px]">For daily freight settlements</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Driver Help & WhatsApp Support */}
      <div className="bg-[#362F4F] text-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#E4FF30]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#E4FF30]">
            Driver Helpline
          </h4>
        </div>
        <p className="text-xs text-[#E7E8E4] leading-relaxed mb-4">
          Need assistance with DL badge details or bank IFSC? Our support desk assists drivers in Hindi, English, and local languages.
        </p>

        <div className="space-y-2">
          <a
            href="tel:18001234567"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E4FF30]" />
            <span>Toll-Free Driver Support</span>
          </a>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#23845B] hover:bg-[#1f7450] text-xs font-semibold text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
