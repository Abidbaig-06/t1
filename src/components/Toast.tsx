'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      padding: '12px 18px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 200,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      animation: 'fadeIn 0.25s ease-out',
      maxWidth: '420px',
      fontSize: '13px',
      fontWeight: 600
    }}>
      <CheckCircle2 size={18} color="#10b981" />
      <span style={{ flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ color: '#94a3b8' }}>
        <X size={14} />
      </button>
    </div>
  );
}
