'use client';

import React, { useState } from 'react';
import { X, UploadCloud, Plus, CheckCircle2, Film, Sparkles } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (projectTitle: string) => void;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  onSuccess
}: AddProjectModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Videos');
  const [tools, setTools] = useState('Sora, Runway Gen-3');
  const [commercialReady, setCommercialReady] = useState(true);

  if (!isOpen) return null;

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#eef2ff',
              color: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UploadCloud size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                Add New Portfolio Project
              </h3>
              <p style={{ fontSize: '11px', color: '#64748b' }}>
                Publish verified work to your CreatorProof showcase
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
              Project Title:
            </label>
            <input
              type="text"
              placeholder="e.g. Neo-Tokyo Commercial Teaser"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="Videos">Videos</option>
                <option value="Images">Images</option>
                <option value="Animations">Animations</option>
                <option value="Graphics">Graphics</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                AI Tools &amp; Models Used:
              </label>
              <input
                type="text"
                placeholder="e.g. Sora, Runway, Midjourney"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Upload Area */}
          <div style={{
            border: '2px dashed #cbd5e1',
            borderRadius: '10px',
            padding: '24px',
            textAlign: 'center',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#eef2ff',
              color: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UploadCloud size={20} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                Drag and drop 4K MP4, ProRes, or PNG/EXR
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                Up to 2GB • Automated provenance hash &amp; copyright check
              </div>
            </div>
          </div>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#334155',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={commercialReady}
              onChange={(e) => setCommercialReady(e.target.checked)}
              style={{ accentColor: '#10b981' }}
            />
            <span>Certify commercial ownership and rights for brand usage</span>
          </label>
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
              onSuccess(title || 'New AI Film Showcase');
              onClose();
            }}
            style={{
              backgroundColor: '#7c3aed',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
            }}
          >
            Publish to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
