'use client';

import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  User, 
  ArrowRight, 
  RotateCcw,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { useMarketplace } from '@/lib/marketplaceContext';

interface DemoRunnerBarProps {
  onStepSelect: (stepNumber: number) => void;
  currentStep: number;
}

export default function DemoRunnerBar({
  onStepSelect,
  currentStep
}: DemoRunnerBarProps) {
  const { switchDemoRole, currentUser } = useMarketplace();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const steps = [
    { num: 1, title: 'Brand Sign-in', desc: 'LuxeLabel active', role: 'brand' as const },
    { num: 2, title: 'AI Brief Created', desc: '30s Jewelry Ad', role: 'brand' as const },
    { num: 3, title: 'Creator Discovery', desc: 'Sora/Runway filtered', role: 'brand' as const },
    { num: 4, title: 'Portfolio & Invite', desc: 'Invited Ava Chen', role: 'brand' as const },
    { num: 5, title: 'Creator Sign-in', desc: 'Ava Chen active', role: 'creator' as const },
    { num: 6, title: 'Accept Invite', desc: 'Workspace started', role: 'creator' as const },
    { num: 7, title: 'Delivered Master', desc: 'Commercial license', role: 'brand' as const },
  ];

  if (isCollapsed) {
    return (
      <div style={{
        backgroundColor: '#0f172a',
        padding: '6px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#10b981'
          }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>
            Interactive Campaign Tour (Step {currentStep}/7)
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#cbd5e1',
            borderRadius: '4px',
            padding: '3px 8px',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          <ChevronDown size={12} /> Show Step-by-Step Guide
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#ffffff',
      padding: '8px 24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      fontSize: '12px'
    }}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '22px',
          height: '22px',
          borderRadius: '6px',
          backgroundColor: '#4f46e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff'
        }}>
          <Sparkles size={12} />
        </div>
        <div>
          <span style={{ fontWeight: 700, color: '#f8fafc', letterSpacing: '0.2px', fontSize: '12px' }}>
            Interactive Jewelry Campaign Tour:
          </span>
          <span style={{ color: '#94a3b8', marginLeft: '6px', fontSize: '11px' }}>
            (Follow steps 1–7 to experience complete end-to-end flow)
          </span>
        </div>
      </div>

      {/* Stepper Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {steps.map((st) => {
          const isActive = currentStep === st.num;
          const isPassed = currentStep > st.num;
          return (
            <button
              key={st.num}
              onClick={() => {
                onStepSelect(st.num);
                switchDemoRole(st.role);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? '#4f46e5' : isPassed ? 'rgba(79, 70, 229, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                color: isActive ? '#ffffff' : isPassed ? '#c7d2fe' : '#94a3b8',
                border: isActive ? '1px solid #818cf8' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#ffffff' : isPassed ? '#10b981' : 'rgba(255,255,255,0.15)',
                color: isActive ? '#4f46e5' : '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 800
              }}>
                {isPassed ? '✓' : st.num}
              </span>
              <span>{st.title}</span>
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => setIsCollapsed(true)}
          title="Minimize tour bar"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94a3b8',
            borderRadius: '4px',
            padding: '3px 8px',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          <ChevronUp size={12} /> Hide
        </button>
      </div>
    </div>
  );
}
