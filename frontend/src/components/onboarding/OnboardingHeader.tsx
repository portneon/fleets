'use client';

import React from 'react';
import { Truck, PhoneCall, Globe, ShieldCheck, UserCheck } from 'lucide-react';

interface OnboardingHeaderProps {
  currentLang: 'en' | 'hi';
  onLangToggle: () => void;
  isIndependent?: boolean;
  organisationName?: string;
  onClearDraft?: () => void;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentLang,
  onLangToggle,
  isIndependent = true,
  organisationName,
  onClearDraft,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E7E8E4] px-4 sm:px-8 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#362F4F] flex items-center justify-center text-[#E4FF30] shadow-sm">
            <Truck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[#20212A]">
                Fleet<span className="text-[#362F4F]">OS</span>
              </span>
              <span className="bg-[#E4FF30] text-[#20212A] text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide">
                Driver Portal
              </span>
            </div>
            <p className="text-[11px] text-[#6E707A] font-medium flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-[#23845B]" />
              {isIndependent ? (
                <span>Independent Driver Registration</span>
              ) : (
                <span>Joining: <strong className="text-[#20212A]">{organisationName || 'Assigned Fleet'}</strong></span>
              )}
            </p>
          </div>
        </div>

        {/* Global Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onClearDraft && (
            <button
              type="button"
              onClick={onClearDraft}
              className="text-xs text-[#92949C] hover:text-[#C84C4C] px-2 py-1 rounded hover:bg-[#F6F7F5] transition-colors hidden sm:block"
              title="Reset all fields"
            >
              Reset Form
            </button>
          )}

          {/* Language Toggle */}
          <button
            type="button"
            onClick={onLangToggle}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E7E8E4] hover:bg-[#F6F7F5] text-[#20212A] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#6E707A]" />
            <span>{currentLang === 'en' ? 'हिन्दी (HI)' : 'English (EN)'}</span>
          </button>

          {/* Frontline Helpline */}
          <a
            href="tel:18001234567"
            className="flex items-center gap-1.5 text-xs font-medium text-[#6E707A] hover:text-[#362F4F] p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-[#F0EEF5] transition-colors"
            title="Helpline for Drivers"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#362F4F]" />
            <span className="hidden sm:inline">1800-123-4567</span>
          </a>
        </div>
      </div>
    </header>
  );
};
