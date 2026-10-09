import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'sans-serif',
      gap: '12px'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>404 — Page Not Found</h2>
      <p style={{ fontSize: '13px', color: '#64748b' }}>The page you requested could not be found.</p>
      <Link
        href="/"
        style={{
          marginTop: '8px',
          padding: '8px 16px',
          backgroundColor: '#6366f1',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 600
        }}
      >
        Return to CreatorProof AI
      </Link>
    </div>
  );
}
