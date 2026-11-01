'use client';

import React from 'react';
import { Check, User, CreditCard, HeartPulse, Building2, FileCheck } from 'lucide-react';
import type { OnboardingStep } from '../../types/onboarding';

interface StepNavigationProps {
  currentStep: OnboardingStep;
  onStepClick: (step: OnboardingStep) => void;
  completedSteps: number[];
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  onStepClick,
  completedSteps,
}) => {
  const steps = [
    { id: 1 as OnboardingStep, label: 'Personal', icon: User, sublabel: 'Identity & Address' },
    { id: 2 as OnboardingStep, label: 'License', icon: CreditCard, sublabel: 'DL & Vehicle Class' },
    { id: 3 as OnboardingStep, label: 'Emergency', icon: HeartPulse, sublabel: 'Family Contact' },
    { id: 4 as OnboardingStep, label: 'Payout', icon: Building2, sublabel: 'Bank Account' },
    { id: 5 as OnboardingStep, label: 'Review', icon: FileCheck, sublabel: 'Verify & Confirm' },
  ];

  return (
    <div className="w-full bg-white border border-[#E7E8E4] rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Mobile view: Compact progress indicator */}
      <div className="flex md:hidden flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-[#362F4F] uppercase tracking-wider">
            Step {currentStep} of 5
          </span>
          <span className="font-medium text-[#20212A]">
            {steps[currentStep - 1].label}: {steps[currentStep - 1].sublabel}
          </span>
        </div>
        <div className="w-full bg-[#E7E8E4] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#362F4F] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop view: Step nodes with connectors */}
      <nav aria-label="Progress" className="hidden md:block">
        <ol className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            const Icon = step.icon;

            return (
              <li key={step.id} className="relative flex-1 flex flex-col items-center">
                {/* Horizontal connector line */}
                {idx !== 0 && (
                  <div
                    aria-hidden="true"
                    className={`absolute top-4 -left-1/2 w-full h-[2px] -z-0 transition-colors ${
                      completedSteps.includes(steps[idx - 1].id)
                        ? 'bg-[#362F4F]'
                        : 'bg-[#E7E8E4]'
                    }`}
                  />
                )}

                {/* Step button */}
                <button
                  type="button"
                  onClick={() => isCompleted && onStepClick(step.id)}
                  disabled={!isCompleted && !isCurrent}
                  className={`group relative z-10 flex flex-col items-center text-center focus:outline-none transition-all ${
                    isCompleted || isCurrent ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 border-2 ${
                      isCompleted
                        ? 'bg-[#362F4F] text-[#E4FF30] border-[#362F4F]'
                        : isCurrent
                        ? 'bg-white text-[#362F4F] border-[#362F4F] ring-4 ring-[#F0EEF5]'
                        : 'bg-white text-[#92949C] border-[#E7E8E4]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>

                  <span
                    className={`mt-2 text-xs font-semibold tracking-tight transition-colors ${
                      isCurrent
                        ? 'text-[#362F4F]'
                        : isCompleted
                        ? 'text-[#20212A]'
                        : 'text-[#92949C]'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[11px] text-[#6E707A] hidden lg:block">
                    {step.sublabel}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

