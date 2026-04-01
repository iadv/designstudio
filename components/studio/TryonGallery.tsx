'use client';

import { Designer, ClothingItem, TryonResult } from '@/lib/types';
import { SessionState } from './DesignerPortal';
import ItemCard from './ItemCard';

interface Props {
  designer: Designer;
  clothing: ClothingItem[];
  results: Map<string, TryonResult>;
  sessionState: SessionState;
  customerPhoto: string | null;
  onReset: () => void;
}

export default function TryonGallery({
  designer,
  clothing,
  results,
  sessionState,
  customerPhoto,
  onReset,
}: Props) {
  const accent = designer.brand_color_accent;
  const text = designer.brand_color_text;
  const primary = designer.brand_color_primary;

  const doneCount = Array.from(results.values()).filter((r) => r.status === 'done').length;

  return (
    <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div
          style={{
            letterSpacing: '0.3em',
            fontSize: '11px',
            color: accent,
            marginBottom: '16px',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          {sessionState === 'complete' ? 'Your Collection' : `Generating ${doneCount} of ${clothing.length}`}
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 300,
            color: text,
            margin: '0 0 12px 0',
          }}
        >
          {sessionState === 'complete'
            ? 'You in every look'
            : 'Your looks are being created…'}
        </h2>
        <p style={{ fontSize: '15px', opacity: 0.45, maxWidth: '480px', margin: '0 auto' }}>
          {sessionState === 'complete'
            ? `Experience all ${clothing.length} pieces from ${designer.name}'s collection — styled just for you.`
            : 'Each look is being crafted with AI. They\'ll appear as they\'re ready.'}
        </p>

        {/* Progress bar */}
        {sessionState !== 'complete' && (
          <div
            style={{
              width: '200px',
              height: '1px',
              background: `${text}22`,
              margin: '32px auto 0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${(doneCount / clothing.length) * 100}%`,
                background: accent,
                transition: 'width 0.6s ease',
              }}
            />
          </div>
        )}
      </div>

      {/* Customer photo strip */}
      {customerPhoto && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '48px',
            padding: '20px 24px',
            border: `1px solid ${accent}33`,
            background: `${accent}08`,
          }}
        >
          <img
            src={customerPhoto}
            alt="You"
            style={{ width: '56px', height: '72px', objectFit: 'cover' }}
          />
          <div>
            <p style={{ fontSize: '13px', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Your Photo
            </p>
            <p style={{ fontSize: '15px', color: text, fontWeight: 300 }}>
              Generating {clothing.length} personalized looks for you
            </p>
          </div>
          <button
            onClick={onReset}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: `1px solid ${text}33`,
              color: text,
              padding: '8px 20px',
              fontSize: '12px',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              opacity: 0.6,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
          >
            Start Over
          </button>
        </div>
      )}

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2px',
        }}
      >
        {clothing.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            designer={designer}
            result={results.get(item.id)}
            customerPhoto={customerPhoto}
          />
        ))}
      </div>
    </section>
  );
}
