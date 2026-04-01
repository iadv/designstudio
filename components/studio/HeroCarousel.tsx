'use client';

import { useState, useEffect } from 'react';
import { Designer, ClothingItem } from '@/lib/types';

interface Props {
  designer: Designer;
  clothing: ClothingItem[];
}

export default function HeroCarousel({ designer, clothing }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % clothing.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [clothing.length]);

  const accent = designer.brand_color_accent;
  const text = designer.brand_color_text;

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Images */}
      {clothing.map((item, i) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${item.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: i === activeIndex ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}

      {/* Dark overlay gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${designer.brand_color_primary}ee 0%, ${designer.brand_color_primary}88 50%, transparent 100%)`,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `linear-gradient(to top, ${designer.brand_color_primary} 0%, transparent 100%)`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 48px',
          maxWidth: '700px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand name */}
        <div
          style={{
            letterSpacing: '0.3em',
            fontSize: '11px',
            color: accent,
            marginBottom: '20px',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          @{designer.instagram_handle}
        </div>

        {/* Designer name */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: 300,
            lineHeight: 1,
            color: text,
            margin: '0 0 20px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {designer.name}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(18px, 2.5vw, 28px)',
            fontStyle: 'italic',
            color: text,
            opacity: 0.75,
            marginBottom: '48px',
            fontWeight: 300,
          }}
        >
          "{designer.hero_tagline}"
        </p>

        {/* CTA */}
        <button
          onClick={() => {
            document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            background: accent,
            color: designer.brand_color_primary,
            border: 'none',
            padding: '16px 40px',
            fontSize: '13px',
            letterSpacing: '0.15em',
            fontWeight: 600,
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            marginRight: '16px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 8px 30px ${accent}55`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Try It On →
        </button>

        <a
          href={`https://instagram.com/${designer.instagram_handle}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: text,
            border: `1px solid ${text}44`,
            padding: '15px 32px',
            fontSize: '13px',
            letterSpacing: '0.15em',
            fontWeight: 500,
            cursor: 'pointer',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accent;
            e.currentTarget.style.color = accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${text}44`;
            e.currentTarget.style.color = text;
          }}
        >
          Follow on IG
        </a>
      </div>

      {/* Slide indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '48px',
          zIndex: 2,
          display: 'flex',
          gap: '8px',
        }}
      >
        {clothing.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? '32px' : '8px',
              height: '2px',
              background: i === activeIndex ? accent : `${text}44`,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Item name overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '48px',
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: text,
            opacity: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {clothing[activeIndex]?.name}
        </p>
      </div>
    </section>
  );
}
