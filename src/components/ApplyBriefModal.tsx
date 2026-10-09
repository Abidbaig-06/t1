'use client';

import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, DollarSign, Calendar, Upload } from 'lucide-react';
import { BrandBrief } from '@/lib/mockData';

interface ApplyBriefModalProps {
  brief: BrandBrief | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (briefTitle: string) => void;
}

export default function ApplyBriefModal({
  brief,
  isOpen,
  onClose,
  onSubmitApplication
}: ApplyBriefModalProps) {
  const [bidAmount, setBidAmount] = useState('2200');
  const [pitch, setPitch] = useState(
    'I specialize in luxury commercial AI films using Sora and Runway Gen-3 with professional DaVinci color grading. I have reviewed your requirements and can deliver initial cuts in 48 hours.'
  );

  if (!isOpen || !brief) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '540px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafbfc'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>{brief.brand}</span>
              {brief.verified && (
                <span className="badge-verified" style={{ fontSize: '9px', padding: '1px 5px' }}>
                  <CheckCircle2 size={9} /> Verified
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
              Apply to: {brief.title}
            </h3>
          </div>

          <button onClick={onClose} style={{ color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            padding: '10px 12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px'
          }}>
            <div>
              <span style={{ color: '#64748b' }}>Client Budget: </span>
              <strong style={{ color: '#059669' }}>{brief.budget}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Deadline: </span>
              <strong>{brief.deadline}</strong>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Your Proposed Fee ($ USD):
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <DollarSign size={14} color="#64748b" style={{ position: 'absolute', left: '8px' }} />
              <input
                type="text"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 8px 8px 24px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Your Proposal &amp; Technical Approach:
            </label>
            <textarea
              rows={4}
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                outline: 'none',
                resize: 'none',
                lineHeight: 1.4
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Attached Portfolio Proofs:
            </label>
            <div style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap'
            }}>
              <span style={{
                fontSize: '10px',
                backgroundColor: '#eef2ff',
                color: '#4f46e5',
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #c7d2fe',
                fontWeight: 600
              }}>
                ✓ Ethereal - Luxury Jewelry Film (Verified)
              </span>
              <span style={{
                fontSize: '10px',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontWeight: 600
              }}>
                ✓ Cyberpunk Haute Couture
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#fafbfc',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px'
        }}>
          <button onClick={onClose} style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmitApplication(brief.title);
              onClose();
            }}
            style={{
              backgroundColor: '#6366f1',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
            }}
          >
            Submit Application <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
