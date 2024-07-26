'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { FC } from 'react'
import { GalleryData } from '../HorizontalGallerySection/gallery-data'
import Image from 'next/image'
import { swiperOptions } from './swiper-options'

export const Slides: FC = () => {
	return (
		<>
			<Swiper {...swiperOptions} className="no-buttons w-full rounded-lg">
				{GalleryData.map((item) => {
					return (
						<SwiperSlide key={item.id} data-parallax-item>
							<figure
								className="relative"
								data-from={item.from}
								data-to={item.to}
								data-y-offset={item.yOffset}
								data-parallax-image
							>
								<div className="relative">
									<Image
										className="h-auto max-h-[650px] w-full object-cover bg-black select-none"
										src={item.src}
										width={item.width}
										height={item.height}
										alt={item.alt}
										aria-labelledby={`id-horz-gallery-${item.id}`}
									/>
									<div className="absolute left-0 top-0 w-full h-full bg-black opacity-10"></div>
								</div>
								<figcaption
									className="mt-6 font-plain text-[1.2rem] md:text-[1.5rem] leading-[1.1] uppercase"
									id={`id-horz-gallery-${item.id}`}
								>
									<p>{item.caption1}</p>
									<p>{item.caption2}</p>
								</figcaption>
							</figure>
						</SwiperSlide>
					)
				})}
			</Swiper>
			<div data-gallery-pagination></div>
		</>
	)
}
