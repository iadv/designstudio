'use client';

import Link from 'next/link';
import { MOCK_DESIGNERS } from '@/lib/mockData';


export default function StudioLandingPage() {
  return (
    <div
      style={{
        background: '#070710',
        color: '#f0ede8',
        minHeight: '100vh',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&display=swap"
        rel="stylesheet"
      />

      {/* Nav */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px',
          borderBottom: '1px solid #ffffff0d',
        }}
      >
        <div style={{ fontSize: '16px', letterSpacing: '0.15em', fontWeight: 500, color: '#c9a96e' }}>
          DESIGNSTUDIO
        </div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '13px', opacity: 0.5, letterSpacing: '0.1em' }}>
          <Link href="/studio/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin</Link>
          <a href="#designers" style={{ color: 'inherit', textDecoration: 'none' }}>Designers</a>
          <a href="mailto:hello@designstudio.ai" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ padding: '120px 48px 80px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            border: '1px solid #c9a96e44',
            color: '#c9a96e',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          AI Virtual Try-On · SaaS for Fashion
        </div>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 300,
            lineHeight: 1,
            margin: '0 0 24px',
            letterSpacing: '-0.02em',
          }}
        >
          Where fashion
          <br />
          <em style={{ color: '#c9a96e' }}>meets you</em>
        </h1>

        <p
          style={{
            fontSize: '18px',
            opacity: 0.5,
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 48px',
            fontWeight: 300,
          }}
        >
          Each designer gets their own immersive portal. Their customers upload a photo and see themselves wearing every piece — instantly.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#designers"
            style={{
              background: '#c9a96e',
              color: '#070710',
              padding: '16px 40px',
              fontSize: '13px',
              letterSpacing: '0.15em',
              fontWeight: 600,
              textDecoration: 'none',
              textTransform: 'uppercase',
              display: 'inline-block',
            }}
          >
            Explore Designers
          </a>
          <a
            href="mailto:hello@designstudio.ai"
            style={{
              background: 'transparent',
              color: '#f0ede8',
              border: '1px solid #ffffff33',
              padding: '15px 32px',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              display: 'inline-block',
            }}
          >
            Get Your Portal →
          </a>
        </div>
      </div>

      {/* Divider + feature highlights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid #ffffff0a',
          borderBottom: '1px solid #ffffff0a',
          margin: '0 48px',
        }}
      >
        {[
          { icon: '◎', title: 'Upload Once', desc: 'Customer uploads their photo once — works across all designer portals' },
          { icon: '⚡', title: 'Instant Generation', desc: 'AI generates you in every clothing item simultaneously' },
          { icon: '↗', title: 'Seamless Commerce', desc: 'View on Instagram, DM the designer, or buy directly from each look' },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              padding: '48px 40px',
              borderRight: i < 2 ? '1px solid #ffffff0a' : 'none',
            }}
          >
            <div style={{ fontSize: '24px', color: '#c9a96e', marginBottom: '16px' }}>{f.icon}</div>
            <div style={{ fontWeight: 500, marginBottom: '8px', fontSize: '15px' }}>{f.title}</div>
            <div style={{ fontSize: '14px', opacity: 0.4, lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Designers grid */}
      <div id="designers" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#c9a96e', marginBottom: '16px', textTransform: 'uppercase' }}>
            Live Portals
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '48px', fontWeight: 300, margin: 0 }}>
            Designer Collection
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2px' }}>
          {MOCK_DESIGNERS.map((designer) => (
            <Link
              key={designer.id}
              href={`/studio/${designer.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  background: designer.brand_color_primary,
                  border: `1px solid ${designer.brand_color_accent}22`,
                  padding: '48px 40px',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = designer.brand_color_accent + '88';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = designer.brand_color_accent + '22';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.3em',
                    color: designer.brand_color_accent,
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                  }}
                >
                  @{designer.instagram_handle}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '36px',
                    fontWeight: 300,
                    color: designer.brand_color_text,
                    margin: '0 0 12px',
                  }}
                >
                  {designer.name}
                </h3>
                <p style={{ fontSize: '14px', color: designer.brand_color_text, opacity: 0.45, lineHeight: 1.6, margin: '0 0 32px' }}>
                  {designer.bio}
                </p>
                <div
                  style={{
                    color: designer.brand_color_accent,
                    fontSize: '13px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Try On Collection →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
