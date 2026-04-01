import { notFound } from 'next/navigation';
import { getDesignerBySlug, getClothingByDesigner } from '@/lib/mockData';
import DesignerPortal from '@/components/studio/DesignerPortal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const designer = getDesignerBySlug(slug);
  if (!designer) return { title: 'Not Found' };
  return {
    title: `${designer.name} — Virtual Try-On`,
    description: `See yourself wearing ${designer.name}'s latest collection. Upload your photo and visualize each look on you in seconds.`,
    openGraph: {
      title: `${designer.name} — Virtual Try-On`,
      description: designer.bio,
      type: 'website',
    },
  };
}

export default async function DesignerPortalPage({ params }: PageProps) {
  const { slug } = await params;
  const designer = getDesignerBySlug(slug);
  if (!designer) notFound();
  const clothing = getClothingByDesigner(designer.id);

  return <DesignerPortal designer={designer} clothing={clothing} />;
}
