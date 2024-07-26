'use client'

import { FC } from 'react'
import Image from 'next/image'
import GalleryBgLeft from '@/shared/img/horz-gallery-bg-left.jpg'
import GalleryBgRight from '@/shared/img/horz-gallery-bg-right.jpg'

export const GalleryBg: FC = () => {
	return (
		<div className="absolute left-0 top-0 w-full h-full -z-[1]">
			<span className="gallery-bg gallery-bg--left absolute top-0 left-0 block object-left-bottom pointer-events-none select-none">
				<Image
					className="object-contain"
					src={GalleryBgLeft}
					width="705"
					height="800"
					alt=""
					aria-hidden="true"
					unoptimized
				/>
			</span>
			<span className="gallery-bg gallery-bg--right absolute bottom-0 right-0 hidden 1025:block pointer-events-none select-none translate-y-1/4 -z-[1]">
				<Image
					className="object-contain object-right-bottom"
					src={GalleryBgRight}
					width="705"
					height="800"
					alt=""
					aria-hidden="true"
					unoptimized
				/>
			</span>
		</div>
	)
}
