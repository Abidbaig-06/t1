'use client';

import React, { useState } from 'react';
import HeaderBanner from '@/components/HeaderBanner';
import BrandDashboardSection from '@/components/BrandDashboardSection';
import AiBriefModal from '@/components/AiBriefModal';
import InviteModal from '@/components/InviteModal';
import CreatorProfileDrawer from '@/components/CreatorProfileDrawer';
import Toast from '@/components/Toast';
import { Creator } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export default function BrandPage() {
  const router = useRouter();
  const [isBriefBuilderOpen, setIsBriefBuilderOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [inviteTargetCreator, setInviteTargetCreator] = useState<Creator | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['ava-chen']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectCreator = (creator: Creator) => {
    setSelectedCreator(creator);
    setIsProfileOpen(true);
  };

  const handleInviteCreator = (creator: Creator) => {
    setInviteTargetCreator(creator);
    setIsInviteOpen(true);
  };

  const toggleShortlist = (creatorId: string) => {
    setShortlistedIds((prev) => {
      const exists = prev.includes(creatorId);
      const next = exists ? prev.filter((id) => id !== creatorId) : [...prev, creatorId];
      setToastMessage(exists ? 'Removed from shortlist' : 'Added to shortlisted creators!');
      return next;
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f1f5f9' }}>
      <HeaderBanner
        currentView="brand"
        onViewChange={(v) => {
          if (v === 'all') router.push('/');
          else if (v === 'landing') router.push('/');
          else if (v === 'creator') router.push('/creator');
          else if (v === 'demo') router.push('/');
        }}
        onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
      />

      <main style={{ flex: 1, padding: '24px', maxWidth: '1500px', width: '100%', margin: '0 auto' }}>
        <BrandDashboardSection
          onSelectCreator={handleSelectCreator}
          onInviteCreator={handleInviteCreator}
          onOpenBriefBuilder={() => setIsBriefBuilderOpen(true)}
          isCompact={false}
        />
      </main>

      <AiBriefModal
        isOpen={isBriefBuilderOpen}
        onClose={() => setIsBriefBuilderOpen(false)}
        onInviteCreator={handleInviteCreator}
        onSuccessToast={setToastMessage}
      />

      <InviteModal
        creator={inviteTargetCreator}
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onSendInvite={(creatorName) => {
          setToastMessage(`Project invitation sent to ${creatorName}! Escrow funded.`);
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

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
