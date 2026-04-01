import { NextRequest, NextResponse } from 'next/server';
import { fal } from "@fal-ai/client";

export async function POST(req: NextRequest) {
  const { human_image_url, garment_image_url, item_id } = await req.json();

  if (!human_image_url || !garment_image_url) {
    return NextResponse.json({ error: 'Missing image URLs' }, { status: 400 });
  }

  // Resize Supabase-hosted garment images to max 1024px before sending to fal.ai
  const resizedGarmentUrl = garment_image_url.includes('supabase.co/storage')
    ? garment_image_url + (garment_image_url.includes('?') ? '&width=1024' : '?width=1024')
    : garment_image_url;

  const FAL_KEY = process.env.FAL_KEY;

  // ── Mock mode (no API key) ─────────────────────────────
  if (!FAL_KEY) {
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 2000));
    return NextResponse.json({
      item_id, status: 'done', generated_image_url: garment_image_url, mock: true,
    });
  }

  // ── Live: fal.ai Kling Kolors Virtual Try-On v1.5 ──────
  try {
    // Configure the fal client with your key
    // Note: In Next.js, we must use the server-side configuration
    const result: any = await fal.subscribe("fal-ai/kling/v1-5/kolors-virtual-try-on", {
      input: {
        human_image_url,
        garment_image_url: resizedGarmentUrl,
      },
      pollInterval: 5000, // Check every 5s
      timeout: 120000,    // 2 min max wait
    });

    const generated_image_url = result?.images?.[0]?.url;
    
    if (!generated_image_url) {
        throw new Error('No image generated in response');
    }

    return NextResponse.json({ 
        item_id, 
        status: 'done', 
        generated_image_url, 
        mock: false 
    });

  } catch (err: any) {
    console.error('fal.ai try-on error:', err);
    
    let userMessage = 'AI generation failed after timeout';
    if (err.message?.includes('Exhausted balance')) {
        userMessage = 'fal.ai balance exhausted — top up at fal.ai/dashboard/billing';
    } else if (err.message) {
        userMessage = err.message;
    }

    return NextResponse.json({ 
        error: userMessage, 
        item_id, 
        status: 'failed' 
    }, { status: 502 });
  }
}
