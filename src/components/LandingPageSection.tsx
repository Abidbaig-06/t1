'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Video, 
  CheckCircle2, 
  Layers, 
  Briefcase, 
  Share2, 
  ExternalLink,
  Play,
  Star,
  Clock,
  MapPin,
  Check,
  Send,
  Zap,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useMarketplace } from '@/lib/marketplaceContext';
import { Creator, PortfolioItem, BrandBrief } from '@/lib/mockData';

interface LandingPageSectionProps {
  onSelectCreator: (creator: Creator) => void;
  onSelectPortfolio: (item: PortfolioItem) => void;
  onNavigateToBrand: () => void;
  onNavigateToCreator: () => void;
  onOpenBriefBuilder?: () => void;
  onApplyBrief?: (brief: BrandBrief) => void;
  isCompact?: boolean;
}

export default function LandingPageSection({
  onSelectCreator,
  onSelectPortfolio,
  onNavigateToBrand,
  onNavigateToCreator,
  onOpenBriefBuilder,
  onApplyBrief,
  isCompact = false,
}: LandingPageSectionProps) {
  const { creators, briefs, shortlistedIds, toggleShortlist } = useMarketplace();

  const [activePortfolioCategory, setActivePortfolioCategory] = useState('All');
  const [activeCreatorFilter, setActiveCreatorFilter] = useState('All');
  const [isPlayingDemoVideo, setIsPlayingDemoVideo] = useState(false);

  // Quick AI Playground state right on landing page
  const [playgroundPrompt, setPlaygroundPrompt] = useState(
    'I own a jewellery brand and need a 30-second luxury AI advertisement for Instagram.'
  );
  const [playgroundGenerated, setPlaygroundGenerated] = useState(true);

  const portfolioItems: PortfolioItem[] = [
    { id: 'p1', title: 'Luxury Product Film', creator: 'Ava Chen', category: 'Videos', thumbnail: '/assets/ring.jpg', views: '28.4k', likes: '2.1k', tag: 'Commercial Film' },
    { id: 'p2', title: 'Spirit Forest Animation', creator: 'Maya Singh', category: 'Animations', thumbnail: '/assets/animation.jpg', views: '34.2k', likes: '3.8k', tag: 'Motion VFX' },
    { id: 'p3', title: 'Lumière Nocturne Perfume', creator: 'Rohan Mehta', category: 'Images', thumbnail: '/assets/perfume.jpg', views: '19.5k', likes: '1.4k', tag: '3D CAD Render' },
    { id: 'p4', title: 'Hologram Couture Lookbook', creator: 'Sara Khan', category: 'Images', thumbnail: '/assets/fashion.jpg', views: '42.1k', likes: '4.6k', tag: 'AI Fashion' },
    { id: 'p5', title: 'Tourbillon Chronograph Macro', creator: 'Rohan Mehta', category: 'Images', thumbnail: '/assets/watch.jpg', views: '22.8k', likes: '1.9k', tag: 'Luxury 3D' },
    { id: 'p6', title: 'Midnight Velocity Hypercar', creator: 'Ava Chen', category: 'Videos', thumbnail: '/assets/car.jpg', views: '38.9k', likes: '3.2k', tag: 'Automotive VFX' },
  ];

  const filteredPortfolios = portfolioItems.filter((item) => {
    if (activePortfolioCategory === 'All') return true;
    if (activePortfolioCategory === 'Videos' && item.category === 'Videos') return true;
    if (activePortfolioCategory === 'Images' && item.category === 'Images') return true;
    if (activePortfolioCategory === '3D & Motion' && (item.category === 'Animations' || item.tag.includes('3D'))) return true;
    return true;
  });

  const filteredCreators = creators.filter((c) => {
    if (activeCreatorFilter === 'All') return true;
    return c.tools.some((t) => t.toLowerCase().includes(activeCreatorFilter.toLowerCase())) ||
      c.specialization.toLowerCase().includes(activeCreatorFilter.toLowerCase());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', width: '100%' }}>
      {/* HERO SECTION (MINIMALIST CENTERED LAYOUT MATCHING IMAGE 1) */}
      <section style={{
        position: 'relative',
        padding: '90px 20px 60px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Subtle Background Decorative Grid (matches Image 1) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, rgba(230, 218, 200, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(230, 218, 200, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)',
          opacity: 0.65
        }} />

        {/* Soft Radial Aura behind the center */}
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '560px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(230, 212, 176, 0.45) 0%, rgba(175, 196, 213, 0.2) 40%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Content Wrapper */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '860px',
          margin: '0 auto'
        }}>
          {/* ByteXL Hackathon & Kampus.VC Challenge Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            backgroundColor: 'rgba(122, 5, 14, 0.06)',
            border: '1px solid rgba(122, 5, 14, 0.18)',
            color: '#7a050e',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.3px',
            marginBottom: '20px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#7a050e' }} />
            ByteXL HackXlarate 2026 • Kampus.VC Challenge
          </div>

          {/* Main Problem Statement / Headline */}
          <h1 style={{
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-1.8px',
            color: '#1f1610',
            margin: 0,
            maxWidth: '780px'
          }}>
            Where AI Creativity<br />
            <span style={{
              background: 'linear-gradient(135deg, #7a050e 0%, #b85d38 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Meets Opportunity
            </span>
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '17px',
            color: '#6b5e52',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '20px 0 32px 0'
          }}>
            The AI-native marketplace connecting verified AI filmmakers, animators, and generative artists with leading brands and creative agencies.
          </p>

          {/* Two Centered Action Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px'
          }}>
            {/* Primary Pill Button */}
            <button
              onClick={onNavigateToBrand}
              style={{
                backgroundColor: '#7a050e',
                color: '#ffffff',
                padding: '12px 30px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 700,
                boxShadow: '0 8px 24px -4px rgba(122, 5, 14, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#940612';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#7a050e';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Brand / Agency Briefs
            </button>

            {/* Secondary Pill Button */}
            <button
              onClick={onNavigateToCreator}
              style={{
                backgroundColor: '#ffffff',
                color: '#1f1610',
                border: '1px solid #e6dac8',
                padding: '12px 28px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(31, 22, 16, 0.04)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#faf5eb';
                e.currentTarget.style.borderColor = '#c79c5e';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e6dac8';
              }}
            >
              Get hired
            </button>
          </div>

          {/* Trust Statement */}
          <p style={{
            fontSize: '13px',
            color: '#6b5e52',
            margin: 0
          }}>
            Trusted by <strong style={{ color: '#1f1610', fontWeight: 800 }}>50K+ teams</strong> from creative agencies to high growth tech companies
          </p>
        </div>
      </section>

      {/* SECTION 2: FEATURED AI CREATORS DIRECTORY */}
      <section id="creators-section" style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', scrollMarginTop: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#7a050e', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              World-Class Generative Talent
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1f1610', letterSpacing: '-0.5px', marginTop: '4px' }}>
              Featured AI Creators
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['All', 'Sora', 'Runway', 'Midjourney', 'Blender'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCreatorFilter(filter)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: activeCreatorFilter === filter ? '#7a050e' : '#ffffff',
                  color: activeCreatorFilter === filter ? '#ffffff' : '#6b5e52',
                  border: activeCreatorFilter === filter ? '1px solid #7a050e' : '1px solid #e6dac8',
                  transition: 'all 0.15s ease'
                }}
              >
                {filter}
              </button>
            ))}
            <button
              onClick={onNavigateToBrand}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#7a050e',
                marginLeft: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Browse All 2,450+ Creators <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Creators Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {filteredCreators.map((creator) => {
            const isShortlisted = shortlistedIds.includes(creator.id);
            return (
              <div
                key={creator.id}
                onClick={() => onSelectCreator(creator)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e6dac8',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 2px 8px rgba(31, 22, 16, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#7a050e';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(122, 5, 14, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e6dac8';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(31, 22, 16, 0.04)';
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative', width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src={creator.avatar} alt={creator.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#1f1610' }}>{creator.name}</span>
                      {creator.verified ? (
                        <span className="badge-verified" style={{ fontSize: '10px', backgroundColor: '#fbebed', color: '#7a050e', border: '1px solid #e6d4b0' }}>✓ Verified</span>
                      ) : (
                        <span className="badge-pending" style={{ fontSize: '9px' }}>Pending</span>
                      )}
                    </div>
                    <span style={{ fontSize: '11px', color: '#6b5e52' }}>{creator.role}</span>
                  </div>
                </div>

                {/* Thumbnail work strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {creator.works.map((w) => (
                    <div key={w.id} style={{ position: 'relative', height: '64px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#1f1610' }}>
                      <Image src={w.thumbnail} alt={w.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>

                {/* Tools & Rate */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {creator.tools.slice(0, 3).map((t, idx) => (
                    <span key={idx} style={{ fontSize: '10px', padding: '2px 7px', backgroundColor: '#eef3f7', color: '#2c4251', border: '1px solid #afc4d5', borderRadius: '6px', fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #faf5eb', paddingTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#6b5e52' }}>From </span>
                    <strong style={{ fontSize: '14px', color: '#7a050e' }}>${creator.startingPrice}</strong>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#7a050e' }}>
                    View Profile →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: LIVE BRAND CAMPAIGNS & BRIEFS */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#7a050e', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Funded Brand Opportunities
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1f1610', letterSpacing: '-0.5px', marginTop: '4px' }}>
              Explore Live Brand Briefs
            </h2>
          </div>
          <button
            onClick={onNavigateToCreator}
            style={{ fontSize: '12px', fontWeight: 700, color: '#7a050e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            Browse All Briefs in Creator Studio <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {briefs.map((brief) => (
            <div
              key={brief.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6dac8',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(31, 22, 16, 0.03)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#6b5e52' }}>{brief.brand}</span>
                    <span style={{ fontSize: '9px', padding: '1px 7px', backgroundColor: '#fbebed', color: '#7a050e', border: '1px solid #e6d4b0', borderRadius: '4px', fontWeight: 700 }}>✓ Verified Brand</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#7a050e', backgroundColor: '#fbf7ee', border: '1px solid #e6d4b0', padding: '2px 8px', borderRadius: '6px' }}>{brief.budget}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1f1610', lineHeight: 1.3 }}>
                  {brief.title}
                </h3>

                <p style={{ fontSize: '12px', color: '#6b5e52', marginTop: '8px', lineHeight: 1.5 }}>
                  {brief.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  {brief.tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '10px', padding: '2px 7px', backgroundColor: '#eef3f7', color: '#2c4251', border: '1px solid #afc4d5', borderRadius: '6px', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #faf5eb', paddingTop: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#948677' }}>Deadline: {brief.deadline}</span>
                  <button
                    onClick={() => onApplyBrief(brief)}
                    style={{
                      padding: '7px 16px',
                      backgroundColor: '#7a050e',
                      color: '#ffffff',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      boxShadow: '0 2px 8px rgba(122, 5, 14, 0.25)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE AI BRIEF BUILDER PLAYGROUND (BONUS FEATURE) */}
      <section style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        borderRadius: '24px',
        border: '1px solid #e6dac8',
        padding: '36px',
        boxShadow: '0 10px 30px rgba(31, 22, 16, 0.04)',
        background: 'linear-gradient(145deg, #ffffff 0%, #faf5eb 100%)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fbf7ee', color: '#7a050e', border: '1px solid #e6d4b0', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>
              <Sparkles size={13} color="#7a050e" />
              AI-Assisted Brief Builder (Bonus Feature)
            </div>

            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#1f1610', letterSpacing: '-0.5px' }}>
              Turn Rough Ideas into <br />
              Production-Grade Briefs in Seconds
            </h2>

            <p style={{ fontSize: '14px', color: '#6b5e52', marginTop: '10px', lineHeight: 1.6 }}>
              No complex creative agency briefs needed. Enter natural language instructions, and our AI pipeline extracts the required duration, aspect ratio, aesthetic style, deliverables, and commercial buyout terms.
            </p>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea
                rows={3}
                value={playgroundPrompt}
                onChange={(e) => setPlaygroundPrompt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #e6dac8',
                  fontSize: '13px',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  resize: 'none',
                  color: '#1f1610'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={onOpenBriefBuilder}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#7a050e',
                    color: '#ffffff',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(122, 5, 14, 0.3)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Sparkles size={16} />
                  Open Full AI Brief Builder Modal
                </button>
              </div>
            </div>
          </div>

          {/* Structured Output Visualization Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e6dac8',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(31, 22, 16, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} color="#7a050e" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1f1610' }}>Auto-Structured Brief Spec</span>
              </div>
              <span style={{ backgroundColor: '#fbebed', color: '#7a050e', border: '1px solid #e6d4b0', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                Ready to Publish
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '8px 10px', backgroundColor: '#faf5eb', borderRadius: '8px', border: '1px solid #e6dac8' }}>
                <span style={{ fontSize: '10px', color: '#6b5e52' }}>Brand &amp; Title</span>
                <div style={{ fontWeight: 800, color: '#1f1610' }}>LuxeLabel Jewelry Ad</div>
              </div>
              <div style={{ padding: '8px 10px', backgroundColor: '#faf5eb', borderRadius: '8px', border: '1px solid #e6dac8' }}>
                <span style={{ fontSize: '10px', color: '#6b5e52' }}>Format &amp; Ratio</span>
                <div style={{ fontWeight: 800, color: '#1f1610' }}>30s • 9:16 Vertical Reels</div>
              </div>
              <div style={{ padding: '8px 10px', backgroundColor: '#faf5eb', borderRadius: '8px', border: '1px solid #e6dac8' }}>
                <span style={{ fontSize: '10px', color: '#6b5e52' }}>Aesthetic Style</span>
                <div style={{ fontWeight: 800, color: '#1f1610' }}>Luxury Cinematic Macro</div>
              </div>
              <div style={{ padding: '8px 10px', backgroundColor: '#faf5eb', borderRadius: '8px', border: '1px solid #e6dac8' }}>
                <span style={{ fontSize: '10px', color: '#6b5e52' }}>Allocated Budget</span>
                <div style={{ fontWeight: 800, color: '#7a050e' }}>$1,500 – $3,000 USD</div>
              </div>
            </div>

            <div style={{ marginTop: '14px', padding: '10px', backgroundColor: '#fbf7ee', borderRadius: '8px', border: '1px solid #e6d4b0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative', width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden' }}>
                  <Image src="/assets/ava.jpg" alt="Ava" fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#1f1610' }}>Ava Chen</span>
                  <span style={{ fontSize: '10px', color: '#7a050e', fontWeight: 700, marginLeft: '6px' }}>98% Compatibility</span>
                </div>
              </div>
              <button
                onClick={onOpenBriefBuilder}
                style={{ fontSize: '11px', fontWeight: 700, color: '#7a050e', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Review Recommendations →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW THE MARKETPLACE WORKS (4 STEPS) */}
      <section id="how-it-works-section" style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', scrollMarginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#7a050e', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            Frictionless Two-Sided Workflow
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1f1610', letterSpacing: '-0.5px', marginTop: '4px' }}>
            How the Marketplace Works
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
          {[
            { step: '01', title: 'Post or Explore', desc: 'Brands post detailed brief requirements or browse verified portfolios directly.', color: '#7a050e' },
            { step: '02', title: 'AI Match & Connect', desc: 'Compatibility algorithm ranks top creators. Brands shortlist and send escrow-backed invites.', color: '#c79c5e' },
            { step: '03', title: 'Create & Collaborate', desc: 'Work in real-time milestone workspaces with storyboard reviews and revision iterations.', color: '#5b7d99' },
            { step: '04', title: 'Verified Delivery', desc: 'Receive high-resolution masters, automatic copyright provenance hash, and commercial IP transfer.', color: '#7a050e' },
          ].map((st) => (
            <div key={st.step} style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e6dac8', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(31, 22, 16, 0.03)' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: st.color }}>{st.step}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1f1610' }}>{st.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b5e52', lineHeight: 1.5 }}>{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: FEATURED AI PORTFOLIOS GALLERY */}
      <section style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#7a050e', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Generative Masterpieces
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1f1610', letterSpacing: '-0.5px', marginTop: '4px' }}>
              Featured AI Portfolios
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Videos', 'Images', '3D & Motion'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePortfolioCategory(tab)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: activePortfolioCategory === tab ? '#7a050e' : '#ffffff',
                  color: activePortfolioCategory === tab ? '#ffffff' : '#6b5e52',
                  border: activePortfolioCategory === tab ? '1px solid #7a050e' : '1px solid #e6dac8',
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
          {filteredPortfolios.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectPortfolio(item)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e6dac8',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(31, 22, 16, 0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(122, 5, 14, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(31, 22, 16, 0.04)';
              }}
            >
              <div style={{ position: 'relative', height: '200px', backgroundColor: '#1f1610' }}>
                <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: '#afc4d5',
                  color: '#1a2d3d',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  {item.tag}
                </span>
                <span style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(31, 22, 16, 0.75)',
                  color: '#ffffff',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  👁️ {item.views}
                </span>
              </div>

              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1f1610' }}>{item.title}</h4>
                  <span style={{ fontSize: '11px', color: '#6b5e52' }}>by {item.creator}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#7a050e', fontWeight: 700 }}>
                  Commercial Use ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: CALL TO ACTION BANNER */}
      <section style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        background: 'linear-gradient(135deg, #2b0205 0%, #7a050e 60%, #170103 100%)',
        borderRadius: '24px',
        padding: '50px 40px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 20px 40px rgba(122, 5, 14, 0.25)'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Ready to bring your next creative campaign to life?
          </h2>
          <p style={{ fontSize: '15px', color: '#e6d4b0', marginTop: '12px', lineHeight: 1.5 }}>
            Join hundreds of brands producing cinematic commercials with verified AI creators.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            onClick={onNavigateToBrand}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e6d4b0',
              color: '#2b0205',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Hire AI Creators
          </button>
          <button
            onClick={onNavigateToCreator}
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              border: '1px solid rgba(230, 212, 176, 0.4)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Join as Creator
          </button>
        </div>
      </section>

      {/* PRODUCTION FOOTER */}
      <footer style={{
        borderTop: '1px solid #e6dac8',
        padding: '40px 0 20px',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        color: '#6b5e52',
        fontSize: '13px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '32px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #7a050e, #c79c5e)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>
                AI
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#1f1610' }}>
                AI Content Creator <span style={{ color: '#7a050e' }}>Marketplace</span>
              </span>
            </div>
            <p style={{ maxWidth: '320px', lineHeight: 1.5 }}>
              The AI-Native Marketplace for Creators and Brands. Built for ByteXL HackXlarate 2026 Kampus.VC Challenge.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1f1610', marginBottom: '12px' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ cursor: 'pointer' }} onClick={onNavigateToBrand}>Explore Creators</span>
              <span style={{ cursor: 'pointer' }} onClick={onNavigateToCreator}>Brand Briefs</span>
              <span style={{ cursor: 'pointer' }} onClick={onOpenBriefBuilder}>AI Brief Builder</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1f1610', marginBottom: '12px' }}>Verification</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span>Identity KYC</span>
              <span>Commercial Software Audits</span>
              <span>IP Provenance Escrow</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1f1610', marginBottom: '12px' }}>Hackathon</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span>ByteXL HackXlarate 2026</span>
              <span>Kampus.VC Track</span>
              <span style={{ color: '#7a050e', fontWeight: 700 }}>● Demo System Live</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e6dac8', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>© 2026 CreatorProof AI. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
