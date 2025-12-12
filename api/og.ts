/**
 * Open Graph Image Generator
 * This generates the social media preview image dynamically
 * URL: /api/og?title=...&description=...
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // If you want a dynamic OG image, you can use a library like:
  // - @vercel/og
  // - Satori + Resvg
  // - Sharp for image manipulation

  // For now, redirect to static preview image
  return res.redirect(301, '/og-preview.webp')
}
