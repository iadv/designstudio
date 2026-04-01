'use client';

import { useState, useRef, useCallback } from 'react';
import { Designer, ClothingItem, TryonResult } from '@/lib/types';
import HeroCarousel from './HeroCarousel';
import UploadSection from './UploadSection';
import TryonGallery from './TryonGallery';

interface Props {
  designer: Designer;
  clothing: ClothingItem[];
}

export type SessionState = 'idle' | 'uploading' | 'generating' | 'complete';

export default function DesignerPortal({ designer, clothing }: Props) {
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [customerPhoto, setCustomerPhoto] = useState<string | null>(null);
  const [tryonResults, setTryonResults] = useState<Map<string, TryonResult>>(new Map());
  const galleryRef = useRef<HTMLDivElement>(null);

  const updateResult = useCallback((itemId: string, patch: Partial<TryonResult>) => {
    setTryonResults((prev) => {
      const next = new Map(prev);
      const existing = next.get(itemId);
      if (existing) next.set(itemId, { ...existing, ...patch });
      return next;
    });
  }, []);

  const initResults = useCallback(
    async (photoFile: File, previewUrl: string) => {
      setCustomerPhoto(previewUrl);
      setSessionState('uploading');

      // Scroll to gallery area
      setTimeout(() => {
        galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);

      // Init all as pending
      const pending = new Map<string, TryonResult>();
      clothing.forEach((item) => {
        pending.set(item.id, {
          id: `result_${item.id}`,
          customer_id: 'session_user',
          clothing_item_id: item.id,
          designer_id: designer.id,
          status: 'pending',
          created_at: new Date().toISOString(),
        });
      });
      setTryonResults(pending);
      setSessionState('generating');

      // Step 1: Upload customer photo to Supabase Storage
      let humanImageUrl = previewUrl; // fallback to local preview
      try {
        const formData = new FormData();
        formData.append('photo', photoFile);
        formData.append('session_id', `${Date.now()}`);

        const upRes = await fetch('/api/upload', { method: 'POST', body: formData });
        if (upRes.ok) {
          const { photo_url } = await upRes.json();
          humanImageUrl = photo_url;
        }
      } catch (e) {
        console.warn('Upload failed, using local preview URL');
      }

      // Step 2: Fire all try-on jobs in parallel
      let completedCount = 0;
      const promises = clothing.map(async (item) => {
        updateResult(item.id, { status: 'processing' });
        try {
          const res = await fetch('/api/tryon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              human_image_url: humanImageUrl,
              garment_image_url: item.image_url,
              item_id: item.id,
              item_name: item.name,
              category: item.category,
            }),
          });
          const data = await res.json();
          updateResult(item.id, {
            status: data.status === 'done' ? 'done' : 'failed',
            generated_image_url: data.generated_image_url,
          });
        } catch {
          updateResult(item.id, { status: 'failed' });
        }
        completedCount++;
        if (completedCount === clothing.length) setSessionState('complete');
      });

      await Promise.allSettled(promises);
      setSessionState('complete');
    },
    [clothing, designer.id, updateResult]
  );

  const handleReset = () => {
    setCustomerPhoto(null);
    setTryonResults(new Map());
    setSessionState('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        background: designer.brand_color_primary,
        color: designer.brand_color_text,
        minHeight: '100vh',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
        rel="stylesheet"
      />

      <HeroCarousel designer={designer} clothing={clothing} />

      {sessionState === 'idle' && (
        <UploadSection designer={designer} onPhotoReady={initResults} />
      )}

      {sessionState !== 'idle' && (
        <div ref={galleryRef}>
          <TryonGallery
            designer={designer}
            clothing={clothing}
            results={tryonResults}
            sessionState={sessionState}
            customerPhoto={customerPhoto}
            onReset={handleReset}
          />
        </div>
      )}

      <footer
        style={{
          padding: '40px 24px',
          textAlign: 'center',
          borderTop: `1px solid ${designer.brand_color_accent}22`,
          marginTop: '80px',
        }}
      >
        <p style={{ fontSize: '13px', opacity: 0.4, letterSpacing: '0.1em' }}>
          POWERED BY{' '}
          <a href="/studio" style={{ color: designer.brand_color_accent, textDecoration: 'none' }}>
            DESIGNSTUDIO
          </a>{' '}
          — AI VIRTUAL TRY-ON
        </p>
      </footer>
    </div>
  );
}
