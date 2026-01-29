'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

export default function Page() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [AutoScroll({ speed: 1.4, startDelay: 0, stopOnInteraction: false })]
  )

  useEffect(() => {
    const auto = emblaApi?.plugins()?.autoScroll
    if (!auto) return
    auto.play()
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
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                width={224}
                height={320}
                className='h-full w-full object-cover'
                sizes='(max-width: 640px) 70vw, 224px'
                priority={idx === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
