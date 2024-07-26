'use client'

import { FC, useRef } from 'react'
import Image from 'next/image'
import { Section } from '../Section'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SurferSmall from '@/shared/img/pic01.jpg'
import Dance from '@/shared/img/pic01.jpg'
import BgTop from '@/shared/img/scaled-img-bg-top.jpg'

export const VerticalScaledImgSection: FC = () => {
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

			// heading
			ScrollTrigger.batch('[data-heading-line]', {
				once: true,
				start: 'top bottom',
				onEnter: (batch) =>
					gsap.to(batch, {
						y: 0,
						opacity: 1,
						clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
						duration: 0.5,
						ease: 'power1.out',
					}),
			})

			// text
			const lines: HTMLElement[] = gsap.utils.toArray('[data-text-line]')

			lines.forEach((line) => {
				const letters = gsap.utils.toArray(line.querySelectorAll('div'))

				gsap.to(letters, {
					opacity: 1,
					stagger: {
						each: 0.05,
						from: 'center',
					},
					scrollTrigger: {
						trigger: '[data-text-trigger]',
						start: 'top 95%',
						once: true,
					},
				})
			})

			const tl = gsap.timeline({
				defaults: {
					ease: 'none',
				},
				scrollTrigger: {
					trigger: contain.current,
					start: 'top bottom',
					end: 'top 40%',
					scrub: true,
				},
			})

			// small image
			tl.to('[data-heading-image-holder]', {
				y: -3,
			}).to(
				'[data-heading-image]',
				{
					yPercent: 15,
				},
				'<',
			)

			// big image
			const tl2 = gsap
				.timeline({
					scrollTrigger: {
						trigger: '[data-image-wrapper]',
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
					},
				})
				.to('[data-image]', {
					scale: 1,
					ease: 'power2.out',
				})
			const tl3 = gsap
				.timeline({
					scrollTrigger: {
						trigger: '[data-image-wrapper]',
						start: 'top bottom',
						end: 'top -50%',
						scrub: true,
					},
				})
				.to('[data-image]', {
					yPercent: 16,
					ease: 'none',
				})

			return () => {
				tl.kill()
				tl2.kill()
				tl3.kill()
				stBasic.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<Section className="scaled-img pt-0 xl:pt-0 1440:pt-0">
			<div ref={contain} className="container">
				<div className="absolute left-0 top-0 w-full h-full -z-[1]">
					<Image
						className="absolute top-0 right-0 block h-auto max-w-full object-contain object-right-top select-none -z-[1]"
						src={BgTop}
						width="1440"
						height="1011"
						alt=""
						aria-hidden="true"
						unoptimized
					/>
				</div>
				<h2 className="visually-hidden">
					Let&apos;s enjoy what we have. Let&apos;s keep the vibe-vibe.
				</h2>
				<div
					className="relative font-moonglade text-[3.5rem] md:text-[7rem] lg:text-[10rem] leading-none text-center uppercase -translate-y-24 lg:-translate-y-60"
					aria-hidden="true"
				>
					<div className="shift-line clip-line leading-[0.9]" data-heading-line>
						Let{'\u2019'}s enjoy what
					</div>
					<div className="shift-line clip-line leading-[0.9]" data-heading-line>
						{'\u0060'} we have
					</div>
					<div className="heading-img-wrapper flex justify-center  -my-4 lg:-my-16 z-[1]">
						<div
							className="relative w-[120px] h-[112px] lg:w-[230px] lg:h-[215px] translate-y-[30%] overflow-hidden"
							data-heading-image-holder
						>
							<Image
								className="w-full h-full object-cover translate-y-[-15%] select-none"
								data-heading-image
								src={SurferSmall}
								width={230}
								height={215}
								alt=""
								aria-hidden="true"
							/>
						</div>
					</div>
					<div
						className="relative z-[2] shift-line clip-line leading-[0.9]"
						data-heading-line
					>
						Let{'\u2019'}s keep the
					</div>
					<div
						data-heading-line
						className="relative z-[2] shift-line clip-line leading-[0.9]"
					>
						vibe~vibe
					</div>
				</div>
				<div
					className="image-wrapper relative w-full overflow-hidden"
					data-image-wrapper
				>
					<Image
						className="scale-[1.35] -translate-y-[12%] w-full object-cover select-none"
						data-image
						src={Dance}
						width={1707}
						height={2560}
						alt="A dancing man"
					/>
					<div className="absolute left-0 top-0 w-full h-full bg-black opacity-10 pointer-events-none"></div>
					<p className="visually-hidden">Lifestyle and health support</p>
					<div
						className="scaled-image-text-wrapper absolute left-0 bottom-0 right-0 w-full p-12 md:py-20 lg:py-44 font-moonglade text-[2.4rem] md:text-[5rem] lg:text-[7rem] leading-[1.1] text-center uppercase"
						aria-hidden="true"
					>
						<div
							className="relative max-w-[23rem] md:max-w-[68rem] pl-6 mx-auto text-center z-[1]"
							data-text-line
							data-text-trigger
						>
							<div className="inline-block opacity-0">L</div>{' '}
							<div className="inline-block opacity-0">I</div>{' '}
							<div className="inline-block opacity-0">F</div>{' '}
							<div className="inline-block opacity-0">E</div>{' '}
							<div className="inline-block opacity-0">S</div>
							<div className="inline-block opacity-0">T</div>{' '}
							<div className="inline-block opacity-0">Y</div>
							<div className="inline-block opacity-0">L</div>{' '}
							<div className="inline-block opacity-0">E</div>{' '}
							<div className="inline-block opacity-0">~</div>
						</div>
						<div
							className="relative max-w-[23rem] md:max-w-[68rem] mx-auto text-right z-[1]"
							data-text-line
						>
							<div className="inline-block opacity-0">a</div>
							<div className="inline-block opacity-0">n</div>
							<div className="inline-block opacity-0">d</div>{' '}
							<div className="inline-block opacity-0">H</div>
							<div className="inline-block opacity-0">E</div>{' '}
							<div className="inline-block opacity-0">A</div>{' '}
							<div className="inline-block opacity-0">L</div>{' '}
							<div className="inline-block opacity-0">T</div>
							<div className="inline-block opacity-0">H</div>
						</div>
						<div
							className="relative max-w-[23rem] md:max-w-[68rem] pl-6 mx-auto text-center z-[1]"
							data-text-line
						>
							<div className="inline-block opacity-0">`</div>{' '}
							<div className="inline-block opacity-0">S</div>{' '}
							<div className="inline-block opacity-0">U</div>{' '}
							<div className="inline-block opacity-0">P</div>
							<div className="inline-block opacity-0">P</div>{' '}
							<div className="inline-block opacity-0">O</div>
							<div className="inline-block opacity-0">R</div>
							<div className="inline-block opacity-0">T</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	)
}
