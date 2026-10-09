'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  Send, 
  FileText, 
  Users, 
  Play, 
  Download, 
  ShieldCheck, 
  Award,
  Clock,
  RotateCcw
} from 'lucide-react';

interface DemoScenarioSectionProps {
  onOpenBriefBuilder: () => void;
  onInviteAva: () => void;
}

export default function DemoScenarioSection({
  onOpenBriefBuilder,
  onInviteAva
}: DemoScenarioSectionProps) {
  const [currentStep, setCurrentStep] = useState<number>(5);
  const [invited, setInvited] = useState<boolean>(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Banner */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#fafbfc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #7a050e, #c79c5e)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(122, 5, 14, 0.3)'
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: '15px', color: '#1f1610' }}>
              Jewelry Campaign Lifecycle — From Brief to Delivered Project
            </span>
            <span style={{ fontSize: '12px', color: '#6b5e52', marginLeft: '8px' }}>
              Interactive End-to-End Workflow Demonstration
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setCurrentStep((prev) => (prev % 5) + 1)}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#6366f1',
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#eef2ff',
              border: '1px solid #c7d2fe',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RotateCcw size={11} /> Simulate Next Step (Step {currentStep}/5)
          </button>
        </div>
      </div>

      {/* 5-Step Pipeline Grid */}
      <div style={{
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.9fr 0.9fr 1fr 1.2fr 0.85fr',
        gap: '14px',
        alignItems: 'stretch',
        backgroundColor: '#fbfcfe',
        overflowX: 'auto'
      }}>
        {/* Step 1: Brand creates a brief */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: currentStep >= 1 ? '1px solid #818cf8' : '1px solid #e2e8f0',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>1</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>
                Brand creates a brief
              </span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>
              Using natural language + AI assistance
            </div>

            {/* Prompt Quote Bubble */}
            <div style={{
              margin: '8px 0',
              padding: '8px',
              backgroundColor: '#f1f5f9',
              borderRadius: '8px',
              fontSize: '10px',
              color: '#334155',
              fontStyle: 'italic',
              borderLeft: '3px solid #6366f1'
            }}>
              &ldquo;I own a jewellery brand and need a 30-second luxury AI advertisement for Instagram.&rdquo;
            </div>

            {/* AI-Assisted Output Card */}
            <div style={{
              backgroundColor: '#f5f3ff',
              border: '1px solid #ddd6fe',
              borderRadius: '8px',
              padding: '8px',
              fontSize: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#7c3aed', fontWeight: 800, marginBottom: '4px' }}>
                <Sparkles size={11} /> AI-Assisted Brief Builder
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', color: '#4c1d95', fontSize: '9px' }}>
                <div><strong>Brand:</strong> LuxeLabel (Jewelry)</div>
                <div><strong>Duration:</strong> 30 seconds</div>
                <div><strong>Style:</strong> Luxury, elegant, cinematic</div>
                <div><strong>Platform:</strong> Instagram (9:16)</div>
                <div><strong>Budget:</strong> $1,500 – $3,000</div>
                <div><strong>Commercial Use:</strong> Yes ✓</div>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenBriefBuilder}
            style={{
              padding: '5px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 700,
              textAlign: 'center'
            }}
          >
            Launch Interactive Builder →
          </button>
        </div>

        {/* Step 2: Find the right creators */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: currentStep >= 2 ? '1px solid #818cf8' : '1px solid #e2e8f0',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>2</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>
                Find creators
              </span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>
              Using filters &amp; AI recommendations
            </div>

            {/* Creator Match Avatars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { name: 'Ava Chen', img: '/assets/ava.jpg', score: '98% match', color: '#10b981' },
                { name: 'Rohan Mehta', img: '/assets/rohan.jpg', score: '92% match', color: '#6366f1' },
                { name: 'Maya Singh', img: '/assets/maya.jpg', score: '88% match', color: '#8b5cf6' },
              ].map((rec, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ position: 'relative', width: '22px', height: '22px', borderRadius: '50%', overflow: 'hidden' }}>
                      <Image src={rec.img} alt={rec.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a' }}>{rec.name}</span>
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: rec.color }}>
                    {rec.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 700, textAlign: 'center' }}>
            ✓ Top Match Identified (Ava Chen)
          </div>
        </div>

        {/* Step 3: View portfolio & invite */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: currentStep >= 3 ? '1px solid #818cf8' : '1px solid #e2e8f0',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>3</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>
                View &amp; invite
              </span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>
              Review work and send an invitation
            </div>

            {/* Video Preview */}
            <div style={{
              position: 'relative',
              height: '75px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#0a0f1d'
            }}>
              <Image src="/assets/ring.jpg" alt="Ring" fill style={{ objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6366f1'
                }}>
                  <Play size={10} fill="#6366f1" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              style={{
                padding: '4px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 600,
                color: '#475569'
              }}
            >
              Shortlist
            </button>
            <button
              onClick={() => {
                setInvited(true);
                onInviteAva();
              }}
              style={{
                padding: '5px',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 700,
                boxShadow: '0 2px 6px rgba(99,102,241,0.3)'
              }}
            >
              {invited ? '✓ Invited to Project' : 'Invite to Project'}
            </button>
          </div>
        </div>

        {/* Step 4: Creator accepts and collaborates */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: currentStep >= 4 ? '1px solid #818cf8' : '1px solid #e2e8f0',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>4</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>
                Collaborates
              </span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>
              Real-time project workspace
            </div>

            {/* Chat Bubble simulation */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ position: 'relative', width: '20px', height: '20px', borderRadius: '50%', overflow: 'hidden' }}>
                  <Image src="/assets/ava.jpg" alt="Ava" fill style={{ objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a' }}>Ava Chen</span>
                <span style={{ fontSize: '8px', color: '#10b981', fontWeight: 700 }}>Online</span>
              </div>
              <div style={{
                backgroundColor: '#eef2ff',
                color: '#312e81',
                padding: '6px 8px',
                borderRadius: '6px',
                fontSize: '9px',
                lineHeight: 1.3
              }}>
                &ldquo;Accepted your invitation! Excited to work on this jewelry project! 🚀 Starting Sora renders today.&rdquo;
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            color: '#059669',
            fontSize: '9px',
            fontWeight: 700
          }}>
            <CheckCircle2 size={11} /> Escrow Funded ($2,200)
          </div>
        </div>

        {/* Step 5: Track progress to delivery */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: currentStep >= 5 ? '1px solid #10b981' : '1px solid #e2e8f0',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>5</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>
                Track progress
              </span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '6px' }}>
              Revisions and final verified delivery
            </div>

            {/* Stepper Timeline */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 4px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              marginBottom: '6px'
            }}>
              {[
                { label: 'Brief', done: true },
                { label: 'In Progress', done: true },
                { label: 'Revision', done: true },
                { label: 'Delivered', done: true, highlight: true }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: step.highlight ? '#10b981' : '#3b82f6',
                    color: '#ffffff',
                    fontSize: '8px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: step.highlight ? '#059669' : '#334155' }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Final Delivered Asset Preview */}
            <div style={{
              position: 'relative',
              height: '50px',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid #10b981'
            }}>
              <Image src="/assets/ring.jpg" alt="Delivered" fill style={{ objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 8px',
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: 700
              }}>
                <span>LuxeLabel_Master_4K.mp4</span>
                <span style={{ backgroundColor: '#10b981', padding: '1px 5px', borderRadius: '4px', fontSize: '8px' }}>
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '9px',
            color: '#059669',
            fontWeight: 700
          }}>
            <span>Commercial Rights Transferred</span>
            <Download size={11} />
          </div>
        </div>

        {/* Right Callout Banner matching diagram */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          borderRadius: '12px',
          padding: '14px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '10px',
          boxShadow: '0 4px 14px rgba(30, 27, 75, 0.4)'
        }}>
          <div>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <Award size={16} color="#fbbf24" />
            </div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.2px' }}>
              A complete end-to-end marketplace for the AI era.
            </h4>
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#c7d2fe', letterSpacing: '-0.3px' }}>
              CreatorProof <span style={{ color: '#818cf8' }}>AI</span>
            </div>
            <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px' }}>
              Create • Collaborate • Commercialize
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
