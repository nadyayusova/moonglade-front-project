'use client'

import { FC, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../Section'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GalleryTitle } from './GalleryTitle'
import { GalleryBg } from './GalleryBg'
import { GalleryContent } from './GalleryContent'
import { useMediaQuery } from '@/hooks/use-media-query'

export const HorizontalGallerySection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef(null)
	const isDesktop = useMediaQuery('(width > 1024px)')
	const isDesktop1440 = useMediaQuery('(width >= 1440px)')

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

			const letters: HTMLElement[] = gsap.utils.toArray('.letter')
			const items: HTMLElement[] = gsap.utils.toArray('[data-parallax-item]')
			const images: HTMLElement[] = gsap.utils.toArray('[data-parallax-image]')

			// text, frames fade-in
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: contain.current,
					start: 'top 90%',
					once: true,
				},
			})

			// photo-gallery movement
			const tl2 = gsap.timeline({ paused: true })

			let st: ScrollTrigger

			if (contain && contain.current) {
				const trigger = (contain.current as HTMLElement).closest('section')
				const block = contain.current as HTMLElement
				const track = (contain.current as HTMLElement).querySelector(
					'[data-horizontal-track]',
				)

				const getScrollWidth = () => {
					const gap = isDesktop1440 ? 110 : 40

					if (track && block) {
						const itemsWidth = items.reduce(
							(acc, item) =>
								(acc as number) + (item as HTMLElement).offsetWidth,
							0,
						)

						const trackWidth =
							itemsWidth +
							gap * (items.length - 1) +
							parseInt(getComputedStyle(block).paddingRight) * 2

						if (
							trackWidth >
							(window.innerWidth || document.documentElement.clientWidth)
						) {
							return (
								trackWidth -
								(window.innerWidth || document.documentElement.clientWidth)
							)
						}
					}

					return 0
				}

				st = ScrollTrigger.create({
					id: 'MoveTrack',
					animation: tl2,
					trigger: trigger,
					scrub: true,
					start: 'top top',
					end: 'bottom bottom',
					invalidateOnRefresh: true,
				})

				const mm = gsap.matchMedia()

				// desktop setup code here...
				mm.add('(width > 1024px)', () => {
					// title, frames fade-in
					if (items.length) {
						gsap.set(items, {
							opacity: 0,
							xPercent: 50,
						})
					}

					if (items.length && letters.length) {
						tl.to(letters, {
							opacity: 1,
							stagger: {
								each: 0.03,
								from: 'center',
							},
							ease: 'none',
						}).to(
							items,
							{
								stagger: {
									each: 0.15,
								},
								ease: 'power1.out',
								xPercent: 0,
								opacity: 1,
							},
							'<30%',
						)
					}

					// photo-gallery movement
					if (images.length) {
						gsap.set(images, {
							xPercent: (_, elem) => elem.dataset.from || 10,
						})
					}

					if (track && images.length) {
						tl2
							.to(track, {
								x: () => -getScrollWidth(),
								ease: 'none',
							})
							.to(
								images,
								{
									xPercent: (_, elem) => elem.dataset.to || 0,
									ease: 'none',
								},
								0,
							)
					}
				})

				// mobile setup code here...
				mm.add('(width < 1025px)', () => {
					// title
					if (letters.length) {
						tl.to(letters, {
							opacity: 1,
							stagger: {
								each: 0.03,
								from: 'center',
							},
							ease: 'none',
						})
					}
				})
			}

			return () => {
				tl.kill()
				tl2.kill()
				st.kill()
				stBasic.kill()
			}
		},
		{ scope: contain, dependencies: [isDesktop] },
	)

	let containerHeightClass = 'h-[350vh]'
	let blockHeightClass = 'h-screen'
	if (!isDesktop) {
		containerHeightClass = ''
		blockHeightClass = ''
	}

	return (
		<Section
			className={`${containerHeightClass} w-full pt-0 pb-0 xl:pt-0 xl:pb-0 1440:pt-0 1440:pb-0`}
			data-sticky-container
		>
			<h2 className="visually-hidden">Moonglade - photo gallery</h2>
			<div
				ref={contain}
				className={`${blockHeightClass} sticky top-0 left-0 w-full overflow-hidden container py-4`}
				data-sticky-block
			>
				<GalleryBg />
				<GalleryTitle />
				<GalleryContent />
			</div>
		</Section>
	)
}
