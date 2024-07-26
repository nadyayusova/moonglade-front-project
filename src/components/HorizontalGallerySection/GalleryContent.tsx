'use client'

import { FC } from 'react'
import Image from 'next/image'
import { GalleryData } from './gallery-data'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Slides } from '@/components/Slides'

export const GalleryContent: FC = () => {
	const isDesktop = useMediaQuery('(width > 1024px)')

	if (isDesktop) {
		return (
			<div className="flex">
				<div
					className="horizontal-blocks flex gap-[1.5rem] 1025:gap-[40px] 1440:gap-[110px]"
					data-horizontal-track
				>
					{GalleryData.map((item) => {
						return (
							<div
								key={item.id}
								className="shrink-0 mobile-slide pb-[90px]"
								data-parallax-item
							>
								<figure
									className="relative"
									data-from={item.from}
									data-to={item.to}
									data-parallax-image
								>
									<div className="relative">
										<Image
											className="h-auto max-h-[650px] w-full 1025:h-[450px] 1025:max-h-[450px] 1025:w-auto object-cover bg-black pointer-events-auto select-none"
											src={item.src}
											width={item.width}
											height={item.height}
											alt={item.alt}
											aria-labelledby={`id-horz-gallery-${item.id}`}
										/>
										<div className="absolute left-0 top-0 w-full h-full bg-black opacity-10 pointer-events-none"></div>
									</div>
									<figcaption
										className="mt-6 1025:mt-8 font-plain text-[1.2rem] md:text-[1.5rem] leading-[1.1] uppercase"
										id={`id-horz-gallery-${item.id}`}
									>
										<p>{item.caption1}</p>
										<p>{item.caption2}</p>
									</figcaption>
								</figure>
							</div>
						)
					})}
				</div>
			</div>
		)
	}

	return <Slides />
}
