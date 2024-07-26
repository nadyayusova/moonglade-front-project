'use client'

import { FC } from 'react'
import Image from 'next/image'
import MoonspiritBgLeftTop from '@/shared/img/moonspirit-bg-left-top.jpg'
import MoonspiritBgRight from '@/shared/img/moonspirit-bg-right.jpg'
import MoonspiritBgLeftBottom from '@/shared/img/moonspirit-bg-left-bottom.jpg'

export const MoonspiritBg: FC = () => {
	return (
		<div className="absolute left-0 top-0 w-full h-full -z-[1]">
			<Image
				className="absolute top-0 lg:top-[10rem] left-0 block max-w-full h-auto object-contain object-left-top select-none"
				src={MoonspiritBgLeftTop}
				width="1060"
				height="880"
				alt=""
				aria-hidden="true"
				unoptimized
			/>
			<Image
				className="absolute top-1/2 -translate-y-1/2 right-0 block max-w-full h-auto  object-contain object-right-top select-none"
				src={MoonspiritBgRight}
				width="960"
				height="760"
				alt=""
				aria-hidden="true"
				unoptimized
			/>
			<Image
				className="absolute bottom-0 translate-y-1/2 left-0 block max-w-full h-auto object-contain object-left-bottom select-none"
				src={MoonspiritBgLeftBottom}
				width="1250"
				height="990"
				alt=""
				aria-hidden="true"
				unoptimized
			/>
		</div>
	)
}
