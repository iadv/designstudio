'use client';

import { useState, useRef, useCallback } from 'react';
import { Designer } from '@/lib/types';

interface Props {
  designer: Designer;
  onPhotoReady: (file: File, previewUrl: string) => Promise<void>;
}

export default function UploadSection({ designer, onPhotoReady }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const accent = designer.brand_color_accent;
  const text = designer.brand_color_text;
  const primary = designer.brand_color_primary;

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleConfirm = async () => {
    if (!preview || !selectedFile) return;
    setIsLoading(true);
    await onPhotoReady(selectedFile, preview);
  };

  return (
    <section id="upload-section" style={{ padding: '120px 24px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ letterSpacing: '0.3em', fontSize: '11px', color: accent, marginBottom: '20px', fontWeight: 500, textTransform: 'uppercase' }}>
        The Experience
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: text, margin: '0 0 16px 0', lineHeight: 1.1 }}>
        See yourself in the collection
      </h2>
      <p style={{ fontSize: '16px', opacity: 0.55, lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 64px' }}>
        Upload a photo and watch AI generate you wearing each piece from {designer.name}'s collection — instantly.
      </p>

      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `1px solid ${isDragging ? accent : `${text}22`}`,
            borderRadius: '2px',
            padding: '80px 40px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: isDragging ? `${accent}08` : 'transparent',
            position: 'relative',
          }}
        >
          {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((pos) => (
            <div key={pos} style={{
              position: 'absolute', width: '20px', height: '20px', borderColor: accent, borderStyle: 'solid', borderWidth: 0,
              ...(pos === 'topLeft' && { top: 16, left: 16, borderTopWidth: 1, borderLeftWidth: 1 }),
              ...(pos === 'topRight' && { top: 16, right: 16, borderTopWidth: 1, borderRightWidth: 1 }),
              ...(pos === 'bottomLeft' && { bottom: 16, left: 16, borderBottomWidth: 1, borderLeftWidth: 1 }),
              ...(pos === 'bottomRight' && { bottom: 16, right: 16, borderBottomWidth: 1, borderRightWidth: 1 }),
            }} />
          ))}
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>◎</div>
          <p style={{ fontSize: '18px', fontWeight: 300, marginBottom: '8px', color: text }}>Drop your photo here</p>
          <p style={{ fontSize: '13px', opacity: 0.4 }}>or click to browse — JPG, PNG, HEIC supported</p>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={preview} alt="Your photo" style={{ width: '240px', height: '320px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, border: `1px solid ${accent}`, pointerEvents: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => { setPreview(null); setSelectedFile(null); }}
              style={{ background: 'transparent', color: text, border: `1px solid ${text}33`, padding: '14px 28px', fontSize: '13px', letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase' }}>
              Retake
            </button>
            <button onClick={handleConfirm} disabled={isLoading}
              style={{ background: accent, color: primary, border: 'none', padding: '14px 40px', fontSize: '13px', letterSpacing: '0.15em', fontWeight: 600, cursor: isLoading ? 'wait' : 'pointer', textTransform: 'uppercase', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Generating...' : 'Generate My Looks →'}
            </button>
          </div>
        </div>
      )}
      <p style={{ fontSize: '12px', opacity: 0.3, marginTop: '40px', letterSpacing: '0.05em' }}>
        🔒 Your photo is private. Used only to generate your looks.
      </p>
    </section>
  );
}
