'use client'

import { FC } from 'react'
import Image from 'next/image'
import { SuperfoodImageItem } from './superfood-data'

export const SuperfoodPartialImage: FC<SuperfoodImageItem> = (props) => {
	const {
		id,
		src,
		imgClass = '',
		width,
		height,
		wrapperPos = 'absolute',
	} = props

	return (
		<div
			className={`${wrapperPos} top-0 h-full w-full`}
			data-image-wrapper={id}
		>
			<Image
				className={`w-full h-auto max-w-none min-h-[40rem] select-none object-cover object-center origin-bottom ${imgClass}`}
				src={src}
				width={width}
				height={height}
				alt=""
				aria-hidden="true"
			/>
		</div>
	)
}
