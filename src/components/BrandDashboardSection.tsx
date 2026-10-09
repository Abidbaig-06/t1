'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  SlidersHorizontal, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Send, 
  Bookmark, 
  FileText, 
  Layers, 
  MessageSquare, 
  Settings, 
  Check, 
  X,
  ChevronDown,
  ExternalLink,
  Award,
  Video,
  Plus,
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Download,
  FilterX
} from 'lucide-react';
import { useMarketplace } from '@/lib/marketplaceContext';
import { Creator, BrandBrief } from '@/lib/mockData';

interface BrandDashboardSectionProps {
  onSelectCreator: (creator: Creator) => void;
  onInviteCreator: (creator: Creator) => void;
  onOpenBriefBuilder: () => void;
  onOpenCreateBriefModal?: () => void;
  isCompact?: boolean;
}

export default function BrandDashboardSection({
  onSelectCreator,
  onInviteCreator,
  onOpenBriefBuilder,
  onOpenCreateBriefModal,
  isCompact = false,
}: BrandDashboardSectionProps) {
  const { 
    creators, 
    briefs, 
    projects, 
    applications, 
    shortlistedIds, 
    toggleShortlist, 
    advanceProjectStage,
    showToast 
  } = useMarketplace();

  const [activeNav, setActiveNav] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedTool, setSelectedTool] = useState('all');
  const [selectedSpec, setSelectedSpec] = useState('all');
  const [selectedContentType, setSelectedContentType] = useState('all');
  const [selectedExp, setSelectedExp] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [commercialProtectedOnly, setCommercialProtectedOnly] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator>(creators[0]);
  const [activeProfileTab, setActiveProfileTab] = useState<'Portfolio' | 'About' | 'Workflow' | 'Reviews'>('Portfolio');

  // Filter logic covering: Skills, Specialization, Tools, Content type, and other relevant profile attributes
  const filteredCreators = creators.filter((c) => {
    if (verifiedOnly && !c.verified) return false;
    if (commercialProtectedOnly && !c.badges.some((b) => b.toLowerCase().includes('verified') || b.toLowerCase().includes('commercial'))) return false;
    if (selectedSkill !== 'all' && !c.skills?.some((s) => s.toLowerCase().includes(selectedSkill.toLowerCase()))) return false;
    if (selectedTool !== 'all' && !c.tools.some((t) => t.toLowerCase().includes(selectedTool.toLowerCase()))) return false;
    if (selectedSpec !== 'all' && !c.specialization.toLowerCase().includes(selectedSpec.toLowerCase())) return false;
    if (selectedContentType !== 'all' && !c.contentType.toLowerCase().includes(selectedContentType.toLowerCase())) return false;
    if (selectedExp !== 'all' && !c.experience.toLowerCase().includes(selectedExp.toLowerCase())) return false;
    if (selectedAvailability !== 'all' && !c.availability.toLowerCase().includes(selectedAvailability.toLowerCase())) return false;
    if (selectedRating !== 'all' && c.rating < parseFloat(selectedRating)) return false;
    if (selectedBudget !== 'all') {
      if (selectedBudget === 'under-600' && c.startingPrice >= 600) return false;
      if (selectedBudget === '600-800' && (c.startingPrice < 600 || c.startingPrice > 800)) return false;
      if (selectedBudget === 'above-800' && c.startingPrice <= 800) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchRole = c.role.toLowerCase().includes(q);
      const matchTool = c.tools.some((t) => t.toLowerCase().includes(q));
      const matchSpec = c.specialization.toLowerCase().includes(q);
      const matchSkill = c.skills?.some((s) => s.toLowerCase().includes(q));
      const matchContentType = c.contentType.toLowerCase().includes(q);
      const matchWorks = c.works.some((w) => w.title.toLowerCase().includes(q) || w.tag?.toLowerCase().includes(q));
      if (!matchName && !matchRole && !matchTool && !matchSpec && !matchSkill && !matchContentType && !matchWorks) return false;
    }
    return true;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSkill('all');
    setSelectedTool('all');
    setSelectedSpec('all');
    setSelectedContentType('all');
    setSelectedExp('all');
    setSelectedBudget('all');
    setSelectedRating('all');
    setSelectedAvailability('all');
    setVerifiedOnly(false);
    setCommercialProtectedOnly(false);
  };

  const shortlistedCreators = creators.filter((c) => shortlistedIds.includes(c.id));

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
      {/* SaaS Dashboard Top Bar */}
      <div style={{
        padding: '12px 24px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span style={{ color: '#64748b', fontWeight: 500 }}>Brand Portal</span>
          <span style={{ color: '#cbd5e1' }}>/</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>{activeNav}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onOpenBriefBuilder}
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
            <Sparkles size={13} /> + Create AI Brief
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
        {/* Left Sidebar */}
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
            {/* Brand Profile Widget */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #f1f5f9',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14px',
                flexShrink: 0
              }}>
                LL
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>LuxeLabel</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>Brand Account</div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {[
                { name: 'Overview', icon: <Layers size={14} /> },
                { name: 'Discover Creators', icon: <Search size={14} /> },
                { name: 'AI Brief Builder', icon: <Sparkles size={14} color="#7a050e" />, badge: 'AI' },
                { name: 'Brand / Agency Briefs', icon: <FileText size={14} />, count: briefs.length },
                { name: 'Shortlisted Creators', icon: <Bookmark size={14} />, count: shortlistedIds.length },
                { name: 'Applications', icon: <Briefcase size={14} />, count: applications.length },
                { name: 'Active Projects', icon: <Clock size={14} />, count: projects.length },
                { name: 'Settings', icon: <Settings size={14} /> },
              ].map((item) => {
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.name === 'AI Brief Builder') {
                        onOpenBriefBuilder();
                      } else {
                        setActiveNav(item.name);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? '#eef2ff' : 'transparent',
                      color: isActive ? '#4f46e5' : '#475569',
                      transition: 'all 0.15s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span style={{
                        backgroundColor: '#f3e8ff',
                        color: '#7c3aed',
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '999px'
                      }}>
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#94a3b8'
                      }}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick AI Brief Launch */}
          <div style={{
            background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
            borderRadius: '10px',
            border: '1px solid #ddd6fe',
            padding: '10px',
            marginTop: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={14} color="#7c3aed" />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#5b21b6' }}>Create Brief</span>
            </div>
            <p style={{ fontSize: '10px', color: '#6d28d9', marginBottom: '8px', lineHeight: 1.3 }}>
              Generate structured creative briefs with 1-click AI.
            </p>
            <button
              onClick={onOpenBriefBuilder}
              style={{
                width: '100%',
                padding: '6px',
                backgroundColor: '#7c3aed',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '6px',
                boxShadow: '0 2px 6px rgba(124,58,237,0.3)'
              }}
            >
              Launch Builder
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div style={{
          backgroundColor: '#f8fafc',
          display: 'grid',
          gridTemplateColumns: isCompact || activeNav !== 'Discover Creators' ? '1fr' : '1fr 340px',
          overflowY: 'auto'
        }}>
          {/* Main Column */}
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* View 1: Overview */}
            {activeNav === 'Overview' && (
              <>
                {/* Welcome Message */}
                <div style={{
                  padding: '16px 20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                      Welcome back, LuxeLabel! 👋
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      Discover and collaborate with top-tier generative AI directors for your campaigns.
                    </p>
                  </div>
                  <button
                    onClick={onOpenBriefBuilder}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#6366f1',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(99,102,241,0.25)'
                    }}
                  >
                    <Sparkles size={14} /> + New AI Brief
                  </button>
                </div>

                {/* 4 Metric Cards */}
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    Dashboard Overview
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '10px'
                  }}>
                    {[
                      { label: 'Total Creators', val: '2,450', color: '#2563eb', bg: '#eff6ff', icon: <Briefcase size={14} /> },
                      { label: 'Active Briefs', val: `${briefs.length}`, color: '#059669', bg: '#ecfdf5', icon: <FileText size={14} /> },
                      { label: 'Applications Received', val: `${applications.length + 47}`, color: '#7c3aed', bg: '#f5f3ff', icon: <Layers size={14} /> },
                      { label: 'Ongoing Projects', val: `${projects.length}`, color: '#d97706', bg: '#fffbeb', icon: <Clock size={14} /> },
                    ].map((m, i) => (
                      <div key={i} style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{m.label}</span>
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '6px',
                            backgroundColor: m.bg,
                            color: m.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {m.icon}
                          </div>
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Creators & Recent Activity Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
                  {/* Recommended Creators */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                        Top Recommended AI Creators
                      </h4>
                      <button
                        onClick={() => setActiveNav('Discover Creators')}
                        style={{ fontSize: '11px', color: '#6366f1', fontWeight: 600 }}
                      >
                        Explore all →
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {creators.slice(0, 3).map((c) => (
                        <div
                          key={c.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ position: 'relative', width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
                              <Image src={c.avatar} alt={c.name} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{c.name}</span>
                                {c.verified && <CheckCircle2 size={11} color="#10b981" />}
                              </div>
                              <span style={{ fontSize: '10px', color: '#64748b' }}>{c.role}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>${c.startingPrice}</span>
                            <button
                              onClick={() => {
                                setSelectedCreator(c);
                                onSelectCreator(c);
                              }}
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                backgroundColor: '#6366f1',
                                color: '#ffffff',
                                padding: '4px 10px',
                                borderRadius: '6px'
                              }}
                            >
                              Profile
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                      Recent Campaign Activity
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { time: '10m ago', text: 'Ava Chen delivered 4K master for Jewelry campaign', type: 'delivery' },
                        { time: '1h ago', text: 'AI Brief "30-Second Luxury Ad" published to marketplace', type: 'brief' },
                        { time: '3h ago', text: 'Rohan Mehta submitted proposal for 3D Product Ad', type: 'bid' },
                        { time: 'Yesterday', text: 'Escrow payment funded ($2,200) for contract #CP-849', type: 'escrow' },
                      ].map((act, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#6366f1', marginTop: '6px' }} />
                          <div style={{ flex: 1 }}>
                            <span style={{ color: '#0f172a', fontWeight: 500 }}>{act.text}</span>
                            <span style={{ color: '#94a3b8', fontSize: '10px', display: 'block' }}>{act.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* View 2: Discover Creators & Search */}
            {(activeNav === 'Discover Creators' || activeNav === 'Overview') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Search & Filters Card */}
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
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                      Discover AI Creators
                    </h3>
                    {(searchQuery || selectedTool !== 'all' || selectedSpec !== 'all' || selectedContentType !== 'all' || selectedExp !== 'all' || selectedBudget !== 'all' || verifiedOnly) && (
                      <button
                        onClick={clearAllFilters}
                        style={{ fontSize: '11px', color: '#6366f1', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <FilterX size={12} /> Clear Filters
                      </button>
                    )}
                  </div>

                  {/* Search Bar */}
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
                    <input
                      type="text"
                      placeholder="Search creators, skills or tools (e.g. Sora, Runway, jewelry ad...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 36px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '12px',
                        outline: 'none',
                        backgroundColor: '#ffffff'
                      }}
                    />
                  </div>

                  {/* Search and Filter Selectors by Skills, Specialization, Tools, Content Type, and Profile Attributes */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '11px' }}>
                    {/* Skills Filter */}
                    <select
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: selectedSkill !== 'all' ? '#f0fdf4' : '#f8fafc', color: selectedSkill !== 'all' ? '#15803d' : '#334155', fontWeight: selectedSkill !== 'all' ? 700 : 500, fontSize: '11px' }}
                    >
                      <option value="all">Skills ▾</option>
                      <option value="Cinematic Prompting">Cinematic Prompting</option>
                      <option value="Color Grading">Color Grading</option>
                      <option value="3D Modeling">3D Modeling</option>
                      <option value="Procedural Texturing">Procedural Texturing</option>
                      <option value="Motion VFX">Motion VFX</option>
                      <option value="Character Animation">Character Animation</option>
                      <option value="Virtual Fashion Lookbooks">Virtual Fashion Lookbooks</option>
                      <option value="Style Transfer">Style Transfer</option>
                      <option value="Sound Design">Sound Design</option>
                      <option value="Concept Art">Concept Art</option>
                      <option value="8K Upscaling">8K Upscaling</option>
                    </select>

                    {/* Specialization Filter */}
                    <select
                      value={selectedSpec}
                      onChange={(e) => setSelectedSpec(e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: selectedSpec !== 'all' ? '#eff6ff' : '#f8fafc', color: selectedSpec !== 'all' ? '#1d4ed8' : '#334155', fontWeight: selectedSpec !== 'all' ? 700 : 500, fontSize: '11px' }}
                    >
                      <option value="all">Specialization ▾</option>
                      <option value="Commercial">Commercial Filmmaking</option>
                      <option value="3D">3D &amp; Product</option>
                      <option value="Animation">AI Animation</option>
                      <option value="Fashion">Fashion &amp; Editorial</option>
                      <option value="Concept">Concept Art</option>
                    </select>

                    {/* Tools Filter */}
                    <select
                      value={selectedTool}
                      onChange={(e) => setSelectedTool(e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#334155', fontSize: '11px' }}
                    >
                      <option value="all">AI Tools / Models ▾</option>
                      <option value="Sora">Sora</option>
                      <option value="Runway">Runway</option>
                      <option value="Midjourney">Midjourney</option>
                      <option value="Blender">Blender</option>
                      <option value="Pika">Pika</option>
                      <option value="Stable Diffusion">Stable Diffusion</option>
                    </select>

                    {/* Content Type Filter */}
                    <select
                      value={selectedContentType}
                      onChange={(e) => setSelectedContentType(e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#334155', fontSize: '11px' }}
                    >
                      <option value="all">Content Type ▾</option>
                      <option value="Video">Video</option>
                      <option value="3D">3D Visuals</option>
                      <option value="Animation">Animations</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Graphics">Graphics</option>
                    </select>

                    {/* Rating Filter */}
                    <select
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#334155', fontSize: '11px' }}
                    >
                      <option value="all">Rating ▾</option>
                      <option value="4.95">4.95+ ★</option>
                      <option value="4.90">4.90+ ★</option>
                      <option value="4.80">4.80+ ★</option>
                    </select>

                    {/* Availability Filter */}
                    <select
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#334155', fontSize: '11px' }}
                    >
                      <option value="all">Availability ▾</option>
                      <option value="Available now">Available Now</option>
                      <option value="In 2 days">Available in 2 Days</option>
                    </select>

                    {/* Experience Filter */}
                    <select
                      value={selectedExp}
                      onChange={(e) => setSelectedExp(e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#334155', fontSize: '11px' }}
                    >
                      <option value="all">Experience ▾</option>
                      <option value="5+">5+ years</option>
                      <option value="4+">4+ years</option>
                      <option value="3+">3+ years</option>
                    </select>

                    {/* Budget Range Filter */}
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#334155', fontSize: '11px' }}
                    >
                      <option value="all">Budget ▾</option>
                      <option value="under-600">&lt; $600</option>
                      <option value="600-800">$600 – $800</option>
                      <option value="above-800">$800+</option>
                    </select>

                    {/* Checkbox: Verified Only */}
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, color: '#334155' }}>
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        style={{ accentColor: '#10b981', cursor: 'pointer' }}
                      />
                      <span>Verified</span>
                    </label>

                    {/* Checkbox: Commercial IP Protection */}
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, color: '#7a050e' }}>
                      <input
                        type="checkbox"
                        checked={commercialProtectedOnly}
                        onChange={(e) => setCommercialProtectedOnly(e.target.checked)}
                        style={{ accentColor: '#7a050e', cursor: 'pointer' }}
                      />
                      <span>Commercial Rights</span>
                    </label>

                    {(selectedSkill !== 'all' || selectedTool !== 'all' || selectedSpec !== 'all' || selectedContentType !== 'all' || selectedRating !== 'all' || selectedAvailability !== 'all' || selectedExp !== 'all' || selectedBudget !== 'all' || verifiedOnly || commercialProtectedOnly || searchQuery) && (
                      <button
                        onClick={clearAllFilters}
                        style={{ fontSize: '10px', color: '#ef4444', fontWeight: 700, padding: '2px 6px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Reset filters
                      </button>
                    )}
                  </div>
                </div>

                {/* Creator Cards or Empty State */}
                {filteredCreators.length === 0 ? (
                  /* Informative Empty State Requirement */
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '40px 20px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#64748b'
                    }}>
                      <FilterX size={22} />
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                      No AI Creators Match Your Filter Criteria
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748b', maxWidth: '380px', lineHeight: 1.4 }}>
                      Try broadening your tool selection, adjusting budget range, or clearing filters to browse our full creator network.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      style={{
                        marginTop: '6px',
                        padding: '8px 16px',
                        backgroundColor: '#6366f1',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '8px'
                      }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredCreators.map((creator) => {
                      const isSelected = selectedCreator.id === creator.id;
                      const isShortlisted = shortlistedIds.includes(creator.id);
                      return (
                        <div
                          key={creator.id}
                          onClick={() => {
                            setSelectedCreator(creator);
                            onSelectCreator(creator);
                          }}
                          style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid #6366f1' : '1px solid #e2e8f0',
                            padding: '14px',
                            boxShadow: isSelected ? '0 4px 14px rgba(99, 102, 241, 0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                          }}
                        >
                          {/* Card Header */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ position: 'relative', width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden' }}>
                                <Image src={creator.avatar} alt={creator.name} fill style={{ objectFit: 'cover' }} />
                              </div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{creator.name}</h4>
                                  {creator.verified ? (
                                    <span className="badge-verified">
                                      <CheckCircle2 size={10} /> Verified
                                    </span>
                                  ) : (
                                    <span className="badge-pending">
                                      Verification pending
                                    </span>
                                  )}
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>
                                  {creator.role} • {creator.location} • {creator.experience}
                                </div>
                              </div>
                            </div>

                            {/* Tools & Skills Tags */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                {creator.tools.slice(0, 3).map((tool, idx) => (
                                  <span key={idx} className="badge-tag">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                {creator.skills?.slice(0, 2).map((skill, idx) => (
                                  <span key={idx} style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '4px', backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', fontWeight: 600 }}>
                                    ⚡ {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Profile Attributes Strip: Specialization, Content Type, Rating, Availability */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '10px' }}>
                            <span style={{ padding: '2px 7px', borderRadius: '4px', backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 700 }}>
                              🎯 {creator.specialization}
                            </span>
                            <span style={{ padding: '2px 7px', borderRadius: '4px', backgroundColor: '#fdf2f8', color: '#be185d', fontWeight: 600 }}>
                              🎬 {creator.contentType}
                            </span>
                            <span style={{ padding: '2px 7px', borderRadius: '4px', backgroundColor: '#faf5eb', color: '#7a050e', border: '1px solid #e6d4b0', fontWeight: 700 }}>
                              ★ {creator.rating}
                            </span>
                            <span style={{ padding: '2px 7px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: 600, marginLeft: 'auto' }}>
                              ⏱ {creator.availability} • {creator.responseTime}
                            </span>
                          </div>

                          {/* Work Preview Thumbnails */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {creator.works.map((work) => (
                              <div
                                key={work.id}
                                style={{
                                  position: 'relative',
                                  height: '75px',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  backgroundColor: '#0f172a'
                                }}
                              >
                                <Image src={work.thumbnail} alt={work.title} fill style={{ objectFit: 'cover' }} />
                                <div style={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  padding: '4px 6px',
                                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                  color: '#ffffff',
                                  fontSize: '9px',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {work.title}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Bottom Row */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #f1f5f9',
                            paddingTop: '10px'
                          }}>
                            <div>
                              <span style={{ fontSize: '11px', color: '#64748b' }}>Starting at </span>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                                ${creator.startingPrice}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCreator(creator);
                                }}
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  color: '#475569',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  border: '1px solid #cbd5e1',
                                  backgroundColor: '#ffffff'
                                }}
                              >
                                View Portfolio
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleShortlist(creator.id);
                                }}
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  color: isShortlisted ? '#6366f1' : '#475569',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  border: isShortlisted ? '1px solid #818cf8' : '1px solid #cbd5e1',
                                  backgroundColor: isShortlisted ? '#eef2ff' : '#ffffff',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Bookmark size={11} fill={isShortlisted ? '#6366f1' : 'none'} />
                                {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onInviteCreator(creator);
                                }}
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  backgroundColor: '#6366f1',
                                  color: '#ffffff',
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                  boxShadow: '0 2px 6px rgba(99, 102, 241, 0.25)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                Invite to Project
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* View 3: Brand / Agency Briefs (Allow brands to define campaign requirements, content type, style, format/aspect ratio, commercial-use requirements) */}
            {(activeNav === 'Brand / Agency Briefs' || activeNav === 'My Briefs') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Header with Creation Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px 20px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                      Brand / Agency Briefs ({briefs.length})
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      Define comprehensive campaign requirements, content type, creative style, aspect ratios, and commercial buyout terms.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={onOpenBriefBuilder}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#334155',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={14} color="#7a050e" /> AI Brief Generator
                    </button>
                    <button
                      onClick={onOpenCreateBriefModal || onOpenBriefBuilder}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#7a050e',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(122, 5, 14, 0.25)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={14} /> + Define Structured Brief
                    </button>
                  </div>
                </div>

                {/* Structured Definition 5-Pillar Banner */}
                <div style={{
                  backgroundColor: '#fbf7ee',
                  border: '1px solid #e6d4b0',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '12px'
                }}>
                  {[
                    { title: '1. Campaign Requirements', desc: 'Narrative vision, deliverables & timeline', icon: '📋' },
                    { title: '2. Content Type', desc: 'AI Video, 3D Models, Hybrid Animation', icon: '🎬' },
                    { title: '3. Creative Style', desc: 'Luxury Macro, Cyberpunk, Photorealism', icon: '✨' },
                    { title: '4. Format / Aspect Ratio', desc: '9:16 Reels/TikTok, 16:9 Cinematic', icon: '📐' },
                    { title: '5. Commercial Rights', desc: 'Full Buyout & Milestone Escrow', icon: '⚖️' },
                  ].map((pillar, i) => (
                    <div key={i} style={{ borderRight: i < 4 ? '1px solid #e6dac8' : 'none', paddingRight: '8px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#7a050e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{pillar.icon}</span>
                        <span>{pillar.title}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: '#6b5e52', marginTop: '3px', lineHeight: 1.3 }}>
                        {pillar.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Brief Cards with Structured Metadata */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {briefs.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>{b.brand}</span>
                            <span className="badge-verified" style={{ fontSize: '9px', padding: '1px 6px' }}>
                              ✓ Live Brief
                            </span>
                            <span style={{ fontSize: '10px', color: '#64748b' }}>
                              • {b.applicantsCount || 8} Creators Applied
                            </span>
                          </div>
                          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginTop: '3px' }}>
                            {b.title}
                          </h4>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '15px', fontWeight: 800, color: '#7a050e', backgroundColor: '#fbf7ee', border: '1px solid #e6d4b0', padding: '2px 8px', borderRadius: '6px' }}>
                            {b.budget}
                          </span>
                          <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginTop: '2px' }}>
                            Deadline: {b.deadline}
                          </span>
                        </div>
                      </div>

                      <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                        {b.description}
                      </p>

                      {/* 5-Criteria Structured Tags */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Specs:</span>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#1e293b', fontWeight: 600 }}>
                          🎬 Content: {b.tags[0] || 'AI Video'}
                        </span>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#1e293b', fontWeight: 600 }}>
                          📐 Format: {b.platform || '9:16 Vertical'}
                        </span>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#1e293b', fontWeight: 600 }}>
                          ✨ Style: {b.tags[1] || 'Luxury Macro'}
                        </span>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontWeight: 700, marginLeft: 'auto' }}>
                          ⚖️ {b.commercialRights}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {b.tags.map((t, idx) => (
                            <span key={idx} className="badge-tag" style={{ fontSize: '10px' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={onOpenBriefBuilder}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              backgroundColor: '#ffffff',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#334155',
                              cursor: 'pointer'
                            }}
                          >
                            AI Creator Matches →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 4: Shortlisted Creators */}
            {activeNav === 'Shortlisted Creators' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                  Shortlisted AI Creators ({shortlistedCreators.length})
                </h3>
                {shortlistedCreators.length === 0 ? (
                  <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>No creators currently shortlisted. Click Shortlist on any creator card to save them here.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {shortlistedCreators.map((c) => (
                      <div key={c.id} style={{ backgroundColor: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
                            <Image src={c.avatar} alt={c.name} fill style={{ objectFit: 'cover' }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a' }}>{c.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{c.role}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>${c.startingPrice}</span>
                          <button
                            onClick={() => onInviteCreator(c)}
                            style={{ padding: '5px 12px', backgroundColor: '#6366f1', color: '#ffffff', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}
                          >
                            Invite to Project
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* View 5: Active Projects */}
            {activeNav === 'Active Projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                  Ongoing Project Collaborations ({projects.length})
                </h3>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Project ID: #{proj.id}</span>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{proj.briefTitle}</h4>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#059669' }}>{proj.budget} in Escrow</span>
                        <span style={{ fontSize: '10px', color: '#10b981', display: 'block', fontWeight: 700 }}>✓ Escrow Funded</span>
                      </div>
                    </div>

                    {/* Stage Stepper */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {[
                        { key: 'brief', label: '1. Brief Confirmed' },
                        { key: 'in_progress', label: '2. In Production' },
                        { key: 'revision', label: '3. Revisions' },
                        { key: 'delivered', label: '4. Delivered' },
                      ].map((st, idx) => {
                        const isDone = true;
                        const isCurrent = proj.stage === st.key;
                        return (
                          <div
                            key={idx}
                            onClick={() => advanceProjectStage(proj.id, st.key as any)}
                            style={{
                              padding: '8px',
                              borderRadius: '8px',
                              backgroundColor: isCurrent ? '#eef2ff' : '#f8fafc',
                              border: isCurrent ? '1px solid #818cf8' : '1px solid #e2e8f0',
                              textAlign: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <span style={{ fontSize: '10px', fontWeight: 800, color: isCurrent ? '#4f46e5' : '#64748b' }}>
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Delivered Master Asset Preview */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden' }}>
                          <Image src={proj.deliverablePreview || '/assets/ring.jpg'} alt="Deliverable" fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#166534' }}>
                            {proj.deliverableName || 'LuxeLabel_Master_4K.mp4'}
                          </div>
                          <div style={{ fontSize: '10px', color: '#15803d' }}>
                            4K ProRes 422 HQ • Full Commercial Rights Assigned
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => showToast('Master 4K video asset downloaded.')}
                        style={{ padding: '6px 12px', backgroundColor: '#16a34a', color: '#ffffff', borderRadius: '6px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Download size={12} /> Download Master
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Detail Panel for Discover Creators View */}
          {activeNav === 'Discover Creators' && (
            <div style={{
              backgroundColor: '#ffffff',
              borderLeft: '1px solid #e2e8f0',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              overflowY: 'auto'
            }}>
              {/* Creator Profile Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={selectedCreator.avatar} alt={selectedCreator.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{selectedCreator.name}</h4>
                    {selectedCreator.verified && (
                      <span className="badge-verified">
                        <CheckCircle2 size={10} /> Verified
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {selectedCreator.role}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '1px' }}>
                    📍 {selectedCreator.location} • ⏱️ {selectedCreator.experience}
                  </div>
                </div>
              </div>

              {/* Profile Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 600 }}>
                {(['Portfolio', 'About', 'Workflow', 'Reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveProfileTab(tab)}
                    style={{
                      padding: '6px 10px',
                      color: activeProfileTab === tab ? '#6366f1' : '#64748b',
                      borderBottom: activeProfileTab === tab ? '2px solid #6366f1' : '2px solid transparent',
                      fontWeight: activeProfileTab === tab ? 700 : 500,
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              {activeProfileTab === 'Portfolio' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{
                    position: 'relative',
                    height: '160px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#0a0f1d'
                  }}>
                    <Image src={selectedCreator.works[0].thumbnail} alt="Work" fill style={{ objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6366f1',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}>
                        <Video size={18} />
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      right: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: '#ffffff',
                        fontSize: '9px',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        {selectedCreator.works[0].title}
                      </span>
                      <span style={{
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        Commercial Use ✓
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
                    {selectedCreator.works[0].description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {selectedCreator.tools.map((t, i) => (
                      <span key={i} className="badge-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeProfileTab === 'About' && (
                <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.5 }}>
                  {selectedCreator.about}
                </div>
              )}

              {activeProfileTab === 'Workflow' && (
                <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.5, backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Production Pipeline:</div>
                  {selectedCreator.workflow}
                </div>
              )}

              {activeProfileTab === 'Reviews' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>★ {selectedCreator.rating}</span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>({selectedCreator.reviewsCount} verified reviews)</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#475569', padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                    &ldquo;Ava delivered our 30s luxury campaign in 3 days with flawless lighting and exact brand tone.&rdquo; — LuxeLabel CEO
                  </div>
                </div>
              )}

              {/* Metrics Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '6px',
                backgroundColor: '#f8fafc',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>Starting Price</div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>${selectedCreator.startingPrice}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>Availability</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>Available now</div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>Response Time</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>{selectedCreator.responseTime}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => toggleShortlist(selectedCreator.id)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#334155'
                  }}
                >
                  {shortlistedIds.includes(selectedCreator.id) ? 'Shortlisted ✓' : 'Shortlist'}
                </button>
                <button
                  onClick={() => onInviteCreator(selectedCreator)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: '#6366f1',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  Invite to Project
                </button>
              </div>

              {/* Verification Signals */}
              <div style={{
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                border: '1px solid #bbf7d0',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  CreatorProof Verification Signals
                </div>
                {selectedCreator.badges.map((badge, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#15803d' }}>
                    <CheckCircle2 size={12} color="#16a34a" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
