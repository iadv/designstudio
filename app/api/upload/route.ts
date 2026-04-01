import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('photo') as File;
    const sessionId = formData.get('session_id') as string;

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.type.split('/')[1] || 'jpg';
    const path = `customers/${sessionId || Date.now()}.${ext}`;

    const admin = getAdminClient();
    const { error } = await admin.storage
      .from('tryon-photos')
      .upload(path, buffer, { contentType: file.type, upsert: true });

    if (error) {
      console.error('Storage upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = admin.storage
      .from('tryon-photos')
      .getPublicUrl(path);

    return NextResponse.json({ photo_url: publicUrl, path });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
