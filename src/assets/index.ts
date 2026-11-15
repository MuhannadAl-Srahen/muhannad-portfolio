// Asset paths - centralized for easy management
import type { ResponsiveImage } from '@/types'

// Every photo and screenshot is saved in a few widths, named `<name>-<width>.webp`
// (for example `projects/kozo/2-640.webp`). The browser picks the smallest file
// that still looks sharp on the visitor's screen, so phones never download the
// large version.
//
// import.meta.glob is a Vite feature: at build time it finds every matching file
// and gives us its final URL, so we don't need one import line per image.
const imageUrls = import.meta.glob<string>('./images/**/*.webp', {
  eager: true,
  import: 'default',
})

/** Builds `src` (largest file) and `srcSet` (every width) for one image. */
function responsiveImage(name: string, widths: number[]): ResponsiveImage {
  const urlFor = (width: number) => {
    const url = imageUrls[`./images/${name}-${width}.webp`]
    if (!url) throw new Error(`Missing image file: images/${name}-${width}.webp`)
    return url
  }
  return {
    src: urlFor(widths[widths.length - 1]),
    srcSet: widths.map((width) => `${urlFor(width)} ${width}w`).join(', '),
  }
}

/** Gallery screenshots for a project: `projects/<folder>/1`, `2`, ... */
const gallery = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    responsiveImage(`projects/${folder}/${i + 1}`, [640, 1280])
  )

// Profile photos
export const headshotImage = responsiveImage('profile/hero', [480, 640, 1066])
export const aboutImage = responsiveImage('profile/about', [480, 640, 768, 1280])

// Project screenshots
export const projectGalleries = {
  aqaba: gallery('aqaba', 3), // yard map, bills of lading view, reports (data rows blurred)
  audit: gallery('audit', 4), // dashboard, WhatsApp paste, companies (names blurred), export
  sonbul: gallery('sonbul', 4),
  remway: gallery('remway', 4), // home, features, how it works, challenges
  kozo: gallery('kozo', 4),
  ecampus: gallery('ecampus', 4),
  nebo: gallery('nebo', 3),
}

// Logos
export { default as logoDark } from './icons/ms_dark_logo.svg'
export { default as logoLight } from './icons/ms_white_logo.svg'
