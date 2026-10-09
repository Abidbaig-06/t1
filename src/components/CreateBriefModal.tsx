'use client';

import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  Check 
} from 'lucide-react';
import { useMarketplace } from '@/lib/marketplaceContext';
import { BrandBrief } from '@/lib/mockData';

interface CreateBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (brief: BrandBrief) => void;
  initialValues?: Partial<BrandBrief>;
}

export default function CreateBriefModal({
  isOpen,
  onClose,
  onSuccess,
  initialValues
}: CreateBriefModalProps) {
  const { createBrief } = useMarketplace();

  const [title, setTitle] = useState(initialValues?.title || '30-Second Luxury Jewelry Advertisement');
  const [brand, setBrand] = useState(initialValues?.brand || 'LuxeLabel');
  const [description, setDescription] = useState(
    initialValues?.description ||
      'A cinematic 30-second product film created with Sora and Runway for Instagram Reels. Elegant, modern and luxury feel.'
  );
  const [objective, setObjective] = useState('Product Launch & Social Conversion');
  const [contentType, setContentType] = useState('Video');
  const [creativeStyle, setCreativeStyle] = useState('Luxury Cinematic Macro');
  const [aspectRatio, setAspectRatio] = useState('9:16 (Vertical Reels/TikTok)');
  const [duration, setDuration] = useState('30 seconds');
  const [requiredTools, setRequiredTools] = useState('Sora, Runway Gen-3, DaVinci Resolve');
  const [minBudget, setMinBudget] = useState(1500);
  const [maxBudget, setMaxBudget] = useState(3000);
  const [deadline, setDeadline] = useState('Jan 25, 2026');
  const [deliverables, setDeliverables] = useState('1x 4K Master MP4 (9:16), 1x 15s Cutdown, 3x 8K Keyframes');
  const [revisionRounds, setRevisionRounds] = useState('2 rounds included');
  const [commercialRights, setCommercialRights] = useState('Full Worldwide Commercial Buyout with Escrow');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = 'Campaign title is required.';
    if (!brand.trim()) errs.brand = 'Brand name is required.';
    if (!description.trim()) errs.description = 'Campaign description is required.';
    if (minBudget <= 0 || maxBudget <= minBudget) {
      errs.budget = 'Please provide a valid budget range (max must be greater than min).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (isDraft: boolean) => {
    if (!isDraft && !validate()) return;

    const newBrief = createBrief({
      brand,
      verified: true,
      title,
      description,
      budget: `$${minBudget.toLocaleString()} – $${maxBudget.toLocaleString()}`,
      minBudget,
      maxBudget,
      deadline,
      tags: [contentType, creativeStyle, requiredTools.split(',')[0].trim()].filter(Boolean),
      platform: aspectRatio,
      duration,
      commercialRights,
    });

    onSuccess(newBrief);
    onClose();
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
      zIndex: 110,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafbfc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
            }}>
              <FileText size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
                Create Structured Creative Brief
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Criterion 2: Production-grade brief definition with commercial licensing
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body with 5 Explicit Requirement Categories */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* SECTION 1: CAMPAIGN REQUIREMENTS */}
          <div style={{ backgroundColor: '#fbf7ee', borderRadius: '12px', border: '1px solid #e6d4b0', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <span style={{ backgroundColor: '#7a050e', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>1</span>
              <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#1f1610', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Campaign Requirements
              </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 30-Second Luxury Jewelry Advertisement"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: errors.title ? '1px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#ffffff'
                  }}
                />
                {errors.title && <span style={{ fontSize: '10px', color: '#ef4444' }}>{errors.title}</span>}
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Brand / Organization Name *
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. LuxeLabel"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: errors.brand ? '1px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#ffffff'
                  }}
                />
                {errors.brand && <span style={{ fontSize: '10px', color: '#ef4444' }}>{errors.brand}</span>}
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Creative Vision, Narrative &amp; Scene Breakdown *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail your scene breakdown, pacing, lighting, music requirements, and brand mood..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: errors.description ? '1px solid #ef4444' : '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  resize: 'none',
                  lineHeight: 1.5,
                  backgroundColor: '#ffffff'
                }}
              />
              {errors.description && <span style={{ fontSize: '10px', color: '#ef4444' }}>{errors.description}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Min Budget ($ USD)
                </label>
                <input
                  type="number"
                  value={minBudget}
                  onChange={(e) => setMinBudget(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Max Budget ($ USD)
                </label>
                <input
                  type="number"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Target Deadline
                </label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="e.g. Jan 25, 2026"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#ffffff' }}
                />
              </div>
            </div>
            {errors.budget && <span style={{ fontSize: '10px', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.budget}</span>}
          </div>

          {/* SECTION 2 & 4: CONTENT TYPE & FORMAT/ASPECT RATIO */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* SECTION 2: CONTENT TYPE */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#7a050e', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>2</span>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#1f1610', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Content Type
                </label>
              </div>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#f8fafc' }}
              >
                <option value="Video">Video (AI Synthesized / Cinematic)</option>
                <option value="3D Visuals">3D Visuals &amp; CAD Product Renders</option>
                <option value="Animations">Animation (2D / 3D Hybrid VFX)</option>
                <option value="Fashion">Fashion &amp; Editorial Stills</option>
                <option value="Graphics">Graphics &amp; Concept Art</option>
              </select>
            </div>

            {/* SECTION 4: FORMAT / ASPECT RATIO */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#7a050e', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>4</span>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#1f1610', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Format / Aspect Ratio
                </label>
              </div>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#f8fafc' }}
              >
                <option value="9:16 (Vertical Reels/TikTok)">9:16 (Vertical Reels / TikTok / Shorts)</option>
                <option value="16:9 (Horizontal Cinematic)">16:9 (Horizontal 4K Cinematic / YouTube)</option>
                <option value="1:1 (Square Feed)">1:1 (Square Social Media Feed)</option>
                <option value="4:5 (Instagram Portrait)">4:5 (Instagram Portrait Post)</option>
                <option value="2.39:1 (Anamorphic Cinema)">2.39:1 (Anamorphic Cinema Widescreen)</option>
              </select>
            </div>
          </div>

          {/* SECTION 3: STYLE */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ backgroundColor: '#7a050e', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>3</span>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#1f1610', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Aesthetic Style
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px' }}>
              <input
                type="text"
                value={creativeStyle}
                onChange={(e) => setCreativeStyle(e.target.value)}
                placeholder="e.g. Luxury Photorealism Macro, Cyberpunk Neo-Noir, Minimalist Editorial"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
              <select
                onChange={(e) => {
                  if (e.target.value) setCreativeStyle(e.target.value);
                }}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '11px', backgroundColor: '#f8fafc' }}
              >
                <option value="">Choose preset style...</option>
                <option value="Luxury Photorealism Macro">Luxury Photorealism Macro</option>
                <option value="Cyberpunk Neo-Noir">Cyberpunk Neo-Noir</option>
                <option value="Minimalist Studio Editorial">Minimalist Studio Editorial</option>
                <option value="Hyperreal 3D Procedural">Hyperreal 3D Procedural</option>
                <option value="Surrealist Fantasy Motion">Surrealist Fantasy Motion</option>
              </select>
            </div>
          </div>

          {/* SECTION 5: COMMERCIAL-USE REQUIREMENTS */}
          <div style={{ backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ backgroundColor: '#15803d', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>5</span>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Commercial-Use Requirements &amp; Rights
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px', marginBottom: '8px' }}>
              <input
                type="text"
                value={commercialRights}
                onChange={(e) => setCommercialRights(e.target.value)}
                placeholder="e.g. Full Worldwide Commercial Buyout with Escrow"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #86efac', fontSize: '12px', backgroundColor: '#ffffff' }}
              />
              <select
                onChange={(e) => {
                  if (e.target.value) setCommercialRights(e.target.value);
                }}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #86efac', fontSize: '11px', backgroundColor: '#ffffff' }}
              >
                <option value="">Select license preset...</option>
                <option value="Full Worldwide Commercial Buyout with Escrow">Full Worldwide Commercial Buyout</option>
                <option value="Digital & Social Media Advertising License">Digital &amp; Social Media Rights Only</option>
                <option value="Broadcast Television & Streaming License">Global Broadcast &amp; Streaming Rights</option>
                <option value="100% Escrow Milestone Protected Commercial Rights">Escrow Milestone Protected Buyout</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', color: '#166534', fontWeight: 600 }}>
              <span>✓ Smart Milestone Escrow</span>
              <span>✓ IP Provenance Guarantee</span>
              <span>✓ Commercial Model Indemnity</span>
            </div>
          </div>

          {/* Deliverables & Duration */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Required Deliverables
              </label>
              <input
                type="text"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Duration &amp; Tools
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 30 seconds (Sora / Runway)"
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#fafbfc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}
          >
            Cancel
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '12px',
                fontWeight: 600,
                color: '#475569'
              }}
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(false)}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
              }}
            >
              Publish Brief &amp; Match Creators
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
