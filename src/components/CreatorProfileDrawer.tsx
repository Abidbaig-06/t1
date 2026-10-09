'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  CheckCircle2, 
  Video, 
  Bookmark, 
  Send, 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Play
} from 'lucide-react';
import { Creator } from '@/lib/mockData';

interface CreatorProfileDrawerProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
  onInvite: (creator: Creator) => void;
  onShortlist: (creatorId: string) => void;
  isShortlisted: boolean;
}

export default function CreatorProfileDrawer({
  creator,
  isOpen,
  onClose,
  onInvite,
  onShortlist,
  isShortlisted
}: CreatorProfileDrawerProps) {
  const [activeTab, setActiveTab] = useState<'Portfolio' | 'About' | 'Workflow' | 'Reviews'>('Portfolio');

  if (!isOpen || !creator) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 105,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Profile Banner */}
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
          color: '#ffffff',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #818cf8' }}>
              <Image src={creator.avatar} alt={creator.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800 }}>{creator.name}</h3>
                {creator.verified ? (
                  <span style={{
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <CheckCircle2 size={11} /> Verified
                  </span>
                ) : (
                  <span style={{
                    backgroundColor: '#fffbeb',
                    color: '#d97706',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}>
                    Verification Pending
                  </span>
                )}
              </div>
              <p style={{ fontSize: '12px', color: '#c7d2fe', marginTop: '2px' }}>
                {creator.role}
              </p>
              <p style={{ fontSize: '11px', color: '#a5b4fc', marginTop: '1px' }}>
                📍 {creator.location} • ⏱️ {creator.experience}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#ffffff'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 20px',
          backgroundColor: '#fafbfc'
        }}>
          {(['Portfolio', 'About', 'Workflow', 'Reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#6366f1' : '#64748b',
                borderBottom: activeTab === tab ? '2px solid #6366f1' : '2px solid transparent'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'Portfolio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Featured Card */}
              <div style={{
                position: 'relative',
                height: '240px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#0a0f1d'
              }}>
                <Image src={creator.works[0].thumbnail} alt={creator.works[0].title} fill style={{ objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6366f1',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
                  }}>
                    <Play size={20} fill="#6366f1" />
                  </div>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    {creator.works[0].title}
                  </span>
                  <span style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    Commercial Rights Verified ✓
                  </span>
                </div>
              </div>

              {/* Other Works Thumbnails */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  All Portfolio Pieces
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {creator.works.map((w) => (
                    <div key={w.id} style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#f8fafc'
                    }}>
                      <div style={{ position: 'relative', height: '90px' }}>
                        <Image src={w.thumbnail} alt={w.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '6px 8px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>{w.title}</div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>{w.tag}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'About' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
                {creator.about}
              </p>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <h5 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Verified Creative Skills:</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {creator.skills?.map((s, idx) => (
                      <span key={idx} style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', fontWeight: 600 }}>
                        ⚡ {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Mastered AI Stack &amp; Tools:</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {creator.tools.map((t, idx) => (
                      <span key={idx} className="badge-tag" style={{ fontSize: '11px', padding: '4px 8px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Workflow' && (
            <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h5 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Production Pipeline &amp; Turnaround:</h5>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                {creator.workflow}
              </p>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>★ {creator.rating}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>({creator.reviewsCount} verified brand client reviews)</span>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#334155' }}>
                &ldquo;Outstanding AI generation quality and prompt engineering. The jewelry reflections matched our exact brand lookbook.&rdquo; — LuxeLabel Creative Director
              </div>
            </div>
          )}

          {/* Pricing & Response Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            backgroundColor: '#f8fafc',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b' }}>Starting Project Rate</span>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>${creator.startingPrice}</div>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b' }}>Availability</span>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>{creator.availability}</div>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b' }}>Avg. Response Time</span>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{creator.responseTime}</div>
            </div>
          </div>

          {/* Trust Verification Signals */}
          <div style={{
            backgroundColor: '#f0fdf4',
            borderRadius: '10px',
            border: '1px solid #bbf7d0',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
              Verified CreatorProof Badges
            </span>
            {creator.badges.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#15803d' }}>
                <CheckCircle2 size={13} color="#16a34a" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#fafbfc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={() => onShortlist(creator.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: isShortlisted ? '1px solid #818cf8' : '1px solid #cbd5e1',
              backgroundColor: isShortlisted ? '#eef2ff' : '#ffffff',
              color: isShortlisted ? '#4f46e5' : '#475569',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <Bookmark size={14} fill={isShortlisted ? '#4f46e5' : 'none'} />
            {isShortlisted ? 'Shortlisted' : 'Shortlist Creator'}
          </button>

          <button
            onClick={() => {
              onClose();
              onInvite(creator);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 20px',
              borderRadius: '8px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
          >
            <Send size={14} />
            Invite to Project
          </button>
        </div>
      </div>
    </div>
  );
}
