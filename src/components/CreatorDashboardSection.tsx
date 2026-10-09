'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Briefcase, 
  FileText, 
  Layers, 
  MessageSquare, 
  Settings, 
  User, 
  Clock, 
  Send, 
  ArrowRight, 
  UploadCloud, 
  ExternalLink,
  Calendar,
  DollarSign,
  Trash2,
  Save,
  Check,
  X,
  Play,
  Download
} from 'lucide-react';
import { useMarketplace } from '@/lib/marketplaceContext';
import { BrandBrief, CreatorWork } from '@/lib/mockData';

interface CreatorDashboardSectionProps {
  onApplyBrief: (brief: BrandBrief) => void;
  onAddProject: () => void;
  isCompact?: boolean;
}

export default function CreatorDashboardSection({
  onApplyBrief,
  onAddProject,
  isCompact = false,
}: CreatorDashboardSectionProps) {
  const { 
    creators, 
    updateCreatorProfile, 
    deletePortfolioWork, 
    briefs, 
    invitations, 
    respondInvitation, 
    projects, 
    advanceProjectStage,
    applications, 
    showToast 
  } = useMarketplace();

  const currentCreator = creators.find((c) => c.id === 'ava-chen') || creators[0];

  const [activeNav, setActiveNav] = useState('Overview');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Videos' | 'Images' | 'Animations' | 'Graphics'>('All');
  const [selectedBrief, setSelectedBrief] = useState<BrandBrief | null>(null);

  // Profile Builder State
  const [name, setName] = useState(currentCreator.name);
  const [title, setTitle] = useState(currentCreator.role);
  const [bio, setBio] = useState(currentCreator.about);
  const [location, setLocation] = useState(currentCreator.location);
  const [startingRate, setStartingRate] = useState(currentCreator.startingPrice);
  const [tools, setTools] = useState(currentCreator.tools.join(', '));
  const [experience, setExperience] = useState(currentCreator.experience);

  // Brief Filters
  const [briefCategory, setBriefCategory] = useState('All');
  const [briefBudget, setBriefBudget] = useState('All');

  const filteredPortfolio = currentCreator.works.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const filteredBriefs = briefs.filter((b) => {
    if (briefCategory !== 'All' && !b.tags.some((t) => t.toLowerCase().includes(briefCategory.toLowerCase()))) return false;
    if (briefBudget !== 'All') {
      if (briefBudget === 'above-1500' && b.maxBudget < 1500) return false;
      if (briefBudget === 'under-1500' && b.minBudget >= 1500) return false;
    }
    return true;
  });

  const handleSaveProfile = () => {
    updateCreatorProfile({
      name,
      role: title,
      about: bio,
      location,
      startingPrice: Number(startingRate),
      experience,
      tools: tools.split(',').map((t) => t.trim()).filter(Boolean)
    });
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* SaaS Creator Studio Top Bar */}
      <div style={{
        padding: '12px 24px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span style={{ color: '#64748b', fontWeight: 500 }}>Creator Studio</span>
          <span style={{ color: '#cbd5e1' }}>/</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>{activeNav}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onAddProject}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#7a050e',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(122, 5, 14, 0.25)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Plus size={14} /> Upload AI Project
          </button>
        </div>
      </div>

      {/* Main Layout (Sidebar + Content) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isCompact ? '180px 1fr' : '220px 1fr',
        flex: 1,
        overflow: 'hidden'
      }}>
        {/* Creator Sidebar */}
        <aside style={{
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto'
        }}>
          <div>
            {/* Creator Profile Mini Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#f5f3ff',
              border: '1px solid #ede9fe',
              marginBottom: '16px'
            }}>
              <div style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <Image src="/assets/ava.jpg" alt="Ava Chen" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#4c1d95' }}>{currentCreator.name}</span>
                  <CheckCircle2 size={11} color="#10b981" />
                </div>
                <div style={{ fontSize: '10px', color: '#6b21a8' }}>Creator Account</div>
              </div>
            </div>

            {/* Nav Menu */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {[
                { name: 'Overview', icon: <Layers size={14} /> },
                { name: 'My Profile', icon: <User size={14} /> },
                { name: 'Portfolio Manager', icon: <UploadCloud size={14} /> },
                { name: 'Explore Brand Briefs', icon: <Briefcase size={14} color="#6366f1" /> },
                { name: 'Invitations', icon: <Sparkles size={14} color="#ec4899" />, count: invitations.filter(i => i.status === 'pending').length, alert: true },
                { name: 'Applications', icon: <FileText size={14} />, count: applications.length },
                { name: 'Active Projects', icon: <Clock size={14} />, count: projects.length },
                { name: 'Settings', icon: <Settings size={14} /> },
              ].map((item) => {
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? '#f5f3ff' : 'transparent',
                      color: isActive ? '#7c3aed' : '#475569',
                      transition: 'all 0.15s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span style={{
                        backgroundColor: item.alert ? '#fdf2f8' : '#f1f5f9',
                        color: item.alert ? '#db2777' : '#64748b',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '999px'
                      }}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Verification Status Card */}
          <div style={{
            backgroundColor: '#ecfdf5',
            borderRadius: '10px',
            border: '1px solid #a7f3d0',
            padding: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <ShieldCheck size={14} color="#059669" />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#065f46' }}>Verified Pro</span>
            </div>
            <p style={{ fontSize: '10px', color: '#047857' }}>
              Level 3 AI Filmmaker credentials verified.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {/* VIEW: OVERVIEW */}
          {activeNav === 'Overview' && (
            <>
              {/* 4 Metric Cards */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                  Creator Overview
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px'
                }}>
                  {/* Profile Completion Card with Progress */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Profile Completion</span>
                      <CheckCircle2 size={13} color="#10b981" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>95%</span>
                      <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>Excellent</span>
                    </div>
                    <div style={{ height: '5px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: '95%', height: '100%', backgroundColor: '#10b981' }} />
                    </div>
                  </div>

                  {[
                    { label: 'Portfolio Projects', val: `${currentCreator.works.length + 9}`, color: '#6366f1' },
                    { label: 'Invitations Received', val: `${invitations.length + 4}`, color: '#ec4899' },
                    { label: 'Submitted Applications', val: `${applications.length + 7}`, color: '#8b5cf6' },
                  ].map((m, idx) => (
                    <div key={idx} style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{m.label}</span>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Portfolio + Edit Profile Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isCompact ? '1fr' : '1.35fr 0.65fr',
                gap: '14px'
              }}>
                {/* My Portfolio Box */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>My Portfolio</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {(['All', 'Videos', 'Images', 'Animations', 'Graphics'] as const).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              padding: '3px 8px',
                              borderRadius: '6px',
                              backgroundColor: activeCategory === cat ? '#eef2ff' : '#f8fafc',
                              color: activeCategory === cat ? '#4f46e5' : '#64748b',
                              border: activeCategory === cat ? '1px solid #c7d2fe' : '1px solid #e2e8f0'
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setActiveNav('Portfolio Manager')}
                        style={{ fontSize: '10px', color: '#6366f1', fontWeight: 600 }}
                      >
                        View all →
                      </button>
                    </div>
                  </div>

                  {/* Portfolio Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px'
                  }}>
                    {filteredPortfolio.slice(0, 5).map((p) => (
                      <div
                        key={p.id}
                        style={{
                          position: 'relative',
                          height: '80px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '#0f172a',
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <Image src={p.thumbnail} alt={p.title} fill style={{ objectFit: 'cover' }} />
                        <span style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          backgroundColor: 'rgba(0,0,0,0.65)',
                          color: '#ffffff',
                          fontSize: '8px',
                          padding: '1px 5px',
                          borderRadius: '3px'
                        }}>
                          {p.tag || p.category}
                        </span>
                      </div>
                    ))}

                    {/* + Add Project Card */}
                    <div
                      onClick={onAddProject}
                      style={{
                        height: '80px',
                        borderRadius: '8px',
                        border: '2px dashed #cbd5e1',
                        backgroundColor: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#818cf8';
                        e.currentTarget.style.backgroundColor = '#eef2ff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6366f1'
                      }}>
                        <Plus size={14} />
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569' }}>+ Add Project</span>
                    </div>
                  </div>
                </div>

                {/* Edit Profile Widget */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Profile Summary</h3>
                      <button
                        onClick={() => setActiveNav('My Profile')}
                        style={{ fontSize: '10px', color: '#6366f1', fontWeight: 700 }}
                      >
                        Edit Profile ✎
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
                        <Image src="/assets/ava.jpg" alt="Ava" fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{currentCreator.name}</div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>{currentCreator.role}</div>
                        <div style={{ fontSize: '9px', color: '#94a3b8' }}>{currentCreator.location}</div>
                      </div>
                    </div>

                    {/* Skill Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '10px' }}>
                      {currentCreator.tools.slice(0, 5).map((skill, i) => (
                        <span key={i} className="badge-tag" style={{ fontSize: '9px', padding: '1px 6px' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Creator Stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '4px',
                    backgroundColor: '#f8fafc',
                    padding: '6px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '10px'
                  }}>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '8px' }}>Experience</div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{currentCreator.experience}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '8px' }}>Starting Rate</div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>${currentCreator.startingPrice}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '8px' }}>Availability</div>
                      <div style={{ fontWeight: 700, color: '#059669' }}>Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW: MY PROFILE (Creator Profile Builder Requirement) */}
          {activeNav === 'My Profile' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Creator Profile Builder</h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Showcase your verified AI director identity and production capabilities</p>
                </div>
                <button
                  onClick={handleSaveProfile}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: '#6366f1',
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Save size={14} /> Save Profile Updates
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Full Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Professional Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Starting Project Price ($ USD):</label>
                  <input
                    type="number"
                    value={startingRate}
                    onChange={(e) => setStartingRate(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>AI Tools &amp; Pipelines:</label>
                <input
                  type="text"
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Professional Biography &amp; Workflow Statement:</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none', resize: 'none' }}
                />
              </div>

              {/* Verification Badges Section */}
              <div style={{ backgroundColor: '#f0fdf4', padding: '14px', borderRadius: '10px', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#166534' }}>
                  CreatorProof Trust &amp; Verification Signals
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#15803d' }}>
                    <CheckCircle2 size={13} color="#16a34a" /> Identity Verified (Government ID)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#15803d' }}>
                    <CheckCircle2 size={13} color="#16a34a" /> Sora &amp; Runway Pro Commercial Tier
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#15803d' }}>
                    <CheckCircle2 size={13} color="#16a34a" /> 100% Commercial Rights Escrow Transfer
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: PORTFOLIO MANAGER (Upload, Edit, Delete Media) */}
          {activeNav === 'Portfolio Manager' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>AI Portfolio Manager</h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Manage your verified showcase assets, commercial rights, and prompts</p>
                </div>
                <button
                  onClick={onAddProject}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#6366f1',
                    color: '#ffffff',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={14} /> Upload New AI Asset
                </button>
              </div>

              {/* Grid of Portfolio Items */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {currentCreator.works.map((work) => (
                  <div
                    key={work.id}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ position: 'relative', height: '140px', backgroundColor: '#0a0f1d' }}>
                      <Image src={work.thumbnail} alt={work.title} fill style={{ objectFit: 'cover' }} />
                      <span style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: '#ffffff',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {work.category}
                      </span>
                    </div>

                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{work.title}</div>
                        <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: 1.3 }}>
                          {work.description || 'Verified commercial generative asset with copyright provenance.'}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                        <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>✓ Commercial Rights Ready</span>
                        <button
                          onClick={() => deletePortfolioWork(work.id)}
                          style={{ color: '#ef4444', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: INVITATIONS (Received Invitations from Brands) */}
          {activeNav === 'Invitations' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                Brand Project Invitations ({invitations.length})
              </h3>
              {invitations.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>No pending invitations.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {invitations.map((inv) => (
                    <div
                      key={inv.id}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>{inv.brandName}</span>
                            <span className="badge-verified" style={{ fontSize: '9px', padding: '1px 6px' }}>✓ Verified Brand</span>
                          </div>
                          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                            {inv.briefTitle}
                          </h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '15px', fontWeight: 800, color: '#059669' }}>{inv.budget}</span>
                          <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>Timeline: {inv.timeline}</span>
                        </div>
                      </div>

                      <div style={{ padding: '10px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#334155' }}>
                        &ldquo;{inv.message}&rdquo;
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Status: <strong>{inv.status.toUpperCase()}</strong></span>
                        {inv.status === 'pending' ? (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => respondInvitation(inv.id, false)}
                              style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '11px', fontWeight: 600, color: '#64748b' }}
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => respondInvitation(inv.id, true)}
                              style={{ padding: '6px 16px', borderRadius: '6px', backgroundColor: '#10b981', color: '#ffffff', fontSize: '11px', fontWeight: 700, boxShadow: '0 2px 6px rgba(16,185,129,0.3)' }}
                            >
                              ✓ Accept Invitation
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                            ✓ Project Accepted &amp; Active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW: EXPLORE BRAND BRIEFS */}
          {(activeNav === 'Explore Brand Briefs' || activeNav === 'Overview') && (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                    Explore Brand Briefs ({filteredBriefs.length})
                  </h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    Find exciting campaigns from verified brands
                  </span>
                </div>
                <button
                  onClick={() => setActiveNav('Explore Brand Briefs')}
                  style={{ fontSize: '11px', color: '#6366f1', fontWeight: 600 }}
                >
                  View all →
                </button>
              </div>

              {/* Filter Row */}
              <div style={{ display: 'flex', gap: '8px', fontSize: '11px', flexWrap: 'wrap' }}>
                <select
                  value={briefCategory}
                  onChange={(e) => setBriefCategory(e.target.value)}
                  style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '11px' }}
                >
                  <option value="All">All Categories ▾</option>
                  <option value="Luxury">Luxury &amp; Jewelry</option>
                  <option value="Fashion">Fashion &amp; Apparel</option>
                  <option value="Product">Product Showcase</option>
                </select>

                <select
                  value={briefBudget}
                  onChange={(e) => setBriefBudget(e.target.value)}
                  style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '11px' }}
                >
                  <option value="All">Budget Range ▾</option>
                  <option value="above-1500">$1,500+</option>
                  <option value="under-1500">&lt; $1,500</option>
                </select>
              </div>

              {/* Brand Brief Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredBriefs.map((brief) => (
                  <div
                    key={brief.id}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      backgroundColor: '#fafbfc'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>{brief.brand}</span>
                          {brief.verified && (
                            <span className="badge-verified" style={{ fontSize: '9px', padding: '1px 6px' }}>
                              <CheckCircle2 size={9} /> Verified
                            </span>
                          )}
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                          {brief.title}
                        </h4>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>
                          {brief.budget}
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                          Deadline: {brief.deadline}
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
                      {brief.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {brief.tags.map((tag, idx) => (
                          <span key={idx} className="badge-tag" style={{ fontSize: '10px', padding: '2px 6px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onApplyBrief(brief)}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: '#6366f1',
                          color: '#ffffff',
                          padding: '5px 14px',
                          borderRadius: '6px',
                          boxShadow: '0 2px 6px rgba(99, 102, 241, 0.25)'
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: ACTIVE PROJECTS */}
          {activeNav === 'Active Projects' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Active Client Projects ({projects.length})</h3>
              {projects.map((proj) => (
                <div key={proj.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Client: {proj.brandName}</span>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{proj.briefTitle}</h4>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>{proj.budget} Escrow</span>
                  </div>

                  {/* Stage Stepper for Creator */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {[
                      { key: 'brief', label: '1. Brief Confirmed' },
                      { key: 'in_progress', label: '2. In Production' },
                      { key: 'revision', label: '3. Revision Review' },
                      { key: 'delivered', label: '4. Delivered' },
                    ].map((st, i) => (
                      <div
                        key={i}
                        onClick={() => advanceProjectStage(proj.id, st.key as any)}
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          backgroundColor: proj.stage === st.key ? '#f5f3ff' : '#f8fafc',
                          border: proj.stage === st.key ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                          textAlign: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ fontSize: '10px', fontWeight: 800, color: proj.stage === st.key ? '#7c3aed' : '#64748b' }}>
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#166534' }}>
                        Deliverable: {proj.deliverableName || 'LuxeLabel_Master_4K.mp4'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#15803d' }}>
                        Ready for final brand review &amp; payout release
                      </div>
                    </div>
                    <button
                      onClick={() => advanceProjectStage(proj.id, 'delivered')}
                      style={{ padding: '6px 14px', backgroundColor: '#16a34a', color: '#ffffff', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}
                    >
                      Mark Ready for Review ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
