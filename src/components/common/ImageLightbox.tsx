import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ResponsiveImage } from '@/types'

interface ImageLightboxProps {
  images: ResponsiveImage[]
  title: string
  startIndex: number
  /** Called with the image that was showing, so the gallery can stay on it */
  onClose: (lastIndex: number) => void
}

/**
 * Full-screen image viewer. Rendered into <body> with a portal so it always sits
 * above the page, the navbar and the "All Projects" modal.
 * Keyboard: Escape closes, Left/Right arrows change image, Tab stays inside.
 */
export default function ImageLightbox({ images, title, startIndex, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const hasMany = images.length > 1

  const showNext = () => setIndex((i) => (i + 1) % images.length)
  const showPrevious = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const close = () => onClose(index)

  // Lock page scroll while open, move focus into the dialog, and undo both on close
  useEffect(() => {
    const previousOverflow = document.body.style.overflow // the projects modal may have set it
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose(index)
      else if (e.key === 'ArrowRight' && hasMany) setIndex((i) => (i + 1) % images.length)
      else if (e.key === 'ArrowLeft' && hasMany) setIndex((i) => (i - 1 + images.length) % images.length)
      else if (e.key === 'Tab') {
        // keep focus cycling through the dialog's own buttons
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button')
        if (!buttons?.length) return
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, hasMany, images.length, onClose])

  // Swipe left/right on touch screens
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || !hasMany) return
    const distance = touchStartX - e.changedTouches[0].clientX
    if (distance > 50) showNext()
    if (distance < -50) showPrevious()
    setTouchStartX(null)
  }

  const image = images[index]
  const navButton =
    'absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-primary text-white hover:text-black flex items-center justify-center transition-colors duration-200 cursor-pointer'

  return createPortal(
    <div
      ref={dialogRef}
      role='dialog'
      aria-modal='true'
      aria-label={`${title} screenshots`}
      className='enter-fade [--enter-duration:0.2s] fixed inset-0 z-10000 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8'
      // React events bubble out of portals to the component that rendered them, so stop
      // them here: otherwise a click would also flip the project card behind the viewer
      onClick={(e) => { e.stopPropagation(); close() }}
      onTouchStart={(e) => { e.stopPropagation(); setTouchStartX(e.touches[0].clientX) }}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => { e.stopPropagation(); onTouchEnd(e) }}
    >
      <button
        ref={closeButtonRef}
        onClick={(e) => { e.stopPropagation(); close() }}
        className='absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-primary text-white hover:text-black flex items-center justify-center transition-colors duration-200 cursor-pointer'
        aria-label='Close image viewer'
      >
        <X className='w-6 h-6' />
      </button>

      <img
        key={image.src}
        src={image.src}
        srcSet={image.srcSet}
        sizes='92vw'
        alt={`${title} - Image ${index + 1} of ${images.length}`}
        className='enter-fade [--enter-duration:0.25s] max-w-[92vw] max-h-[80vh] object-contain rounded-xl shadow-2xl'
        onClick={(e) => e.stopPropagation()} // clicking the image itself doesn't close
      />

      <p className='mt-4 text-sm text-white/80'>
        {title}
        {hasMany && <span className='text-white/50'> · {index + 1} / {images.length}</span>}
      </p>

      {hasMany && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); showPrevious() }}
            className={`${navButton} left-3 sm:left-6`}
            aria-label='Previous image'
          >
            <ChevronLeft className='w-6 h-6' />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); showNext() }}
            className={`${navButton} right-3 sm:right-6`}
            aria-label='Next image'
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </>
      )}
    </div>,
    document.body
  )
}
