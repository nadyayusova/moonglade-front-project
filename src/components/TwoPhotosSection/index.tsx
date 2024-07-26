'use client'

import { FC, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../Section'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import BgRight from '@/shared/img/photos-bg-right.jpg'
import { photoData } from './photo-data'
import { PhotoBlock } from './PhotoBlock'

export const TwoPhotosSection: FC = () => {
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

			const frameWrappers: HTMLDivElement[] = gsap.utils.toArray(
				'[data-frame-wrapper]',
			)
			const imgWrappers: HTMLDivElement[] = gsap.utils.toArray(
				'[data-image-wrapper]',
			)
			const tls: GSAPTimeline[] = []

			// image parallax
			if (imgWrappers.length) {
				imgWrappers.forEach((wrapper) => {
					const q = gsap.utils.selector(wrapper)
					const image = q('[data-image]')[0] as HTMLVideoElement

					// image parallax
					const tl = gsap
						.timeline({
							defaults: { ease: 'none' },
							scrollTrigger: {
								trigger: wrapper,
								start: 'top bottom',
								end: 'bottom top',
								scrub: true,
							},
						})
						.fromTo(image, { yPercent: -8 }, { yPercent: 8 })

					tls.push(tl)
				})
			}

			// frames parallax
			const mm = gsap.matchMedia()
			// desktop setup code here...
			mm.add('(width > 1024px)', () => {
				if (frameWrappers.length) {
					gsap.set(frameWrappers, {
						yPercent: (_, elem) => elem.dataset.from || 0,
					})

					const tl2 = gsap
						.timeline({
							defaults: { ease: 'none' },
							scrollTrigger: {
								trigger: contain.current,
								start: 'top bottom',
								end: 'bottom top',
								scrub: true,
							},
						})
						.to(frameWrappers, { yPercent: (_, elem) => elem.dataset.to || 0 })

					tls.push(tl2)
				}
			})

			return () => {
				tls.forEach((tl) => tl.kill())
				stBasic.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<Section className="photos">
			<h2 className="visually-hidden">Section with photos</h2>
			<div className="absolute left-0 top-0 h-full w-full max-w-full -z-[1]">
				<Image
					className="absolute right-0 bottom-0 block h-auto w-auto max-w-full object-contain object-right-bottom select-none -z-[1]"
					src={BgRight}
					width="735"
					height="800"
					alt=""
					aria-hidden="true"
					unoptimized
				/>
			</div>
			<div className="container" ref={contain}>
				<div className="grid gap-y-[5rem] md:gap-y-[10rem] xl:gap-y-0 md:mb-[5rem] 1440:mb-[10rem]">
					<PhotoBlock {...photoData[0]} />
					<PhotoBlock {...photoData[1]} />
				</div>
			</div>
		</Section>
	)
}
