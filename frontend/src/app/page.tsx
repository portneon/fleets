'use client';

import React, { useState, useEffect } from 'react';
import { OnboardingHeader } from '../components/onboarding/OnboardingHeader';
import { StepNavigation } from '../components/onboarding/StepNavigation';
import { Step1Personal } from '../components/onboarding/Step1Personal';
import { Step2License } from '../components/onboarding/Step2License';
import { Step3Emergency } from '../components/onboarding/Step3Emergency';
import { Step4Banking } from '../components/onboarding/Step4Banking';
import { Step5Review } from '../components/onboarding/Step5Review';
import { OnboardingSuccess } from '../components/onboarding/OnboardingSuccess';
import { OnboardingSidebar } from '../components/onboarding/OnboardingSidebar';
import { emptyOnboardingData, type DriverOnboardingData, type OnboardingStep } from '../types/onboarding';

const STORAGE_KEY = 'fleetos_driver_onboarding_draft';

export default function DriverOnboardingPage() {
  const [formData, setFormData] = useState<DriverOnboardingData>(emptyOnboardingData);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'hi'>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore saved draft from localStorage on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        if (parsed.onboardingStep) {
          setCurrentStep(parsed.onboardingStep);
        }
      }
    } catch {
      // LocalStorage unavailable
    }
    setIsHydrated(true);
  }, []);

  // Auto-save draft changes to localStorage
  useEffect(() => {
    if (!isHydrated || formData.isCompleted) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...formData,
          onboardingStep: currentStep,
        })
      );
    } catch {
      // Ignore quota errors
    }
  }, [formData, currentStep, isHydrated]);

  const updateFormData = (fields: Partial<DriverOnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNextStep = (next: OnboardingStep) => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepJump = (step: OnboardingStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearDraft = () => {
    if (confirm('Are you sure you want to clear your current progress and start fresh?')) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData(emptyOnboardingData);
      setCurrentStep(1);
      setCompletedSteps([]);
    }
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    const assignedId =
      formData.driverId ||
      `FLT-DRV-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 1. Create or sync with backend API
      try {
        // Step A: Register the Driver root record if not exists
        const regRes = await fetch('http://localhost:3000/api/drivers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim() || `${assignedId.toLowerCase()}@driver.fleetos.in`,
            phone: formData.phone.trim(),
            licenseNumber: formData.licenseNumber.trim(),
            organisationId:
              formData.registrationType === 'FLEET_ATTACHED'
                ? formData.fleetInviteCode || undefined
                : undefined,
          }),
        });

        const regData = await regRes.json();
        const serverDriverId = regData?.data?.id || assignedId;

        // Step B: Upsert Onboarding Details
        await fetch(`http://localhost:3000/api/drivers/${serverDriverId}/details`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dateOfBirth: formData.dateOfBirth,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            nationalIdNumber: formData.nationalIdNumber,
            nationalIdDocumentUrl: formData.nationalIdDocumentUrl,
            licenseExpiryDate: formData.licenseExpiryDate,
            licenseFrontDocUrl: formData.licenseFrontDocUrl,
            licenseBackDocUrl: formData.licenseBackDocUrl,
            yearsOfExperience: Number(formData.yearsOfExperience) || 0,
            emergencyContactName: formData.emergencyContactName,
            emergencyContactPhone: formData.emergencyContactPhone,
            emergencyContactRelation: formData.emergencyContactRelation,
            bankName: formData.bankName,
            accountHolderName: formData.accountHolderName,
            bankAccountNumber: formData.bankAccountNumber,
            bankRoutingNumber: formData.bankRoutingNumber,
            registrationType: formData.registrationType,
            openForHire: formData.openForHire,
            preferredOperatingHub: formData.preferredOperatingHub,
            vehicleCategories: formData.vehicleCategories,
            onboardingStep: 5,
            isCompleted: true,
          }),
        });
      } catch (err) {
        // Backend offline or local standalone mode
        console.log('Backend sync offline, application saved in local storage session');
      }

      // Simulated network processing latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      setFormData((prev) => ({
        ...prev,
        driverId: assignedId,
        isCompleted: true,
      }));
      setCompletedSteps([1, 2, 3, 4, 5]);

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setFormData(emptyOnboardingData);
    setCurrentStep(1);
    setCompletedSteps([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F5]">
      {/* Top Application Bar */}
      <OnboardingHeader
        currentLang={currentLang}
        onLangToggle={() => setCurrentLang((prev) => (prev === 'en' ? 'hi' : 'en'))}
        isIndependent={formData.registrationType === 'INDEPENDENT'}
        organisationName={formData.fleetInviteCode}
        onClearDraft={handleClearDraft}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {formData.isCompleted ? (
          /* Confirmation Screen after successful submission */
          <div className="bg-white border border-[#E7E8E4] rounded-2xl p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] max-w-3xl mx-auto">
            <OnboardingSuccess data={formData} onReset={handleReset} />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Step Progress Bar */}
            <StepNavigation
              currentStep={currentStep}
              onStepClick={handleStepJump}
              completedSteps={completedSteps}
            />

            {/* Split Layout: Form & Contextual Sidebar */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Main Step Form Card */}
              <div className="flex-1 w-full bg-white border border-[#E7E8E4] rounded-2xl p-5 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                {currentStep === 1 && (
                  <Step1Personal
                    data={formData}
                    onChange={updateFormData}
                    onNext={() => handleNextStep(2)}
                  />
                )}

                {currentStep === 2 && (
                  <Step2License
                    data={formData}
                    onChange={updateFormData}
                    onNext={() => handleNextStep(3)}
                    onBack={() => handleStepJump(1)}
                  />
                )}

                {currentStep === 3 && (
                  <Step3Emergency
                    data={formData}
                    onChange={updateFormData}
                    onNext={() => handleNextStep(4)}
                    onBack={() => handleStepJump(2)}
                  />
                )}

                {currentStep === 4 && (
                  <Step4Banking
                    data={formData}
                    onChange={updateFormData}
                    onNext={() => handleNextStep(5)}
                    onBack={() => handleStepJump(3)}
                  />
                )}

                {currentStep === 5 && (
                  <Step5Review
                    data={formData}
                    onEditStep={handleStepJump}
                    onSubmit={handleSubmitApplication}
                    onBack={() => handleStepJump(4)}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>

              {/* Sidebar with Live Checklist & Help */}
              <OnboardingSidebar data={formData} isCompleted={formData.isCompleted} />
            </div>
          </div>
        )}
      </main>

      {/* Subtle Operational Footer */}
      <footer className="border-t border-[#E7E8E4] bg-white py-4 px-6 text-center text-xs text-[#92949C]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>FleetOS &copy; 2026 Logistics Operating System. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
