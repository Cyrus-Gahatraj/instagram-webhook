# Instagram Webhook for Mindtix

A lightweight Vercel serverless function to receive and verify webhooks from the Meta / Instagram Graph API.

## Endpoints

- **Healthcheck**: `GET /api`
- **Webhook Callback URL**: `https://<your-project>.vercel.app/api/webhook`

## Setup & Deployment

1. **Deploy to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Import this GitHub repository (`instagram-webhook`).
   - In **Environment Variables**, add:
     - `VERIFY_TOKEN`: any random secret string (e.g., `mindtix_meta_verify_2026`).
   - Click **Deploy**.

2. **Configure in Meta App Dashboard**:
   - Go to [developers.facebook.com](https://developers.facebook.com/) -> Your App -> **Webhooks** -> **Instagram**.
   - **Callback URL**: `https://<your-project>.vercel.app/api/webhook`
   - **Verify Token**: the exact same string you set in `VERIFY_TOKEN`.
   - Click **Verify and Save**.
