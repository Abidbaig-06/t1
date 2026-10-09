'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FEATURED_CREATORS, 
  BRAND_BRIEFS, 
  Creator, 
  BrandBrief, 
  CreatorWork,
  PortfolioItem,
  FEATURED_PORTFOLIOS
} from './mockData';

export interface UserSession {
  id: string;
  name: string;
  role: 'brand' | 'creator';
  email: string;
  brandName?: string;
  avatar?: string;
  title?: string;
}

export interface ProjectInvitation {
  id: string;
  briefId: string;
  briefTitle: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  budget: string;
  timeline: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  sentAt: string;
}

export interface ActiveProject {
  id: string;
  briefTitle: string;
  brandName: string;
  creatorName: string;
  creatorAvatar: string;
  budget: string;
  stage: 'brief' | 'in_progress' | 'revision' | 'delivered';
  deliverableName?: string;
  deliverablePreview?: string;
  isEscrowFunded: boolean;
  isCommercialRightsTransferred: boolean;
  notes: string[];
}

export interface CreatorApplication {
  id: string;
  briefId: string;
  briefTitle: string;
  creatorName: string;
  proposedFee: string;
  pitch: string;
  status: 'submitted' | 'shortlisted' | 'accepted';
  submittedAt: string;
}

interface MarketplaceContextType {
  currentUser: UserSession | null;
  login: (role: 'brand' | 'creator', email?: string, name?: string) => void;
  logout: () => void;
  switchDemoRole: (role: 'brand' | 'creator') => void;
  
  creators: Creator[];
  updateCreatorProfile: (updated: Partial<Creator>) => void;
  addPortfolioWork: (work: Omit<CreatorWork, 'id'>) => void;
  deletePortfolioWork: (workId: string) => void;
  
  briefs: BrandBrief[];
  createBrief: (newBrief: Omit<BrandBrief, 'id' | 'applicantsCount'>) => BrandBrief;
  
  invitations: ProjectInvitation[];
  sendInvitation: (creator: Creator, briefTitle: string, budget: string, message: string) => void;
  respondInvitation: (invitationId: string, accept: boolean) => void;
  
  projects: ActiveProject[];
  advanceProjectStage: (projectId: string, newStage: ActiveProject['stage'], deliverable?: string) => void;
  
  applications: CreatorApplication[];
  submitApplication: (brief: BrandBrief, proposedFee: string, pitch: string) => void;
  
  shortlistedIds: string[];
  toggleShortlist: (creatorId: string) => void;
  
  toast: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  // Current user state - defaults to null so Login and Sign Up render as shown in Image 1
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  const [creators, setCreators] = useState<Creator[]>(FEATURED_CREATORS);
  const [briefs, setBriefs] = useState<BrandBrief[]>(BRAND_BRIEFS);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['ava-chen']);
  const [toast, setToast] = useState<string | null>(null);

  // Invitations
  const [invitations, setInvitations] = useState<ProjectInvitation[]>([
    {
      id: 'inv-1',
      briefId: 'brief-1',
      briefTitle: '30-Second Luxury Jewelry Advertisement',
      brandName: 'LuxeLabel',
      creatorId: 'ava-chen',
      creatorName: 'Ava Chen',
      budget: '$2,200',
      timeline: '5 days',
      message: 'Hi Ava, we loved your ring commercial test! We would like to officially hire you for our Instagram 9:16 campaign.',
      status: 'pending',
      sentAt: 'Just now'
    }
  ]);

  // Active Projects
  const [projects, setProjects] = useState<ActiveProject[]>([
    {
      id: 'proj-1',
      briefTitle: '30-Second Luxury Jewelry Advertisement',
      brandName: 'LuxeLabel',
      creatorName: 'Ava Chen',
      creatorAvatar: '/assets/ava.jpg',
      budget: '$2,200',
      stage: 'delivered',
      deliverableName: 'LuxeLabel_Master_4K.mp4',
      deliverablePreview: '/assets/ring.jpg',
      isEscrowFunded: true,
      isCommercialRightsTransferred: true,
      notes: [
        'Brief generated with AI assistance (30s vertical 9:16)',
        'Ava Chen accepted invitation & milestone contract',
        'Initial Sora v3 cut approved with color grading in DaVinci',
        '4K master delivered with verified commercial license certificate'
      ]
    }
  ]);

  // Creator applications
  const [applications, setApplications] = useState<CreatorApplication[]>([
    {
      id: 'app-1',
      briefId: 'brief-1',
      briefTitle: '30-Second Luxury Jewelry Advertisement',
      creatorName: 'Ava Chen',
      proposedFee: '$2,200',
      pitch: 'I have verified Sora and Runway commercial licenses and specialize in luxury macro cinematography.',
      status: 'accepted',
      submittedAt: 'Today'
    }
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  const clearToast = () => {
    setToast(null);
  };

  const login = (role: 'brand' | 'creator', email?: string, name?: string) => {
    if (role === 'brand') {
      setCurrentUser({
        id: 'brand-1',
        name: name || 'Elena Vance',
        role: 'brand',
        brandName: 'LuxeLabel',
        email: email || 'elena@luxelabel.com',
        avatar: 'LL',
        title: 'VP Brand Marketing'
      });
      showToast('Logged in as LuxeLabel (Brand Account)');
    } else {
      setCurrentUser({
        id: 'creator-1',
        name: name || 'Ava Chen',
        role: 'creator',
        email: email || 'ava@creatorproof.ai',
        avatar: '/assets/ava.jpg',
        title: 'AI Filmmaker & Commercial Director'
      });
      showToast('Logged in as Ava Chen (AI Creator Account)');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.');
  };

  const switchDemoRole = (role: 'brand' | 'creator') => {
    login(role);
  };

  const updateCreatorProfile = (updated: Partial<Creator>) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === 'ava-chen' ? { ...c, ...updated } : c))
    );
    showToast('Profile updated successfully!');
  };

  const addPortfolioWork = (work: Omit<CreatorWork, 'id'>) => {
    const newWork: CreatorWork = {
      ...work,
      id: `w-${Date.now()}`
    };
    setCreators((prev) =>
      prev.map((c) => {
        if (c.id === 'ava-chen') {
          return {
            ...c,
            works: [newWork, ...c.works]
          };
        }
        return c;
      })
    );
    showToast(`Added "${newWork.title}" to portfolio!`);
  };

  const deletePortfolioWork = (workId: string) => {
    setCreators((prev) =>
      prev.map((c) => {
        if (c.id === 'ava-chen') {
          return {
            ...c,
            works: c.works.filter((w) => w.id !== workId)
          };
        }
        return c;
      })
    );
    showToast('Portfolio item removed.');
  };

  const createBrief = (newBriefData: Omit<BrandBrief, 'id' | 'applicantsCount'>): BrandBrief => {
    const newBrief: BrandBrief = {
      ...newBriefData,
      id: `brief-${Date.now()}`,
      applicantsCount: 0
    };
    setBriefs((prev) => [newBrief, ...prev]);
    showToast(`Campaign brief "${newBrief.title}" published!`);
    return newBrief;
  };

  const sendInvitation = (creator: Creator, briefTitle: string, budget: string, message: string) => {
    const newInv: ProjectInvitation = {
      id: `inv-${Date.now()}`,
      briefId: 'brief-custom',
      briefTitle,
      brandName: currentUser?.brandName || 'LuxeLabel',
      creatorId: creator.id,
      creatorName: creator.name,
      budget,
      timeline: '5 business days',
      message,
      status: 'pending',
      sentAt: 'Just now'
    };
    setInvitations((prev) => [newInv, ...prev]);
    showToast(`Project invitation dispatched to ${creator.name}! Escrow secured.`);
  };

  const respondInvitation = (invitationId: string, accept: boolean) => {
    setInvitations((prev) =>
      prev.map((inv) =>
        inv.id === invitationId
          ? { ...inv, status: accept ? 'accepted' : 'declined' }
          : inv
      )
    );

    const targetInv = invitations.find((i) => i.id === invitationId);
    if (accept && targetInv) {
      const newProj: ActiveProject = {
        id: `proj-${Date.now()}`,
        briefTitle: targetInv.briefTitle,
        brandName: targetInv.brandName,
        creatorName: targetInv.creatorName,
        creatorAvatar: '/assets/ava.jpg',
        budget: targetInv.budget,
        stage: 'in_progress',
        isEscrowFunded: true,
        isCommercialRightsTransferred: false,
        notes: [
          `Accepted project for ${targetInv.brandName}`,
          'Smart escrow funded ($2,200)',
          'Milestone 1: Generating scene storyboard & Sora prompt sequences'
        ]
      };
      setProjects((prev) => [newProj, ...prev]);
      showToast(`Accepted invitation! Collaboration workspace created.`);
    } else {
      showToast('Invitation declined.');
    }
  };

  const advanceProjectStage = (projectId: string, newStage: ActiveProject['stage'], deliverable?: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const isDelivered = newStage === 'delivered';
          return {
            ...p,
            stage: newStage,
            deliverableName: deliverable || p.deliverableName || 'LuxeLabel_Master_4K.mp4',
            deliverablePreview: p.deliverablePreview || '/assets/ring.jpg',
            isCommercialRightsTransferred: isDelivered ? true : p.isCommercialRightsTransferred,
            notes: [
              ...p.notes,
              `Advanced to stage: ${newStage.toUpperCase()} (${new Date().toLocaleTimeString()})`
            ]
          };
        }
        return p;
      })
    );
    showToast(`Project stage updated to: ${newStage.toUpperCase()}`);
  };

  const submitApplication = (brief: BrandBrief, proposedFee: string, pitch: string) => {
    const newApp: CreatorApplication = {
      id: `app-${Date.now()}`,
      briefId: brief.id,
      briefTitle: brief.title,
      creatorName: currentUser?.name || 'Ava Chen',
      proposedFee,
      pitch,
      status: 'submitted',
      submittedAt: 'Just now'
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application submitted to ${brief.brand} for "${brief.title}"!`);
  };

  const toggleShortlist = (creatorId: string) => {
    setShortlistedIds((prev) => {
      const exists = prev.includes(creatorId);
      const next = exists ? prev.filter((id) => id !== creatorId) : [...prev, creatorId];
      showToast(exists ? 'Removed creator from shortlist' : 'Saved creator to shortlist!');
      return next;
    });
  };

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        login,
        logout,
        switchDemoRole,
        creators,
        updateCreatorProfile,
        addPortfolioWork,
        deletePortfolioWork,
        briefs,
        createBrief,
        invitations,
        sendInvitation,
        respondInvitation,
        projects,
        advanceProjectStage,
        applications,
        submitApplication,
        shortlistedIds,
        toggleShortlist,
        toast,
        showToast,
        clearToast
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
