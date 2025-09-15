
import fetch from 'node-fetch';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default async function handler(req, res) {
  const url = `${BACKEND_URL}/projects`;
  if (req.method === 'GET') {
    const r = await fetch(url);
    const data = await r.json();
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    const r = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(req.body),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  }
  res.status(405).end();
}
