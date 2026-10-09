'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Send, ShieldCheck, CheckCircle2, DollarSign, Calendar } from 'lucide-react';
import { Creator } from '@/lib/mockData';

interface InviteModalProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (creatorName: string) => void;
}

export default function InviteModal({
  creator,
  isOpen,
  onClose,
  onSendInvite
}: InviteModalProps) {
  const [budget, setBudget] = useState('2200');
  const [timeline, setTimeline] = useState('5 days');
  const [message, setMessage] = useState(
    'Hi Ava, we love your luxury jewelry portfolio pieces! We would love to hire you to direct a 30-second Sora/Runway commercial for LuxeLabel.'
  );

  if (!isOpen || !creator) return null;

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
        maxWidth: '520px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
              <Image src={creator.avatar} alt={creator.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                  Invite {creator.name}
                </h3>
                {creator.verified && <CheckCircle2 size={13} color="#10b981" />}
              </div>
              <p style={{ fontSize: '11px', color: '#64748b' }}>
                {creator.role} • Starting at ${creator.startingPrice}
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Campaign / Project Brief:
            </label>
            <div style={{
              padding: '8px 12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#0f172a'
            }}>
              LuxeLabel — 30-Second Luxury Jewelry Advertisement
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Escrow Budget ($ USD):
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <DollarSign size={14} color="#64748b" style={{ position: 'absolute', left: '8px' }} />
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
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
                Delivery Timeline:
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Calendar size={14} color="#64748b" style={{ position: 'absolute', left: '8px' }} />
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
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
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Personalized Message &amp; Collaboration Details:
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <div style={{
            padding: '10px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #bbf7d0',
            fontSize: '11px',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} color="#16a34a" />
            <span>Funds held in smart escrow until 100% satisfactory commercial delivery.</span>
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
              onSendInvite(creator.name);
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
            Send Project Invitation <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
