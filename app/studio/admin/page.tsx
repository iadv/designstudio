import { MOCK_DESIGNERS } from '@/lib/mockData';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div
      style={{
        background: '#0a0a0f',
        color: '#f0f0f0',
        minHeight: '100vh',
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: '48px',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={{ marginBottom: '48px', borderBottom: '1px solid #ffffff11', paddingBottom: '24px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#c9a96e', marginBottom: '8px', textTransform: 'uppercase' }}>
          DesignStudio — Internal
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 300, margin: 0 }}>Designer Portals</h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '48px' }}>
        {[
          { label: 'Active Portals', value: MOCK_DESIGNERS.filter((d) => d.is_active).length },
          { label: 'Total Designs', value: '6' },
          { label: 'Try-ons Generated', value: '—' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#ffffff06',
              border: '1px solid #ffffff11',
              padding: '24px',
            }}
          >
            <div style={{ fontSize: '36px', fontWeight: 200, color: '#c9a96e', marginBottom: '8px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Portals list */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 400, margin: 0 }}>Active Portals</h2>
        <button
          style={{
            background: '#c9a96e',
            color: '#0a0a0f',
            border: 'none',
            padding: '10px 24px',
            fontSize: '12px',
            letterSpacing: '0.1em',
            fontWeight: 600,
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          + Add Designer
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {MOCK_DESIGNERS.map((designer) => (
          <div
            key={designer.id}
            style={{
              background: '#ffffff05',
              border: '1px solid #ffffff0d',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* Brand pill */}
            <div
              style={{
                width: '48px',
                height: '48px',
                background: designer.brand_color_primary,
                border: `1px solid ${designer.brand_color_accent}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: designer.brand_color_accent,
                flexShrink: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {designer.name[0]}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: '4px' }}>{designer.name}</div>
              <div style={{ fontSize: '13px', opacity: 0.4 }}>
                @{designer.instagram_handle} · /studio/{designer.slug}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                href={`/studio/${designer.slug}`}
                target="_blank"
                style={{
                  color: '#c9a96e',
                  border: '1px solid #c9a96e44',
                  padding: '8px 20px',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                }}
              >
                View Portal →
              </Link>
              <button
                style={{
                  background: 'transparent',
                  color: '#f0f0f0',
                  border: '1px solid #ffffff22',
                  padding: '8px 20px',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  opacity: 0.5,
                }}
              >
                Scrape Assets
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
