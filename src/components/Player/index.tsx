'use client'

import { FC, HTMLProps, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTROLS_TIMEOUT } from '@/constants/video'
import { Mute } from '@/shared/svg/Mute'
import { Fullscreen } from '@/shared/svg/Fullscreen'

interface PlayerProps extends HTMLProps<HTMLButtonElement> {
	videoSrc: string
}

export const Player: FC<PlayerProps> = ({ className = '', videoSrc }) => {
	const classes = `player relative overflow-hidden ${className}`
	const contain = useRef<HTMLDivElement>(null)
	const controls = useRef<HTMLDivElement>(null)
	const video = useRef<HTMLVideoElement>(null)
	const playBtn = useRef<HTMLButtonElement>(null)
	const buffer = useRef<HTMLDivElement>(null)
	const muteBtn = useRef<HTMLButtonElement>(null)
	const fullscreenBtn = useRef<HTMLButtonElement>(null)
	const progressBar = useRef<HTMLDivElement>(null)
	const progress = useRef<HTMLDivElement>(null)
	const selector = useRef<HTMLDivElement>(null)
	const time = useRef<HTMLDivElement>(null)
	const hideTimer = useRef<ReturnType<typeof setTimeout>>()
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [currentPosition, setCurrentPosition] = useState<number>(0)
	const [timer, setTimer] = useState(['00', '00', '00', '00']) // h, m, s, ms
	const [xPosition, setXPosition] = useState<number>(0)
	const [isTouch, setIsTouch] = useState<boolean>(false)

	const playVideo = () => {
		video.current?.play()
		playBtn.current?.classList.remove('play')
		playBtn.current?.classList.add('pause')
		setIsPlaying(true)
	}

	const stopVideo = () => {
		video.current?.pause()
		playBtn.current?.classList.remove('pause')
		playBtn.current?.classList.add('play')
		setIsPlaying(false)
	}

	const handlePlayClick = () => {
		isPlaying ? stopVideo() : playVideo()
	}

	const muteVideo = () => {
		if (video.current) video.current.muted = true
		muteBtn.current?.classList.add('muted')
		setIsMuted(true)
	}

	const unmuteVideo = () => {
		if (video.current) video.current.muted = false
		muteBtn.current?.classList.remove('muted')
		setIsMuted(false)
	}

	const handleMuteClick = () => {
		isMuted ? unmuteVideo() : muteVideo()
	}

	const handleFullscreenClick = () => {
		if (video.current?.requestFullscreen) {
			contain.current?.requestFullscreen() // Chrome
			// @ts-expect-error for Safari
		} else if (video.current?.webkitRequestFullscreen) {
			// @ts-expect-error for Safari
			contain.current?.webkitRequestFullscreen() // Safari
			// @ts-expect-error for Edge
		} else if (video.current?.msRequestFullscreen) {
			// @ts-expect-error for Edge
			contain.current?.msRequestFullscreen() // IE/Edge
		}
	}

	const updateTimer = () => {
		if (video.current) {
			const hours = Math.floor(video.current?.currentTime / 3600)
			const minutes = Math.floor(video.current?.currentTime / 60 - hours * 3600)
			const seconds = Math.floor(
				video.current?.currentTime - minutes * 60 - hours * 3600,
			)
			const ms = Math.round((video.current?.currentTime % 1) * 100)

			setTimer([
				hours.toString().padStart(2, '0'),
				minutes.toString().padStart(2, '0'),
				seconds.toString().padStart(2, '0'),
				ms.toString().padStart(2, '0'),
			])
		}
	}

	const handleTimeUpdate = () => {
		const current =
			((video.current?.currentTime || 0) / (video.current?.duration || 1)) * 100

		setCurrentPosition(current)
	}

	useEffect(() => {
		if (progress.current)
			progress.current.style.width = `${currentPosition.toFixed(2)}%`
		updateTimer()
	}, [currentPosition])

	useEffect(() => {
		playVideo()

		if (!isTouch) {
			hideTimer.current = setTimeout(() => {
				controls.current?.classList.remove('visible')
			}, CONTROLS_TIMEOUT)
		}
	}, [isTouch])

	const handleProgressBarClick = (evt: any) => {
		if (progressBar.current) {
			const progressBarLeft = evt.pageX - progressBar.current.offsetLeft
			const progressTime =
				(progressBarLeft / progressBar.current.offsetWidth) *
				(video.current?.duration || 1)

			if (video.current) video.current.currentTime = progressTime
		}
	}

	const handleMouseMove = (evt: any) => {
		if (selector.current) {
			if (evt.target.classList.contains('progress-line')) {
				if (!selector.current.classList.contains('inverted'))
					selector.current.classList.add('inverted')
			}
			if (evt.target.classList.contains('player-progress')) {
				if (selector.current.classList.contains('inverted'))
					selector.current.classList.remove('inverted')
			}
		}

		if (progressBar.current && selector.current) {
			const newX: number = evt.clientX - progressBar.current.offsetLeft

			setXPosition(newX)
		}
	}

	const handleMouseEnter = (evt: any) => {
		if (selector.current) selector.current.style.opacity = '1'

		if (progressBar.current && selector.current) {
			const x = evt.clientX - progressBar.current.offsetLeft

			gsap.set(selector.current, { x: x })
		}
	}

	const handleMouseLeave = () => {
		if (selector.current) selector.current.style.opacity = '0'
	}

	useGSAP(
		() => {
			setIsTouch(ScrollTrigger.isTouch === 1)
		},
		{ scope: contain },
	)

	useGSAP(
		() => {
			// selector movement
			if (selector.current) {
				const xTo = gsap.quickTo(selector.current, 'x', {
					duration: 0.01,
					ease: 'none',
				})

				xTo(xPosition)
			}
		},
		{ scope: contain, dependencies: [xPosition] },
	)

	const handleKeyDown = (evt: any) => {
		if (evt.code === 'Space') {
			handlePlayClick()
		}
	}

	const handleCanPlay = () => {
		if (playBtn.current && buffer.current) {
			playBtn.current.style.display = ''
			buffer.current.style.display = 'none'
		}
	}

	const handleWaiting = () => {
		if (playBtn.current && buffer.current) {
			playBtn.current.style.display = 'none'
			buffer.current.style.display = ''
		}
	}

	const handleControlsMouseMove = () => {
		if (!controls.current?.classList.contains('visible'))
			controls.current?.classList.add('visible')

		if (hideTimer.current) {
			clearTimeout(hideTimer.current)

			hideTimer.current = setTimeout(() => {
				controls.current?.classList.remove('visible')
			}, CONTROLS_TIMEOUT)
		}
	}

	return (
		<div
			ref={contain}
			className={classes}
			onKeyDown={handleKeyDown}
			tabIndex={-1}
		>
			<video
				ref={video}
				className="w-full h-full object-contain select-none"
				width="1270"
				height="800"
				loop
				playsInline
				preload="none"
				onClick={handlePlayClick}
				onTimeUpdate={handleTimeUpdate}
				onCanPlay={handleCanPlay}
				onWaiting={handleWaiting}
			>
				{/* huge file > 1 GB */}
				<source src={videoSrc} />
				Your browser does not support the video tag.
			</video>
			<div
				ref={controls}
				className="player-controls visible"
				onMouseMove={isTouch ? undefined : handleControlsMouseMove}
			>
				<button
					ref={playBtn}
					type="button"
					className="player-btn trigger-btn play"
					onClick={handlePlayClick}
				>
					<span>P</span>
					<span>L</span>
					<span>A</span>
					<span>U</span>
					<span>Y</span>
					<span>S</span>
					<span>E</span>
				</button>
				<div ref={buffer} className="player-buff" style={{ display: 'none' }}>
					<div className="loading">
						<div className="loading-content">
							<div className="loading-circle"></div>
						</div>
					</div>
				</div>
				<div
					ref={progressBar}
					className="player-progress"
					onClick={handleProgressBarClick}
					onMouseMove={isTouch ? undefined : handleMouseMove}
					onMouseEnter={isTouch ? undefined : handleMouseEnter}
					onMouseLeave={isTouch ? undefined : handleMouseLeave}
				>
					<div ref={progress} className="progress-line"></div>
					<div ref={selector} className="progress-selector"></div>
				</div>
				<div ref={time} className="player-time">
					<span className="hours">{timer[0]}</span>:
					<span className="minutes">{timer[1]}</span>:
					<span className="seconds">{timer[2]}</span>:
					<span className="millisecond">{timer[3]}</span>
				</div>
				<button
					ref={muteBtn}
					type="button"
					className="player-btn player-mute"
					onClick={handleMuteClick}
				>
					<Mute />
				</button>
				<button
					ref={fullscreenBtn}
					type="button"
					className="player-btn player-fullscreen"
					onClick={handleFullscreenClick}
				>
					<Fullscreen />
				</button>
			</div>
		</div>
	)
}
