'use client'

import React, { useCallback, useEffect } from 'react'
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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // List of images in public/images
  const images = [
    '/images/babyshower12.jpeg',
    '/images/babyshower13.jpeg',
    '/images/babyshower14.jpeg',
    '/images/Ribbon-ex2.png',
    '/images/wedding1.webp',
  ]

  return (
    <div className='embla mx-auto mt-12 w-full max-w-7xl'>
      <div className='embla__viewport h-56 border' ref={emblaRef}>
        <div className='embla__container h-full'>
          {images.map((src, idx) => (
            <div key={src} className='embla__slide flex items-center justify-center'>
              <img src={src} alt={`Slide ${idx + 1}`} className='max-h-full max-w-full object-contain' />
            </div>
          ))}
        </div>
      </div>

      <div className='mt-3 flex justify-between'>
        <button
          className='w-20 bg-black px-2 py-1 text-sm text-white'
          onClick={scrollPrev}
        >
          Prev
        </button>
        <button
          className='w-20 bg-black px-2 py-1 text-sm text-white'
          onClick={scrollNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}
