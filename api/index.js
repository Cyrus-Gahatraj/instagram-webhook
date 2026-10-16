export default function handler(req, res) {
  res.status(200).json({
    status: 'online',
    service: 'Mindtix Instagram Webhook',
    endpoints: {
      webhook: '/api/webhook'
    },
    meta_documentation: 'Configure this webhook URL in the Meta Developer Portal'
  });
}
