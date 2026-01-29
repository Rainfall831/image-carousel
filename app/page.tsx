'use client'

import React, { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

export default function Page() {
  const TARGET_PX_PER_SEC = 200
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(1.3)
  const lastSpeedRef = useRef(autoScrollSpeed)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [AutoScroll({ speed: autoScrollSpeed, startDelay: 0 })]
  )

  useEffect(() => {
    if (emblaApi) {
      emblaApi.plugins().autoScroll?.play()
    }
  }, [emblaApi])

  useEffect(() => {
    let rafId = 0
    let start = 0
    let frames = 0
    const sampleMs = 600

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value))

    const onFrame = (time: number) => {
      if (!start) start = time
      frames += 1
      const elapsed = time - start

      if (elapsed >= sampleMs) {
        const fps = frames / (elapsed / 1000)
        const nextSpeed = clamp(TARGET_PX_PER_SEC / fps, 0.2, 3)
        setAutoScrollSpeed(Number(nextSpeed.toFixed(3)))
        return
      }

      rafId = requestAnimationFrame(onFrame)
    }

    rafId = requestAnimationFrame(onFrame)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    if (autoScrollSpeed === lastSpeedRef.current) return

    lastSpeedRef.current = autoScrollSpeed
    emblaApi.reInit({ loop: true }, [AutoScroll({ speed: autoScrollSpeed, startDelay: 0 })])
    emblaApi.plugins().autoScroll?.play()
  }, [emblaApi, autoScrollSpeed])

  // List of images in public/images
  const images = [
    '/images/babyshower10.webp',
    '/images/birthday10.webp',
    '/images/birthday11.webp',
    '/images/birthday12.webp',
    '/images/birthday2.webp',
    '/images/birthday4.webp',
    '/images/birthday5.webp',
    '/images/birthday7.webp',
    '/images/birthday9.webp',
    '/images/private-event2.webp',
    '/images/private-event3.webp',
    '/images/wedding4.webp',
    '/images/wedding5.webp',
    '/images/wedding6.webp',
    '/images/wedding9.webp',
  ]

  return (
    <div className='embla mx-auto mt-12 w-full max-w-7xl'>
      <div className='embla__viewport h-[320px] border' ref={emblaRef}>
        <div className='embla__container h-full'>
          {images.map((src, idx) => (
            <div key={src} className='embla__slide flex items-center justify-center'>
              <img src={src} alt={`Slide ${idx + 1}`} className='h-full w-full object-cover' />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
