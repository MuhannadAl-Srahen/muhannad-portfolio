/**
 * Open Graph Image Generator
 * This generates the social media preview image dynamically
 * URL: /api/og?title=...&description=...
 */

export default async function handler(req, res) {
  const { title, description, image } = req.query

  // If you want a dynamic OG image, you can use a library like:
  // - og-image (Vercel)
  // - Satori + Resvg
  // - Sharp for image manipulation

  // For now, redirect to static preview image
  res.status(301).redirect('/og-preview.webp')
}
