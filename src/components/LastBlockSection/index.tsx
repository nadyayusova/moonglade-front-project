'use client'

import { FC, useRef, useState } from 'react'
import Image from 'next/image'
import Waves from '@/shared/img/pic01.jpg'
import { MoongladeTextIcon } from '@/shared'
import { Section } from '../Section'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const LastBlockSection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef(null)
	const [isTouchDevice, setIsTouchDevice] = useState(false)

	useGSAP(
		() => {
			setIsTouchDevice(ScrollTrigger.isTouch === 1)
			const stBasic = ScrollTrigger.create({
				trigger: contain.current,
				start: 'top bottom',
				end: 'top 50%',
				once: true,
				onEnter: () => {
					ScrollTrigger.refresh()
				},
			})

			let tl: GSAPTimeline
			if (!isTouchDevice) {
				tl = gsap.timeline({
					scrollTrigger: {
						trigger: contain.current,
						start: 'top bottom',
						end: 'bottom bottom',
						scrub: true,
					},
				})

				tl.fromTo('[data-block-content]', { yPercent: 30 }, { yPercent: 0 })
			}

			const tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: contain.current,
					start: 'bottom 105%',
					once: true,
				},
			})

			tl2.to(
				'[data-icon-wrapper] path',
				{
					stagger: {
						each: 0.1,
						ease: 'none',
					},
					opacity: 1,
					ease: 'none',
				},
				'start',
			)

			return () => {
				if (tl) tl.kill()
				tl2.kill()
				stBasic.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<Section className="pt-0 pb-0 xl:pt-0 xl:pb-0 1440:pt-0 1440:pb-0">
			<h2 className="visually-hidden">Section with a picture</h2>
			<div ref={contain} className="relative">
				<div data-block-content>
					<div className="image-wrapper relative xl:h-screen">
						<Image
							className="xl:absolute xl:top-0 xl:left-0 w-full max-w-full min-h-[40rem] xl:h-full object-cover select-none"
							data-image
							src={Waves}
							width={1440}
							height={840}
							alt="Sea waves"
						/>
						<span className="h-1/4 absolute left-0 -top-2 w-full bg-gradient-to-b from-black to-transparent"></span>
						<span className="h-1/2 absolute left-0 -bottom-2 w-full bg-gradient-to-t from-black to-transparent"></span>
					</div>
					<div
						className="icon-wrapper absolute left-0 bottom-0 flex justify-center items-center w-full p-16 xl:p-40 z-10"
						data-icon-wrapper
					>
						<MoongladeTextIcon />
					</div>
				</div>
			</div>
		</Section>
	)
}
