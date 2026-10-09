'use client';

import React, { useState } from 'react';
import HeaderBanner from '@/components/HeaderBanner';
import CreatorDashboardSection from '@/components/CreatorDashboardSection';
import ApplyBriefModal from '@/components/ApplyBriefModal';
import AddProjectModal from '@/components/AddProjectModal';
import Toast from '@/components/Toast';
import { BrandBrief } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export default function CreatorPage() {
  const router = useRouter();
  const [applyTargetBrief, setApplyTargetBrief] = useState<BrandBrief | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApplyBrief = (brief: BrandBrief) => {
    setApplyTargetBrief(brief);
    setIsApplyOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f1f5f9' }}>
      <HeaderBanner
        currentView="creator"
        onViewChange={(v) => {
          if (v === 'all') router.push('/');
          else if (v === 'landing') router.push('/');
          else if (v === 'brand') router.push('/brand');
          else if (v === 'demo') router.push('/');
        }}
        onOpenBriefBuilder={() => router.push('/')}
      />

      <main style={{ flex: 1, padding: '24px', maxWidth: '1500px', width: '100%', margin: '0 auto' }}>
        <CreatorDashboardSection
          onApplyBrief={handleApplyBrief}
          onAddProject={() => setIsAddProjectOpen(true)}
          isCompact={false}
        />
      </main>

      <ApplyBriefModal
        brief={applyTargetBrief}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSubmitApplication={(title) => {
          setToastMessage(`Application submitted for "${title}"!`);
        }}
      />

      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onSuccess={(title) => {
          setToastMessage(`"${title}" published to portfolio!`);
        }}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
