import Link from 'next/link';

export default function RoutePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>CreatorProof AI</h2>
      <p style={{ color: '#64748b', margin: '12px 0' }}>This feature is integrated into the primary interactive dashboard.</p>
      <Link href="/" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'underline' }}>
        Return to Overview Showcase
      </Link>
    </div>
  );
}
