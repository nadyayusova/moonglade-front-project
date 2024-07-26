'use client'

import { FC, useRef } from 'react'
import Image from 'next/image'
import { Section } from '../Section'
import Surfer from '@/shared/img/pic01.jpg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const HorizontalImageSection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef(null)

	useGSAP(
		() => {
			const stBasic = ScrollTrigger.create({
				trigger: contain.current,
				start: 'top bottom',
				end: 'top 50%',
				once: true,
				onEnter: () => {
					ScrollTrigger.refresh()
				},
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: contain.current,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			})

			tl.fromTo(
				'[data-image]',
				{
					xPercent: -8,
				},
				{
					xPercent: -23,
				},
			)

			return () => {
				tl.kill()
				stBasic.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<Section className="pt-0 pb-0 xl:pt-0 xl:pb-0 1440:pt-0 1440:pb-0">
			<h2 className="visually-hidden">Section with a picture</h2>
			<div ref={contain} className="image-wrapper overflow-hidden">
				<Image
					className="max-w-none w-[160%] h-auto min-h-[35rem] object-cover select-none"
					data-image
					src={Surfer}
					alt="A man on a surfboard"
				/>
			</div>
		</Section>
	)
}
