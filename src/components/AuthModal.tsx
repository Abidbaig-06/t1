'use client';

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Briefcase, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { useMarketplace } from '@/lib/marketplaceContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  defaultRole?: 'brand' | 'creator';
  onSuccessRedirect?: (role: 'brand' | 'creator') => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultMode = 'login',
  defaultRole = 'brand',
  onSuccessRedirect
}: AuthModalProps) {
  const { login } = useMarketplace();
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [role, setRole] = useState<'brand' | 'creator'>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid business email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    login(role, email, name || (role === 'brand' ? 'Elena Vance' : 'Ava Chen'));
    setError(null);
    onClose();
    if (onSuccessRedirect) {
      onSuccessRedirect(role);
    }
  };

  const handleQuickDemoFill = (selectedRole: 'brand' | 'creator') => {
    setRole(selectedRole);
    if (selectedRole === 'brand') {
      setEmail('elena@luxelabel.com');
      setName('Elena Vance');
      setPassword('brandSecret123');
    } else {
      setEmail('ava@creatorproof.ai');
      setName('Ava Chen');
      setPassword('creatorSecret123');
    }
    setError(null);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 120,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '480px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        border: '1px solid #e2e8f0',
        animation: 'fadeIn 0.25s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '13px'
              }}>
                CP
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
                {mode === 'login' ? 'Welcome Back' : 'Join CreatorProof AI'}
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              ByteXL HackXlarate 2026 • Kampus.VC Challenge
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: '#f1f5f9',
              color: '#64748b'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Role Selector Tabs */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
              Select Account Role:
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              backgroundColor: '#f1f5f9',
              padding: '4px',
              borderRadius: '10px'
            }}>
              <button
                type="button"
                onClick={() => setRole('brand')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: role === 'brand' ? '#ffffff' : 'transparent',
                  color: role === 'brand' ? '#0f172a' : '#64748b',
                  boxShadow: role === 'brand' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Briefcase size={14} color={role === 'brand' ? '#4f46e5' : '#64748b'} />
                <span>Brand / Agency</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('creator')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: role === 'creator' ? '#ffffff' : 'transparent',
                  color: role === 'creator' ? '#4c1d95' : '#64748b',
                  boxShadow: role === 'creator' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Sparkles size={14} color={role === 'creator' ? '#7c3aed' : '#64748b'} />
                <span>AI Creator</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Pre-fill Pill for Hackathon Evaluators */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: '#f5f3ff',
            border: '1px solid #ddd6fe'
          }}>
            <span style={{ fontSize: '11px', color: '#6d28d9', fontWeight: 600 }}>⚡ Hackathon Demo Pre-fill:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('brand')}
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#6366f1',
                  color: '#ffffff'
                }}
              >
                LuxeLabel Brand
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('creator')}
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#7c3aed',
                  color: '#ffffff'
                }}
              >
                Ava Chen Creator
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  {role === 'brand' ? 'Contact / Representative Name:' : 'Creator Full Name:'}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px' }} />
                  <input
                    type="text"
                    required
                    placeholder={role === 'brand' ? 'e.g. Elena Vance' : 'e.g. Ava Chen'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 32px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Email Address:
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px' }} />
                <input
                  type="email"
                  required
                  placeholder={role === 'brand' ? 'name@company.com' : 'creator@studio.ai'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 32px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Password:
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 34px 9px 32px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: '#fef2f2',
                color: '#b91c1c',
                fontSize: '11px',
                fontWeight: 600
              }}>
                {error}
              </div>
            )}

            {/* Verification Notice Requirement: "Do not represent regular signup as proof that a business is legitimate." */}
            {mode === 'signup' && (
              <div style={{
                padding: '8px 10px',
                borderRadius: '6px',
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                fontSize: '10px',
                color: '#92400e',
                lineHeight: 1.3
              }}>
                ℹ️ Standard signup creates an unverified account. Brand legitimacy &amp; creator skills require separate CreatorProof KYC verification.
              </div>
            )}

            <button
              type="submit"
              style={{
                marginTop: '4px',
                padding: '10px',
                backgroundColor: role === 'brand' ? '#1e1b4b' : '#6366f1',
                color: '#ffffff',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
                transition: 'all 0.2s'
              }}
            >
              {mode === 'login' ? `Sign In to ${role === 'brand' ? 'Brand' : 'Creator'} Portal` : `Create ${role === 'brand' ? 'Brand' : 'Creator'} Account`}
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Toggle Login / Signup */}
          <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  style={{ color: '#6366f1', fontWeight: 700 }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  style={{ color: '#6366f1', fontWeight: 700 }}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
