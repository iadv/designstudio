import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { human_image_url, garment_image_url, item_id } = await req.json();

  if (!human_image_url || !garment_image_url) {
    return NextResponse.json({ error: 'Missing image URLs' }, { status: 400 });
  }

  const FAL_KEY = process.env.FAL_KEY;

  // ── Mock mode (no API key) ─────────────────────────────
  if (!FAL_KEY) {
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 2000));
    return NextResponse.json({
      item_id,
      status: 'done',
      generated_image_url: garment_image_url,
      mock: true,
    });
  }

  // ── Live: fal.ai Kling Kolors Virtual Try-On v1.5 ──────
  try {
    // Submit job
    const submitRes = await fetch(
      'https://queue.fal.run/fal-ai/kling/v1-5/kolors-virtual-try-on',
      {
        method: 'POST',
        headers: {
          Authorization: `Key ${FAL_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ human_image_url, garment_image_url }),
      }
    );

    if (!submitRes.ok) {
      const err = await submitRes.text();
      console.error('fal.ai submit error:', err);
      return NextResponse.json({ error: 'Submission failed', item_id }, { status: 502 });
    }

    const { request_id } = await submitRes.json();

    // Poll for result (max 60s)
    const start = Date.now();
    while (Date.now() - start < 60000) {
      await new Promise((r) => setTimeout(r, 2000));

      const statusRes = await fetch(
        `https://queue.fal.run/fal-ai/kling/v1-5/kolors-virtual-try-on/requests/${request_id}`,
        { headers: { Authorization: `Key ${FAL_KEY}` } }
      );

      if (!statusRes.ok) continue;
      const data = await statusRes.json();

      if (data.status === 'COMPLETED') {
        const generated_image_url = data?.output?.images?.[0]?.url;
        return NextResponse.json({ item_id, status: 'done', generated_image_url, mock: false });
      }
      if (data.status === 'FAILED') {
        return NextResponse.json({ item_id, status: 'failed', error: data.error }, { status: 502 });
      }
    }

    return NextResponse.json({ item_id, status: 'failed', error: 'Timeout' }, { status: 504 });
  } catch (err) {
    console.error('Try-on error:', err);
    return NextResponse.json({ error: 'Internal error', item_id }, { status: 500 });
  }
}
