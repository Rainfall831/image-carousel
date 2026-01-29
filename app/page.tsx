'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

export default function Page() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [AutoScroll({ speed: 1.3, startDelay: 0 })]
  )

  useEffect(() => {
    if (emblaApi) {
      emblaApi.plugins().autoScroll?.play()
    }
  }, [emblaApi])

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
