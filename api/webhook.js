/**
 * Instagram / Meta Graph API Webhook Endpoint
 * Deployable directly as a Vercel Serverless Function at /api/webhook
 */

export default async function handler(req, res) {
  // Read verification token from environment variables, or fallback to the token from your dashboard
  const VERIFY_TOKEN = (process.env.VERIFY_TOKEN || process.env.META_VERIFY_TOKEN || 'cyrus_brain_insta_2026').trim();

  // 1. Meta Webhook Verification (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = (req.query['hub.verify_token'] || '').trim();
    const challenge = req.query['hub.challenge'];

    if (!mode || !token) {
      return res.status(400).json({
        error: 'Missing query parameters. Meta sends hub.mode, hub.verify_token, and hub.challenge.'
      });
    }

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('[Meta Webhook] Verification successful!');
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(challenge);
    }

    console.warn(`[Meta Webhook] Token mismatch. Expected: "${VERIFY_TOKEN}", Received: "${token}"`);
    return res.status(403).send('Forbidden: Token mismatch');
  }

  // 2. Incoming Webhook Events (POST)
  if (req.method === 'POST') {
    const body = req.body;

    // Log the event to Vercel runtime logs
    console.log('[Meta Webhook] Event received:', JSON.stringify(body, null, 2));

    // Instagram / Meta expects an immediate 200 response
    return res.status(200).send('EVENT_RECEIVED');
  }

  // 3. Method Not Allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
