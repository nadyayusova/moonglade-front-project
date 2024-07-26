'use client'

import { FC, useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import IntroBgLeft from '@/shared/img/intro-bg-left.jpg'
import IntroBgRight from '@/shared/img/intro-bg-right.jpg'
import Fish from '@/shared/img/hero-decoration01.png'
import { followMouseAnimation } from './followMouseAnimation'

interface IntroProps {
	isPreloaderPlaying: boolean
}

export const Intro: FC<IntroProps> = ({ isPreloaderPlaying }) => {
	const contain = useRef(null)
	const fish = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const tl = gsap.timeline({ paused: isPreloaderPlaying })

			tl.addLabel('start')
				.set('[data-intro-str]', { opacity: 1 })
				.to('[data-intro-bg]', {
					clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
					duration: 1.5,
					ease: 'linear',
				})
				.to(
					'.word',
					{
						y: 0,
						stagger: 0.05,
						duration: 0.5,
					},
					'start+=0.5',
				)
				.to('[data-intro-fish]', { scale: 1, ease: 'none' }, '<')
				.to(
					'[data-intro-advice]',
					{
						opacity: 0.7,
						duration: 1,
						ease: 'power1.out',
					},
					'-=50%',
				)

			if (contain.current && fish.current) {
				followMouseAnimation(contain.current, fish.current)
			}

			return () => {
				tl.kill()
			}
		},
		{ scope: contain, dependencies: [isPreloaderPlaying] },
	)

	return (
		<section
			ref={contain}
			className="intro relative flex flex-col justify-center items-center min-h-screen min-h-svh text-[28px] md:text-[48px] uppercase overflow-hidden"
		>
			<div
				className="absolute left-0 top-0 w-full h-full clip-intro-bg -z-[1]"
				data-intro-bg
			>
				<span className="intro-bg intro-bg--left">
					<Image
						src={IntroBgLeft}
						width="705"
						height="800"
						alt=""
						aria-hidden="true"
						unoptimized
					/>
				</span>
				<span className="intro-bg intro-bg--right">
					<Image
						src={IntroBgRight}
						width="705"
						height="800"
						alt=""
						aria-hidden="true"
						unoptimized
					/>
				</span>
			</div>

			<h1 className="visually-hidden">
				The way we live, love, create and feel
			</h1>
			<div className="container" aria-hidden="true">
				<div className="intro__words relative w-full max-w-[29rem] 520:max-w-[49rem] md:max-w-[75rem] lg:max-w-[99.4rem] m-[0_auto] mb-8 xl:mb-10 font-moonglade text-[3.5rem] 520:text-[5rem] md:text-[7rem] lg:text-[10rem] leading-[1.1]">
					<div className="clip-words opacity-0 text-left" data-intro-str>
						<span className="word inline-block shift-word">the</span>{' '}
						<span className="word inline-block shift-word">way</span>{' '}
						<span className="word inline-block shift-word">we</span>{' '}
						<span className="word inline-block shift-word">live,</span>
					</div>
					<div className="clip-words opacity-0 text-right" data-intro-str>
						<span className="word inline-block shift-word">love,</span>{' '}
						<span>&nbsp;</span> <span>&nbsp;</span>{' '}
						<span className="word inline-block shift-word">create</span>
					</div>
					<div className="clip-words opacity-0 text-center" data-intro-str>
						<span className="word inline-block shift-word">
							<span className="tracking-[0.02em]">{'\u0060'}</span> and
						</span>{' '}
						<span className="word inline-block shift-word">feel</span>
					</div>
					<div
						ref={fish}
						className="absolute block fish-scale"
						data-intro-fish
						data-animate-parallax-element="50"
						data-direction="-1"
						data-speed="3"
						data-max-distance="20"
					>
						<Image
							className="block w-full h-full select-none"
							src={Fish}
							width="379"
							height="425"
							alt=""
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
			<div
				className="scroll-down absolute bottom-0 left-0 w-full font-plain font-normal text-12 text-center opacity-0"
				data-intro-advice
			>
				<i className="icon-infinity mb-1 text-18"></i>
				<p className="uppercase mb-0 text-12 leading-[1.5]">~ scroll down ~</p>
			</div>
		</section>
	)
}
