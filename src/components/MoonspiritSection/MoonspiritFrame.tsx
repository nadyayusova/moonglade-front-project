'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { FrameData } from './frame-data'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const MoonspiritFrame: FC<FrameData> = (props) => {
	const [isTouchDevice, setIsTouchDevice] = useState(false)

	useEffect(() => {
		setIsTouchDevice(ScrollTrigger.isTouch === 1)
	}, [])

	const {
		onMouseMove,
		onMouseEnter,
		onMouseLeave,
		id,
		photo,
		width,
		height,
		alt,
		text1,
		text2,
		text3,
		text4,
		text5,
		from,
		to,
	} = props

	return (
		<div
			className="photo-frame w-full md:w-auto"
			style={{ transform: 'translateZ(0)' }}
		>
			<div
				className="inline-block pointer-events-auto align-top"
				data-photo-frame={id}
				data-from={from}
				data-to={to}
				onMouseEnter={isTouchDevice ? undefined : onMouseEnter}
				onMouseLeave={isTouchDevice ? undefined : onMouseLeave}
			>
				<div className="mb-4 grid grid-flow-col gap-x-4 justify-between items-start uppercase text-[0.8rem] md:text-[1.2rem] pointer-events-none">
					<span>{text1}</span>
					<span>{text2}</span>
					<span>{text3}</span>
				</div>

				<div
					className="relative w-auto max-w-full md:max-w-[1000px] overflow-hidden"
					data-image-wrapper
					onMouseMove={isTouchDevice ? undefined : onMouseMove}
				>
					<Image
						className="w-full h-auto md:scale-[1.2] pointer-events-none select-none"
						data-image
						src={photo}
						width={width}
						height={height}
						// без priority ScrollTrigger не может определить размеры
						priority
						alt={alt}
					/>
					<div className="absolute -left-[1%] -top-[1%] w-[102%] h-[102%] bg-black opacity-25 select-none pointer-events-none"></div>
					{!isTouchDevice && (
						<div className="mask" id={`id-mask-${id}`} data-mask={id}></div>
					)}
				</div>

				<div className="mt-4 grid grid-flow-col gap-x-4 justify-between items-start uppercase text-[0.8rem] md:text-[1.2rem] pointer-events-none">
					<span className="arrow">{text4}</span>
					<span>{text5}</span>
				</div>
			</div>
		</div>
	)
}
