'use client'

import { FC, HTMLProps, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Modal, Player } from '@/components'

interface PlayButtonProps extends HTMLProps<HTMLButtonElement> {
	videoSrc: string
	videos: HTMLVideoElement[]
}

export const PlayButton: FC<PlayButtonProps> = ({
	className = '',
	videoSrc,
	videos,
}) => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef<HTMLButtonElement>(null)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	useGSAP(
		() => {
			if (ScrollTrigger.isTouch === 1) {
				return
			}

			if (contain && contain.current) {
				contain.current.addEventListener('mousemove', (e) => {
					const { offsetX, offsetY } = e

					gsap.to(contain.current, {
						x: () =>
							offsetX - (contain.current as HTMLButtonElement)?.offsetWidth / 2,
						y: () =>
							offsetY -
							(contain.current as HTMLButtonElement)?.offsetHeight / 2,
						duration: 1,
						ease: 'none',
					})
				})

				contain.current.addEventListener('mouseleave', () => {
					gsap.to(contain.current, {
						x: 0,
						y: 0,
						duration: 1,
						ease: 'power1.out',
					})
				})
			}
		},
		{ scope: contain },
	)

	const stopVideos = () => {
		videos.forEach((item) => {
			item.pause()
		})
	}

	const playVideos = () => {
		videos.forEach((item) => {
			item.play()
		})
	}

	const handleClick = () => {
		setIsModalOpen(true)
		stopVideos()
	}

	const closeModal = () => {
		setIsModalOpen(false)
		playVideos()
	}

	return (
		<>
			<button
				ref={contain}
				className={`btn play-btn ${className}`}
				type="button"
				aria-label="Play video"
				onClick={handleClick}
			>
				<span></span>
			</button>
			{isModalOpen && (
				<Modal
					onClick={closeModal}
					className="top"
					loco={null}
					isFlipButton={true}
				>
					<Player videoSrc={videoSrc} />
				</Modal>
			)}
		</>
	)
}
