import React from "react";
import { Check, Building2, Layout, Palette, FileText, Globe, Sparkles, CheckCircle2 } from "lucide-react";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  maxVisitedStep: number;
}

export const STEPS_CONFIG = [
  { id: 1, label: "Business", short: "Business", icon: Building2 },
  { id: 2, label: "Website", short: "Website", icon: Layout },
  { id: 3, label: "Design", short: "Design", icon: Palette },
  { id: 4, label: "Content", short: "Content", icon: FileText },
  { id: 5, label: "Domain", short: "Domain", icon: Globe },
  { id: 6, label: "Final Details", short: "Details", icon: Sparkles },
  { id: 7, label: "Review", short: "Review", icon: CheckCircle2 },
];

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  totalSteps = 7,
  onStepClick,
  maxVisitedStep,
}) => {
  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full pb-6 mb-8 border-b border-neutral-100">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Step {currentStep} of {totalSteps}
          </span>
          <h2 className="text-base font-bold text-neutral-900">
            {STEPS_CONFIG[currentStep - 1]?.label}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-neutral-500">{progressPercent}% Completed</span>
          <div className="w-20 sm:w-28 bg-neutral-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Dots & Line */}
      <div className="relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-neutral-200 -z-0" />
        
        {/* Active progress fill */}
        <div
          className="absolute top-1/2 left-4 -translate-y-1/2 h-0.5 bg-blue-600 transition-all duration-300 ease-out -z-0"
          style={{
            width: `calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - 2rem)`,
          }}
        />

        {/* Step Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {STEPS_CONFIG.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isClickable = step.id <= maxVisitedStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={`group flex flex-col items-center focus:outline-hidden ${
                  isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2 ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                      : isCurrent
                      ? "bg-white border-blue-600 text-blue-600 ring-4 ring-blue-100"
                      : "bg-white border-neutral-300 text-neutral-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                <span
                  className={`mt-1.5 text-[11px] font-medium hidden sm:block transition-colors ${
                    isCurrent
                      ? "text-blue-600 font-semibold"
                      : isCompleted
                      ? "text-neutral-700"
                      : "text-neutral-400"
                  }`}
                >
                  {step.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
