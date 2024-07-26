'use client'

import { FC, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../Section'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { superfoodImage, superfoodMobileImage } from './superfood-data'
import { SuperfoodPartialImage } from './SuperfoodPartialImage'
import { Products } from '../Products'
import { FlipButton } from '../FlipButton'
import { useMediaQuery } from '@/hooks/use-media-query'
import { SuperfoodTitle } from './SuperfoodTitle'

export const SuperfoodSection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef(null)
	const topImageWrapper = useRef(null)
	const topImage = useRef(null)
	const underlay = useRef(null)
	const cursor = useRef(null)
	const isMobile = useMediaQuery('(width < 1024px)')
	const [isTouchDevice, setIsTouchDevice] = useState(false)
	const [localCoords, setLocalCoords] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	})

	const handleTouchStart = () => {
		if (cursor.current) {
			;(cursor.current as HTMLDivElement).classList.add('drag')
		}
	}

	const handleTouchEnd = () => {
		if (cursor.current) {
			;(cursor.current as HTMLDivElement).classList.remove('drag')
		}
	}

	const handleMouseMove = (evt: any) => {
		const parent = evt.target.closest('[data-carousel-wrapper]')
		if (parent && underlay.current) {
			const rect = (underlay.current as HTMLDivElement).getBoundingClientRect()
			const newCoords: { x: number; y: number } = {
				x: evt.clientX - rect.x,
				y: evt.clientY - rect.y,
			}

			setLocalCoords(newCoords)
		}
	}

	const handleMouseLeave = (evt: any) => {
		const parent = evt.target.closest('[data-carousel-wrapper]')
		if (parent && underlay.current) {
			gsap.to(cursor.current, {
				autoAlpha: 0,
				scale: 0,
				duration: 0.3,
				ease: 'power1.in',
			})
		}
	}

	const handleMouseEnter = (evt: any) => {
		const parent = evt.target.closest('[data-carousel-wrapper]')

		if (parent && underlay.current) {
			const rect = (underlay.current as HTMLDivElement).getBoundingClientRect()
			const x = evt.clientX - rect.x
			const y = evt.clientY - rect.y

			gsap.set(cursor.current, {
				x: x,
				y: y,
			})

			gsap.to(cursor.current, {
				autoAlpha: 1,
				scale: 1,
				duration: 0.3,
				ease: 'power1.in',
			})
		}
	}

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

			const letters: HTMLDivElement[] = gsap.utils.toArray('.letter')
			const slides: HTMLDivElement[] = gsap.utils.toArray('[data-slide]')
			const tls: GSAPTimeline[] = []

			// reveal title
			if (letters.length) {
				const tl = gsap
					.timeline({
						scrollTrigger: {
							trigger: '[data-title]',
							start: 'top 90%',
							once: true,
						},
					})
					.to('.letter', {
						autoAlpha: 1,
						stagger: {
							each: 0.05,
							from: 'center',
						},
						ease: 'none',
					})

				tls.push(tl)
			}

			// initial appearance of carousel slides
			if (slides.length) {
				gsap.set(slides, { autoAlpha: 0, xPercent: 20 })

				const tl2 = gsap
					.timeline({
						scrollTrigger: {
							trigger: '[data-carousel-wrapper]',
							start: 'top 90%',
							once: true,
						},
					})
					.to(slides, {
						autoAlpha: 1,
						xPercent: 0,
						stagger: {
							each: 0.1,
							from: 'start',
						},
						ease: 'none',
					})

				tls.push(tl2)
			}

			// button float up
			gsap.set('[data-products-button]', { autoAlpha: 0, yPercent: 150 })

			const tl3 = gsap
				.timeline({
					scrollTrigger: {
						trigger: '[data-products-button]',
						start: 'top bottom',
						once: true,
					},
				})
				.to('[data-products-button]', {
					autoAlpha: 1,
					yPercent: 0,
					duration: 0.4,
				})

			tls.push(tl3)

			const mm = gsap.matchMedia()

			// desktop setup code here...
			mm.add('(width > 1023px)', () => {
				// partial images parallax
				gsap.set('[data-image-wrapper="4"]', { yPercent: 0 })
				gsap.set('[data-image-wrapper="2"]', { yPercent: 4.4 })
				gsap.set('[data-image-wrapper="1"]', { yPercent: 13 })
				gsap.set('[data-image-wrapper="0"]', { yPercent: 13 })
				gsap.set('[data-top-image-overlay]', { yPercent: 25 })

				const tl4 = gsap
					.timeline({
						defaults: {
							ease: 'none',
						},
						scrollTrigger: {
							trigger: topImageWrapper.current,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
						},
					})
					.to('[data-image-wrapper="4"]', { yPercent: -30 }, 0)
					.to('[data-image-wrapper="2"]', { yPercent: -5 }, 0)
					.to('[data-image-wrapper="1"]', { yPercent: -10 }, 0)
					.to('[data-image-wrapper="0"]', { yPercent: -15 }, 0)
					.to('[data-top-image-overlay]', { yPercent: -16 }, 0)
				tls.push(tl4)

				// top image parallax
				gsap.set(topImage.current, { yPercent: -40 })

				const tl5 = gsap
					.timeline({
						defaults: {
							ease: 'none',
						},
						scrollTrigger: {
							trigger: topImageWrapper.current,
							start: 'top bottom',
							end: 'top top',
							scrub: true,
							invalidateOnRefresh: true,
						},
					})
					.to(topImage.current, { yPercent: 0 })

				tls.push(tl5)

				const tl6 = gsap
					.timeline({
						defaults: {
							ease: 'none',
						},
						scrollTrigger: {
							trigger: topImageWrapper.current,
							start: 'top top',
							end: 'bottom top',
							invalidateOnRefresh: true,
							scrub: true,
						},
					})
					.to(topImage.current, { yPercent: 42 })

				tls.push(tl6)
			})

			return () => {
				tls.forEach((tl) => tl.kill())
				stBasic.kill()
			}
		},
		{ scope: contain },
	)

	useGSAP(
		() => {
			// cursor movement
			if (cursor.current) {
				const xTo = gsap.quickTo(cursor.current, 'x', {
					duration: 1,
					ease: 'power3',
				})
				const yTo = gsap.quickTo(cursor.current, 'y', {
					duration: 1,
					ease: 'power3',
				})

				xTo(localCoords.x)
				yTo(localCoords.y)
			}
		},
		{ scope: contain, dependencies: [localCoords] },
	)

	return (
		<Section className="superfood pt-0 xl:pt-0 1440:pt-0">
			<div ref={contain} className="overflow-hidden">
				<div ref={topImageWrapper} className="relative bg-black">
					<div ref={topImage} className="relative overflow-hidden bg-black">
						{isMobile
							? superfoodMobileImage
									.slice()
									.reverse()
									.map((image) => (
										<SuperfoodPartialImage key={image.id} {...image} />
									))
							: superfoodImage
									.slice()
									.reverse()
									.map((image) => (
										<SuperfoodPartialImage key={image.id} {...image} />
									))}
						<div
							className="absolute bottom-0 h-1/2 w-full select-none bg-gradient-to-t from-black to-transparent"
							data-top-image-overlay
						></div>
					</div>
				</div>
				<div className="container relative overflow-hidden z-10">
					<SuperfoodTitle />
					<div
						className="relative mb-[4rem] lg:mb-[10rem]"
						onMouseMove={handleMouseMove}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						data-carousel-wrapper
					>
						{!isTouchDevice && (
							<div className="products-underlay" ref={underlay}></div>
						)}
						<Products
							onSliderMove={handleMouseMove}
							onTouchStart={handleTouchStart}
							onTouchEnd={handleTouchEnd}
						/>
						{!isTouchDevice && (
							<div className="products-overlay">
								<div className="products-cursor" ref={cursor}>
									<span className="products-cursor-zoomer"></span>
								</div>
							</div>
						)}
					</div>
					<div className="text-center" data-products-button>
						<FlipButton className="flip-btn--text flip-btn--dark" href="#">
							<span>Visit out store</span>
						</FlipButton>
					</div>
				</div>
			</div>
		</Section>
	)
}
