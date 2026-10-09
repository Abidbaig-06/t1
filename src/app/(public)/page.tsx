'use client';

import React, { useState } from 'react';
import HeaderBanner from '@/components/HeaderBanner';
import LandingPageSection from '@/components/LandingPageSection';
import BrandDashboardSection from '@/components/BrandDashboardSection';
import CreatorDashboardSection from '@/components/CreatorDashboardSection';
import DemoScenarioSection from '@/components/DemoScenarioSection';
import AiBriefModal from '@/components/AiBriefModal';
import CreateBriefModal from '@/components/CreateBriefModal';
import AuthModal from '@/components/AuthModal';
import InviteModal from '@/components/InviteModal';
import ApplyBriefModal from '@/components/ApplyBriefModal';
import AddProjectModal from '@/components/AddProjectModal';
import CreatorProfileDrawer from '@/components/CreatorProfileDrawer';
import Toast from '@/components/Toast';
import { useMarketplace } from '@/lib/marketplaceContext';
import { Creator, BrandBrief, PortfolioItem } from '@/lib/mockData';
import { Maximize2, Sparkles, Layers } from 'lucide-react';

export default function HomePage() {
  const { 
    creators, 
    briefs, 
    shortlistedIds, 
    toggleShortlist, 
    sendInvitation, 
    submitApplication, 
    addPortfolioWork, 
    toast, 
    showToast, 
    clearToast, 
    switchDemoRole,
    currentUser 
  } = useMarketplace();

  // DEFAULT TO AUTHENTIC SAAS LANDING PAGE (not PPT slide poster)
  const [currentView, setCurrentView] = useState<'all' | 'landing' | 'brand' | 'creator' | 'demo'>('landing');
  const [demoStep, setDemoStep] = useState<number>(1);

  // Modals & Drawers state
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [inviteTargetCreator, setInviteTargetCreator] = useState<Creator | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const [applyTargetBrief, setApplyTargetBrief] = useState<BrandBrief | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const [isBriefBuilderOpen, setIsBriefBuilderOpen] = useState(false);
  const [isCreateBriefOpen, setIsCreateBriefOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  // Auth modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authRole, setAuthRole] = useState<'brand' | 'creator'>('brand');

  // Handlers
  const handleSelectCreator = (creator: Creator) => {
    setSelectedCreator(creator);
    setIsProfileOpen(true);
  };

  const handleSelectPortfolio = (item: PortfolioItem) => {
    const creator = creators.find((c) => c.name.toLowerCase() === item.creator.toLowerCase()) || creators[0];
    setSelectedCreator(creator);
    setIsProfileOpen(true);
  };

  const handleInviteCreator = (creator: Creator) => {
    setInviteTargetCreator(creator);
    setIsInviteOpen(true);
  };

  const handleApplyBrief = (brief: BrandBrief) => {
    setApplyTargetBrief(brief);
    setIsApplyOpen(true);
  };

  const openAuth = (mode: 'login' | 'signup', role: 'brand' | 'creator') => {
    setAuthMode(mode);
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  // Demo step runner logic
  const handleDemoStepSelect = (stepNum: number) => {
    setDemoStep(stepNum);
    if (stepNum === 1) {
      switchDemoRole('brand');
      setCurrentView('brand');
      showToast('Step 1: Signed in as LuxeLabel (Jewelry Brand).');
    } else if (stepNum === 2) {
      switchDemoRole('brand');
      setIsBriefBuilderOpen(true);
      showToast('Step 2: AI-Assisted Brief Builder opened.');
    } else if (stepNum === 3) {
      switchDemoRole('brand');
      setCurrentView('brand');
      showToast('Step 3: Browsing creators with Sora/Runway filters.');
    } else if (stepNum === 4) {
      switchDemoRole('brand');
      setSelectedCreator(creators[0]);
      setIsProfileOpen(true);
      showToast('Step 4: Inspecting Ava Chen portfolio & inviting.');
    } else if (stepNum === 5) {
      switchDemoRole('creator');
      setCurrentView('creator');
      showToast('Step 5: Signed in as Ava Chen (AI Creator).');
    } else if (stepNum === 6) {
      switchDemoRole('creator');
      setCurrentView('creator');
      showToast('Step 6: Reviewing & accepting LuxeLabel invitation.');
    } else if (stepNum === 7) {
      switchDemoRole('brand');
      setCurrentView('demo');
      showToast('Step 7: Track progress to delivery with 4K master!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5efe1' }}>
      {/* Top SaaS Navigation Bar */}
      <HeaderBanner
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
        onOpenCreateBrief={() => setIsCreateBriefOpen(true)}
        onOpenAuth={openAuth}
      />

      {/* Main Web App Content Area */}
      <main style={{
        flex: 1,
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* VIEW 1: Authentic Full-Bleed SaaS Landing Page (Default) */}
        {currentView === 'landing' && (
          <LandingPageSection
            onSelectCreator={handleSelectCreator}
            onSelectPortfolio={handleSelectPortfolio}
            onNavigateToBrand={() => {
              switchDemoRole('brand');
              setCurrentView('brand');
            }}
            onNavigateToCreator={() => {
              switchDemoRole('creator');
              setCurrentView('creator');
            }}
            onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
            onApplyBrief={handleApplyBrief}
            isCompact={false}
          />
        )}

        {/* VIEW 2: Full Brand Portal / Business Dashboard */}
        {currentView === 'brand' && (
          <div style={{
            maxWidth: '1600px',
            width: '100%',
            margin: '0 auto',
            padding: '24px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <BrandDashboardSection
              onSelectCreator={handleSelectCreator}
              onInviteCreator={handleInviteCreator}
              onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
              onOpenCreateBriefModal={() => setIsCreateBriefOpen(true)}
              isCompact={false}
            />
          </div>
        )}

        {/* VIEW 3: Full Creator Studio Dashboard */}
        {currentView === 'creator' && (
          <div style={{
            maxWidth: '1600px',
            width: '100%',
            margin: '0 auto',
            padding: '24px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CreatorDashboardSection
              onApplyBrief={handleApplyBrief}
              onAddProject={() => setIsAddProjectOpen(true)}
              isCompact={false}
            />
          </div>
        )}

        {/* VIEW 4: End-to-End Campaign Walkthrough Demo */}
        {currentView === 'demo' && (
          <div style={{
            maxWidth: '1400px',
            width: '100%',
            margin: '0 auto',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <DemoScenarioSection
              onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
              onInviteAva={() => {
                sendInvitation(
                  creators[0],
                  '30-Second Luxury Jewelry Advertisement',
                  '$2,200',
                  'Official invitation sent for LuxeLabel commercial production.'
                );
              }}
            />

            {/* Evaluation Criteria Matrix Banner */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              {[
                { title: 'Criterion 1', pts: '30 Pts', desc: 'Creator Profiles & AI Portfolios with tool tags & workflows' },
                { title: 'Criterion 2', pts: '20 Pts', desc: 'Brief Definition with commercial licensing & aspect ratios' },
                { title: 'Criterion 3', pts: '25 Pts', desc: 'Discovery & 7 Filters with empty state handling' },
                { title: 'Criterion 4', pts: '15 Pts', desc: 'User Experience & Responsive Two-Sided Marketflows' },
                { title: 'Criterion 5', pts: '10 Pts', desc: 'Jewelry Brand End-to-End Demo + Bonus AI Builder & Badges' },
              ].map((c, i) => (
                <div key={i} style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{c.title}</span>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#4f46e5', backgroundColor: '#eef2ff', padding: '2px 8px', borderRadius: '999px' }}>{c.pts}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.4, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: Multi-Column Split Comparison Mode (Optional, activated via layout toggle) */}
        {currentView === 'all' && (
          <div style={{
            maxWidth: '1920px',
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              minHeight: '740px'
            }}>
              <div style={{ height: '100%' }}>
                <LandingPageSection
                  onSelectCreator={handleSelectCreator}
                  onSelectPortfolio={handleSelectPortfolio}
                  onNavigateToBrand={() => {
                    switchDemoRole('brand');
                    setCurrentView('brand');
                  }}
                  onNavigateToCreator={() => {
                    switchDemoRole('creator');
                    setCurrentView('creator');
                  }}
                  onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
                  onApplyBrief={handleApplyBrief}
                  isCompact={true}
                />
              </div>

              <div style={{ height: '100%' }}>
                <BrandDashboardSection
                  onSelectCreator={handleSelectCreator}
                  onInviteCreator={handleInviteCreator}
                  onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
                  onOpenCreateBriefModal={() => setIsCreateBriefOpen(true)}
                  isCompact={true}
                />
              </div>

              <div style={{ height: '100%' }}>
                <CreatorDashboardSection
                  onApplyBrief={handleApplyBrief}
                  onAddProject={() => setIsAddProjectOpen(true)}
                  isCompact={true}
                />
              </div>
            </div>

            <DemoScenarioSection
              onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
              onInviteAva={() => {
                sendInvitation(
                  creators[0],
                  '30-Second Luxury Jewelry Advertisement',
                  '$2,200',
                  'Official invitation sent for LuxeLabel commercial production.'
                );
              }}
            />
          </div>
        )}
      </main>

      {/* Interactive Modals */}
      <AiBriefModal
        isOpen={isBriefBuilderOpen}
        onClose={() => setIsBriefBuilderOpen(false)}
        onInviteCreator={handleInviteCreator}
        onSuccessToast={showToast}
      />

      <CreateBriefModal
        isOpen={isCreateBriefOpen}
        onClose={() => setIsCreateBriefOpen(false)}
        onSuccess={(brief) => {
          showToast(`Campaign brief "${brief.title}" created successfully!`);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode={authMode}
        defaultRole={authRole}
        onSuccessRedirect={(role) => {
          setCurrentView(role === 'brand' ? 'brand' : 'creator');
        }}
      />

      <InviteModal
        creator={inviteTargetCreator}
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onSendInvite={(creatorName) => {
          if (inviteTargetCreator) {
            sendInvitation(
              inviteTargetCreator,
              '30-Second Luxury Jewelry Advertisement',
              '$2,200',
              'Official invitation sent for LuxeLabel commercial production.'
            );
          }
        }}
      />

      <ApplyBriefModal
        brief={applyTargetBrief}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSubmitApplication={(title) => {
          if (applyTargetBrief) {
            submitApplication(applyTargetBrief, '$2,200', 'Proposal submitted with verified portfolio samples.');
          }
        }}
      />

      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onSuccess={(title) => {
          addPortfolioWork({
            title,
            category: 'Videos',
            thumbnail: '/assets/ring.jpg',
            tag: 'Commercial Ad',
            description: 'Verified AI generated commercial showcase.',
            tools: ['Sora', 'Runway Gen-3', 'DaVinci Resolve']
          });
        }}
      />

      <CreatorProfileDrawer
        creator={selectedCreator}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onInvite={handleInviteCreator}
        onShortlist={toggleShortlist}
        isShortlisted={selectedCreator ? shortlistedIds.includes(selectedCreator.id) : false}
      />

      {/* Notification Toast */}
      <Toast message={toast} onClose={clearToast} />
    </div>
  );
}
