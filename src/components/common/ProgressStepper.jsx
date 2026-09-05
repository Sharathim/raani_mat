import React from 'react';
import { FORM_STEPS } from '../../utils/constants';
import {
  User,
  Users,
  Sparkles,
  GraduationCap,
  Camera,
  HeartHandshake,
  CheckCircle2,
  Check
} from 'lucide-react';

const ICON_MAP = {
  User,
  Users,
  Sparkles,
  GraduationCap,
  Camera,
  HeartHandshake,
  CheckCircle2
};

export function ProgressStepper({ currentStep, onStepClick, completedSteps = [] }) {
  return (
    <div
      style={{
        background: 'var(--cream)',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Desktop Stepper */}
      <div className="stepper-desktop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {/* Progress Line Behind Circles */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '30px',
            right: '30px',
            height: '3px',
            backgroundColor: 'var(--line)',
            zIndex: 1
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundColor: 'var(--maroon-700)',
              transition: 'width 0.35s ease',
              width: `${((currentStep - 1) / (FORM_STEPS.length - 1)) * 100}%`
            }}
          />
        </div>

        {FORM_STEPS.map((step) => {
          const StepIcon = ICON_MAP[step.icon] || User;
          const isCurrent = step.id === currentStep;
          const isCompleted = step.id < currentStep || completedSteps.includes(step.id);
          const isClickable = step.id <= currentStep || isCompleted;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isClickable && onStepClick && onStepClick(step.id)}
              disabled={!isClickable}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: isClickable ? 'pointer' : 'default',
                zIndex: 2,
                position: 'relative',
                padding: '0 0.25rem',
                maxWidth: '120px',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.25s ease',
                  backgroundColor: isCurrent
                    ? 'var(--maroon-900)'
                    : isCompleted
                    ? 'var(--success)'
                    : 'var(--paper)',
                  color: isCurrent || isCompleted ? '#ffffff' : 'var(--muted)',
                  border: isCurrent
                    ? '2.5px solid var(--gold-500)'
                    : isCompleted
                    ? '2px solid var(--success-border)'
                    : '2px solid var(--line)',
                  boxShadow: isCurrent ? 'var(--shadow-gold)' : 'none'
                }}
              >
                {isCompleted ? <Check size={20} strokeWidth={2.5} /> : <StepIcon size={18} />}
              </div>

              <div style={{ lineHeight: 1.1 }}>
                <div
                  className="font-tamil-sans"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? 'var(--maroon-950)' : isCompleted ? 'var(--maroon-800)' : 'var(--muted)'
                  }}
                >
                  {step.titleTa}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: isCurrent ? 'var(--maroon-700)' : 'var(--muted-light)',
                    marginTop: '2px'
                  }}
                >
                  {step.titleEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Stepper Header */}
      <div className="stepper-mobile" style={{ display: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--maroon-900)',
                color: 'var(--gold-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: '1.5px solid var(--gold-500)'
              }}
            >
              {currentStep}
            </span>
            <div>
              <div className="font-tamil-sans" style={{ fontWeight: 700, color: 'var(--maroon-900)', fontSize: '0.95rem' }}>
                {FORM_STEPS[currentStep - 1]?.titleTa}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                {FORM_STEPS[currentStep - 1]?.titleEn}
              </div>
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--maroon-700)', background: 'var(--paper)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)' }}>
            படி {currentStep} / {FORM_STEPS.length}
          </span>
        </div>

        {/* Mobile Progress Bar */}
        <div style={{ height: '6px', backgroundColor: 'var(--line)', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              backgroundColor: 'var(--maroon-800)',
              transition: 'width 0.3s ease',
              width: `${(currentStep / FORM_STEPS.length) * 100}%`
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .stepper-desktop {
            display: none !important;
          }
          .stepper-mobile {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
