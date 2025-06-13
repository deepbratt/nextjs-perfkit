import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const delay = Math.random() * 1000; // simulate random latency

  setTimeout(() => {
    res.status(200).json({
      message: "This is a test response from /api/example",
      timestamp: new Date().toISOString(),
    });
  }, delay);
}

/* usage:
useEffect(() => {
  fetch('/api/example')
    .then(res => res.json())
    .then(data => console.log('[Test API]', data));

  trackNetworkRequest('/api/example');
}, []);

output example:
{
  "message": "This is a test response from /api/example",
  "timestamp": "2025-06-13T17:48:02.933Z"
}

*/
