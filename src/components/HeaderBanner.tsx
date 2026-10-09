'use client';

import React from 'react';
import { 
  Sparkles, 
  LogIn, 
  LogOut, 
  UserPlus
} from 'lucide-react';
import { useMarketplace } from '@/lib/marketplaceContext';

interface HeaderBannerProps {
  currentView: 'all' | 'landing' | 'brand' | 'creator' | 'demo';
  onViewChange: (view: 'all' | 'landing' | 'brand' | 'creator' | 'demo') => void;
  onOpenBriefBuilder?: () => void;
  onOpenCreateBrief?: () => void;
  onOpenAuth?: (mode: 'login' | 'signup', role: 'brand' | 'creator') => void;
}

export default function HeaderBanner({
  currentView,
  onViewChange,
  onOpenBriefBuilder,
  onOpenCreateBrief,
  onOpenAuth
}: HeaderBannerProps) {
  const { currentUser, logout, switchDemoRole } = useMarketplace();

  const handleLogoClick = () => {
    onViewChange('landing');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreCreators = () => {
    if (currentView !== 'landing') {
      onViewChange('landing');
      setTimeout(() => {
        document.getElementById('creators-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('creators-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowItWorks = () => {
    if (currentView !== 'landing') {
      onViewChange('landing');
      setTimeout(() => {
        document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e6dac8',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 32px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        {/* Left Branding with user palette */}
        <div 
          onClick={handleLogoClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Logo Icon in Deep Burgundy with Gold Glow */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #7a050e 0%, #9e1b24 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px -2px rgba(122, 5, 14, 0.35)',
            color: '#ffffff',
            flexShrink: 0
          }}>
            <Sparkles size={20} color="#ffffff" />
          </div>

          {/* Logo Typography */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1.15 }}>
              <span style={{
                fontSize: '19px',
                fontWeight: 800,
                color: '#1f1610',
                letterSpacing: '-0.4px'
              }}>
                AI Content Creator
              </span>
              <span style={{
                fontSize: '19px',
                fontWeight: 800,
                color: '#7a050e',
                letterSpacing: '-0.4px'
              }}>
                Marketplace
              </span>
              <span style={{
                backgroundColor: '#fbf7ee',
                color: '#7a050e',
                border: '1px solid #e6d4b0',
                fontSize: '11px',
                fontWeight: 700,
                padding: '1px 8px',
                borderRadius: '6px',
                letterSpacing: '0.2px',
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                Kampus.VC
              </span>
            </div>
            <span style={{
              fontSize: '9.5px',
              fontWeight: 700,
              color: '#6b5e52',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              marginTop: '3px'
            }}>
              ByteXL HackXlarate 2026 • Verified Platform
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '36px'
        }}>
          <button
            onClick={handleExploreCreators}
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1f1610',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 0',
              transition: 'color 0.15s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#7a050e')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#1f1610')}
          >
            Explore Creators
          </button>

          <button
            onClick={handleHowItWorks}
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1f1610',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 0',
              transition: 'color 0.15s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#7a050e')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#1f1610')}
          >
            How It Works
          </button>
        </nav>

        {/* Right Buttons */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => onViewChange(currentUser.role === 'brand' ? 'brand' : 'creator')}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#7a050e',
                backgroundColor: '#fbf7ee',
                border: '1px solid #e6d4b0',
                padding: '7px 14px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Go to {currentUser.role === 'brand' ? 'Brand Portal' : 'Creator Studio'}
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: '#faf5eb',
              border: '1px solid #e6dac8',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#1f1610'
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#15803d' }} />
              {currentUser.role === 'brand' ? 'LuxeLabel' : 'Ava Chen'}
            </div>
            <button
              onClick={logout}
              title="Logout"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid #e6dac8',
                backgroundColor: '#ffffff',
                color: '#6b5e52',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Login Button with user palette */}
            <button
              onClick={() => onOpenAuth?.('login', 'brand')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                backgroundColor: '#ffffff',
                border: '1px solid #e6dac8',
                color: '#1f1610',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#faf5eb';
                e.currentTarget.style.borderColor = '#e6d4b0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#e6dac8';
              }}
            >
              <LogIn size={15} color="#1f1610" />
              Login
            </button>

            {/* Sign Up Button in Deep Burgundy */}
            <button
              onClick={() => onOpenAuth?.('signup', 'brand')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                backgroundColor: '#7a050e',
                color: '#ffffff',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px -2px rgba(122, 5, 14, 0.35)',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5e030a')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#7a050e')}
            >
              <UserPlus size={15} color="#ffffff" />
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
