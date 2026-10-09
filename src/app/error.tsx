'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Something went wrong</h2>
      <button
        onClick={() => reset()}
        style={{
          padding: '8px 16px',
          backgroundColor: '#6366f1',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 600
        }}
      >
        Try again
      </button>
    </div>
  );
}
