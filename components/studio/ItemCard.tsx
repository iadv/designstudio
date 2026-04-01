'use client';

import { useState } from 'react';
import { Designer, ClothingItem, TryonResult } from '@/lib/types';

interface Props {
  item: ClothingItem;
  designer: Designer;
  result?: TryonResult;
  customerPhoto: string | null;
}

export default function ItemCard({ item, designer, result, customerPhoto }: Props) {
  const [hovered, setHovered] = useState(false);
  const accent = designer.brand_color_accent;
  const text = designer.brand_color_text;
  const primary = designer.brand_color_primary;

  const status = result?.status ?? 'pending';
  const isDone = status === 'done';
  const isProcessing = status === 'processing';

  const dmUrl = `https://www.instagram.com/${designer.instagram_handle}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `${primary}cc`,
        cursor: isDone ? 'pointer' : 'default',
        transform: hovered && isDone ? 'scale(1.01)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
        {/* Base clothing image (always visible) */}
        <img
          src={item.image_url}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: isDone ? 'none' : isProcessing ? 'blur(4px) brightness(0.6)' : 'brightness(0.4)',
            transition: 'filter 0.8s ease',
          }}
        />

        {/* Generated result overlay (when done) */}
        {isDone && result?.generated_image_url && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: hovered ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <img
              src={result.generated_image_url}
              alt={`You in ${item.name}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* "You" badge */}
            {customerPhoto && (
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: `${primary}cc`,
                  border: `1px solid ${accent}55`,
                  padding: '6px 10px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <img
                  src={customerPhoto}
                  alt="You"
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: accent, textTransform: 'uppercase' }}>
                  You
                </span>
              </div>
            )}
          </div>
        )}

        {/* Loading states */}
        {!isDone && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            {isProcessing ? (
              <>
                <Spinner color={accent} />
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: accent,
                    textTransform: 'uppercase',
                    opacity: 0.8,
                  }}
                >
                  Creating your look…
                </span>
              </>
            ) : (
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: text,
                  opacity: 0.4,
                  textTransform: 'uppercase',
                }}
              >
                Queued
              </span>
            )}
          </div>
        )}

        {/* Hover: show original clothing */}
        {isDone && hovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: text,
              opacity: 0.6,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Original garment
          </div>
        )}
      </div>

      {/* Card footer */}
      <div
        style={{
          padding: '20px',
          borderTop: `1px solid ${text}11`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 400,
                color: text,
                marginBottom: '4px',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.02em',
              }}
            >
              {item.name}
            </p>
            <p style={{ fontSize: '12px', opacity: 0.4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {item.category}
            </p>
          </div>
          <p style={{ fontSize: '16px', color: accent, fontWeight: 500 }}>
            {item.price}
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href={item.instagram_post_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: 'block',
              textAlign: 'center',
              padding: '10px',
              background: `${text}0a`,
              border: `1px solid ${text}22`,
              color: text,
              fontSize: '11px',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = accent;
              (e.currentTarget as HTMLElement).style.color = accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${text}22`;
              (e.currentTarget as HTMLElement).style.color = text;
            }}
          >
            📸 View on IG
          </a>
          <a
            href={dmUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: 'block',
              textAlign: 'center',
              padding: '10px',
              background: `${text}0a`,
              border: `1px solid ${text}22`,
              color: text,
              fontSize: '11px',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = accent;
              (e.currentTarget as HTMLElement).style.color = accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${text}22`;
              (e.currentTarget as HTMLElement).style.color = text;
            }}
          >
            💬 DM Designer
          </a>
          <a
            href={item.buy_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: 'block',
              textAlign: 'center',
              padding: '10px',
              background: accent,
              border: `1px solid ${accent}`,
              color: primary,
              fontSize: '11px',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              fontWeight: 600,
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
            }}
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

function Spinner({ color }: { color: string }) {
  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        border: `1px solid ${color}33`,
        borderTop: `1px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
