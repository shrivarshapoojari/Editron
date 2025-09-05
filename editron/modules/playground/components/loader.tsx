import { Loader2 } from "lucide-react";

interface LoadingStepProps {
  currentStep: number;
  step: number;
  label: string;
}

const LoadingStep: React.FC<LoadingStepProps> = ({
  currentStep,
  step,
  label,
}) => (
  <div className="flex items-center gap-3 mb-4">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
        currentStep === step
          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50"
          : currentStep > step
          ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50"
          : "bg-gray-800/50 border border-gray-600/50"
      }`}
    >
      {currentStep > step ? (
        <svg
          className="h-4 w-4 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : currentStep === step ? (
        <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
      ) : (
        <div className="h-3 w-3 rounded-full bg-gray-600" />
      )}
    </div>
    <span
      className={`text-sm transition-colors duration-300 ${
        currentStep === step
          ? "text-cyan-400 font-medium"
          : currentStep > step
          ? "text-green-400 font-medium"
          : "text-gray-500"
      }`}
    >
      {label}
    </span>
  </div>
);

export default LoadingStep;