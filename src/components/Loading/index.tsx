'use client'

import { Dispatch, FC, SetStateAction, useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { MoongladeTextIcon } from '@/shared'
import gsap from 'gsap'
import { PRELOADER_PASSED_KEY } from '@/constants/sessionStorage'

interface LoadingProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const Loading: FC<LoadingProps> = ({ setIsLoading }) => {
	const contain = useRef(null)
	let tl: GSAPTimeline
	const counter = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.set('.image-contain', { opacity: 1 })

			tl = gsap.timeline({
				onUpdate: () => {
					if (counter && counter.current) {
						const ANIM_LENGTH_MODIFIER = 1.6
						let step = tl.progress() * 100 * ANIM_LENGTH_MODIFIER
						step = step >= 100 ? 100 : step
						counter.current.textContent = `~ ${step.toFixed(0).padStart(3, '0')} ~ 100 ~`
					}
					return
				},
			})

			tl.addLabel('start')
				.to('.image-contain', {
					duration: 0.7,
					opacity: 1,
					scale: 1,
					ease: 'power1.out',
				})
				.to(
					'.image-overlay',
					{
						duration: 3,
						xPercent: 100,
						ease: 'none',
					},
					'-=0.3',
				)
				.to(
					'.counter',
					{
						opacity: 0.7,
						duration: 0.7,
					},
					'start',
				)
				.to(
					'.moonglade-icon path',
					{
						stagger: {
							each: 0.2,
							ease: 'none',
						},
						opacity: 1,
						ease: 'none',
					},
					'start',
				)
				.to(
					'.page-wrapper',
					{
						opacity: 0,
						duration: 1,
						onComplete: () => {
							setIsLoading(false)
							sessionStorage.setItem(PRELOADER_PASSED_KEY, 'true')
						},
					},
					'>2',
				)

			return () => {
				tl.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<div
			ref={contain}
			className="fixed flex flex-col min-h-screen min-h-svh w-full p-11 bg-bgbasic z-10"
		>
			<div className="page-wrapper flex-grow grid place-items-center h-full min-h-full w-full max-w-480 my-0 mx-auto">
				<div className="image-contain col-start-1 col-end-1 row-start-1 row-end-1 relative scale-50 opacity-20 w-full px-loader-img">
					<Image
						className="w-full select-none"
						src={'/images/load.jpg'}
						width={276}
						height={163}
						alt="moonglade load"
					/>
					<span className="image-overlay top-0 left-0 right-0 bottom-0 absolute w-100 h-100 bg-bgbasic opacity-60" />
				</div>
				<div className="moonglade-icon relative col-start-1 col-end-1 row-start-1 row-end-1 w-full z-1">
					<MoongladeTextIcon />
				</div>
				<div
					ref={counter}
					className="counter col-start-1 col-end-1 row-start-1 row-end-1 self-end font-plain font-normal text-10 sm:text-12 opacity-0"
				></div>
			</div>
		</div>
	)
}
