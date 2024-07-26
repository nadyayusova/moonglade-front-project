'use client'

import { FC, HTMLProps, useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ANIMATION_DELAY } from '@/constants/animations'
import { Cross } from '@/shared/svg/Cross'
import { Close } from '@/shared/svg/Close'
import LocomotiveScroll from 'locomotive-scroll'
import { FlipButton } from '../FlipButton'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ModalProps extends HTMLProps<HTMLElement> {
	loco?: LocomotiveScroll | null
	isFlipButton?: boolean
}

export const Modal: FC<ModalProps> = ({
	children,
	className = '',
	onClick,
	loco,
	isFlipButton = false,
}) => {
	gsap.registerPlugin(ScrollTrigger)
	const ref = useRef<Element | null>(null)
	const [mounted, setMounted] = useState(false)
	const closeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		ref.current = document.querySelector<HTMLElement>('#modal')
		setMounted(true)
		loco?.stop()

		if (ScrollTrigger.isTouch === 1) {
			document.documentElement.setAttribute('style', 'overflow: hidden;')
		}
	}, [loco])

	const handleKeyDown = (evt: any) => {
		if (evt.code === 'Escape') {
			closeRef.current?.click()
		}
	}

	useEffect(() => {
		let t: ReturnType<typeof setTimeout>

		if (mounted) {
			t = setTimeout(() => {
				if (ref.current)
					ref.current.querySelector('.modal')?.classList.add('show')
			}, 50)
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			clearTimeout(t)
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [mounted])

	const handleClick = (evt: any) => {
		if (
			evt.target.closest('.modal-content') &&
			!(
				evt.target.closest('.modal-close-btn') ||
				evt.target.closest('.modal-close-flip-btn')
			)
		) {
			return
		}

		const delay = Math.trunc(parseFloat(ANIMATION_DELAY) * 1000) || 300

		if (mounted && ref.current) {
			ref.current.querySelector('.modal')?.classList.remove('show')

			setTimeout(() => {
				setMounted(false)
				if (onClick) onClick(evt)
				loco?.start()

				if (ScrollTrigger.isTouch === 1) {
					document.documentElement.removeAttribute('style')
				}
			}, delay)
		}
	}

	const style = { '--animation-delay': ANIMATION_DELAY } as React.CSSProperties

	return mounted && ref.current
		? createPortal(
				<div
					ref={closeRef}
					className="modal"
					data-lenis-prevent
					style={style}
					onClick={(evt) => handleClick(evt)}
				>
					<div className={`modal-content ${className}`}>
						{isFlipButton ? (
							<FlipButton
								className="modal-close-flip-btn"
								ariaLabel="Close player"
							>
								<Close />
							</FlipButton>
						) : (
							<button className="modal-close-btn" aria-label="Close window">
								<Cross />
							</button>
						)}
						{children}
					</div>
				</div>,
				ref.current,
			)
		: null
}
