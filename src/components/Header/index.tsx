'use client'

import { HeaderLogo } from '@/shared/svg/HeaderLogo'
import Link from 'next/link'
import Image from 'next/image'
import HeaderMenuBg from '@/shared/img/header-menu-bg.jpg'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useDebounce from '@/hooks/use-debounce'
import { useMediaQuery } from '@/hooks/use-media-query'
import LocomotiveScroll from 'locomotive-scroll'
import { Modal } from '../Modal'
import { Player } from '../Player'
import { VIDEO_SRC } from '@/constants/video'

export const Header = ({ loco }: { loco: LocomotiveScroll | null }) => {
	const contain = useRef<HTMLDivElement>(null)
	const [isMenuOpened, setIsMenuOpened] = useState(false)
	const toggleBtn = useRef<HTMLButtonElement>(null)
	const headerMenu = useRef<HTMLDivElement>(null)
	const mobileMenuAnimation = useRef<GSAPTimeline | null>(null)
	const isDesktop = useMediaQuery('(width >= 1024px)')
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	useGSAP(
		() => {
			const mm = gsap.matchMedia()

			mm.add('(width < 1024px)', () => {
				// mobile menu
				mobileMenuAnimation.current = gsap
					.timeline({
						paused: true,
					})
					.addLabel('start')
					.fromTo(
						headerMenu.current,
						{
							clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
							duration: 0.3,
							ease: 'none',
						},
						{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
					)
					.addLabel('end')
					.from(
						'.header-list-item',
						{
							yPercent: 50,
							opacity: 0,
							stagger: 0.04,
							ease: 'none',
						},
						'start+=50%',
					)
					.from(
						'.other-links-item, .copyright',
						{
							opacity: 0,
							duration: 0.2,
							ease: 'none',
						},
						'end',
					)
			})
		},
		{ scope: contain },
	)

	useGSAP(
		() => {
			if (!isMenuOpened) {
				mobileMenuAnimation.current?.reverse()
			} else {
				mobileMenuAnimation.current?.restart()
			}
		},
		{ scope: contain, dependencies: [isMenuOpened] },
	)

	const openMenu = () => {
		setIsMenuOpened(true)
		loco?.stop()
		contain.current?.classList.remove('pointer-events-none')

		if (ScrollTrigger.isTouch === 1) {
			setTimeout(() => {
				document.documentElement.setAttribute('style', 'overflow: hidden;')
			}, 300)
		}

		if (toggleBtn.current) {
			toggleBtn.current.setAttribute('aria-label', 'Close menu')
			toggleBtn.current.setAttribute('aria-pressed', 'true')
		}
	}

	const closeMenu = () => {
		setIsMenuOpened(false)
		loco?.start()
		contain.current?.classList.add('pointer-events-none')

		if (ScrollTrigger.isTouch === 1) {
			document.documentElement.removeAttribute('style')
		}

		if (toggleBtn.current) {
			toggleBtn.current.setAttribute('aria-label', 'Open menu')
			toggleBtn.current.setAttribute('aria-pressed', 'false')
		}
	}

	const handleResize = useDebounce(() => {
		if (isDesktop && isMenuOpened) {
			closeMenu()
		}
	}, 500)

	useEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [handleResize])

	const handleToggleClick = () => {
		if (!isMenuOpened) {
			openMenu()
		} else {
			closeMenu()
		}
	}

	const handleKeyDown = (evt: any) => {
		if (evt.code === 'Escape') {
			toggleBtn.current?.click()
		}
	}

	useEffect(() => {
		if (isMenuOpened) {
			window.addEventListener('keydown', handleKeyDown)
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isMenuOpened])

	const handleClick = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	return (
		<header
			ref={contain}
			className="page-header flex-shrink-0 fixed left-0 top-0 w-full z-[20] pointer-events-none"
		>
			<div className="container">
				<div className="header-wrapper relative flex justify-between items-center py-[20px] xl:py-[52px]">
					<Link
						href="#"
						className="header-logo flex-shrink-0 w-[132px] h-[14px] mr-8 pointer-events-auto"
						target="_blank"
					>
						<HeaderLogo />
					</Link>
					<button
						ref={toggleBtn}
						className="menu-toggle-btn relative flex justify-center items-center w-16 h-16 pt-[1px] text-black bg-[#b2b2b2] rounded-full cursor-pointer pointer-events-auto lg:hidden"
						type="button"
						aria-label="Open menu"
						aria-pressed="false"
						onClick={handleToggleClick}
					>
						<span className="menu-icon menu-icon--closed"></span>
						<span className="menu-icon menu-icon--opened"></span>
					</button>
					<div
						ref={headerMenu}
						className="header-menu flex flex-col lg:block"
						data-lenis-prevent
					>
						<div className="header-menu-bg absolute left-0 bottom-0 lg:hidden w-full h-[65%] max-h-[410px] -z-[1]">
							<Image
								className="w-full h-full object-cover object-left-top select-none"
								src={HeaderMenuBg}
								width="640"
								height="818"
								alt=""
								aria-hidden="true"
								unoptimized
							/>
						</div>
						<div className="header-menu-scroller">
							<ul className="header-nav flex flex-col lg:flex-row lg:flex-wrap lg:justify-end items-center lg:mb-0 font-plain text-[1.4rem] uppercase">
								<li className="header-list-item flex items-baseline text-[13px]">
									<Link
										href="#"
										className="btn btn--link pointer-events-auto"
										target="_blank"
									>
										<span className="inline-block">Superfood</span>
									</Link>
								</li>
								<li className="header-list-item flex items-baseline text-[13px]">
									<button
										className="btn btn--link pointer-events-auto"
										type="button"
										aria-label="Play video"
										onClick={handleClick}
									>
										<span className="inline-block">Films</span>
									</button>
									{isModalOpen && (
										<Modal
											onClick={closeModal}
											className="top"
											loco={null}
											isFlipButton={true}
										>
											<Player videoSrc={VIDEO_SRC} />
										</Modal>
									)}
								</li>
								<li className="header-list-item flex items-baseline text-[13px]">
									<Link
										href="#"
										className="btn btn--link pointer-events-auto"
										target="_blank"
										rel="noopener, nofollow, noreferrer"
									>
										<span className="inline-block">Sound</span>
									</Link>
								</li>
							</ul>
						</div>
						<div className="other-links flex flex-col gap-[13px] lg:hidden mt-12">
							<ul className="flex flex-wrap justify-center items-center font-plain text-[1.2rem] uppercase">
								<li className="other-links-item flex items-baseline">
									<Link
										href="#"
										className="btn btn--link text-[1.2rem] pointer-events-auto"
										target="_blank"
										rel="noopener, nofollow, noreferrer"
									>
										<span className="inline-block">Instagram</span>
									</Link>
								</li>
							</ul>
							<ul className="flex flex-wrap justify-center items-center font-plain text-[1.2rem] uppercase">
								<li className="other-links-item flex items-baseline">
									<Link
										href="#"
										className="btn btn--link text-[1.2rem] pointer-events-auto"
										target="_blank"
									>
										<span className="inline-block">Privacy Policy</span>
									</Link>
								</li>
								<li className="other-links-item flex items-baseline">
									<Link
										href="#"
										className="btn btn--link text-[1.2rem] pointer-events-auto"
										target="_blank"
									>
										<span className="inline-block">Terms & Conditions</span>
									</Link>
								</li>
							</ul>
							<div className="copyright">
								<p className=" m-0 text-[1.2rem] text-center opacity-40 uppercase">
									Moonglade ©2020. All rights reserved
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
