'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Scrollbar = ({
	progress,
	max,
	st,
}: {
	progress: number
	max: number
	st: ScrollTrigger | null
}) => {
	gsap.registerPlugin(ScrollToPlugin)
	const [pageHeight, setPageHeight] = useState<number>(0)
	const track = useRef<HTMLDivElement>(null)
	const thumb = useRef<HTMLDivElement>(null)
	const double = useRef<HTMLDivElement>(null)
	const thumbHeight = useRef<number>(0)
	const thumbMaxY = useRef<number>(0)
	const isClicked = useRef<boolean>(false)
	const coords = useRef<{ startY: number; lastY: number }>({
		startY: 0,
		lastY: 0,
	})
	const timer = useRef<ReturnType<typeof setTimeout>>()
	const htmldoc = useRef<HTMLHtmlElement | null>(null)

	useEffect(() => {
		if (pageHeight > 0) {
			const top = gsap.utils.mapRange(0, 1, 0, thumbMaxY.current, progress)

			const topTo = gsap.quickTo(thumb.current, 'top', {
				duration: 0.01,
				ease: 'none',
			})
			topTo(top)

			if (double.current && thumb.current && !isClicked.current) {
				double.current.style.top = thumb.current.style.top
			}

			if (!track.current?.classList.contains('cb-show')) {
				track.current?.classList.add('cb-show')
			}

			if (timer.current) clearTimeout(timer.current)

			timer.current = setTimeout(() => {
				track.current?.classList.remove('cb-show')
			}, 500)
		}

		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [progress, pageHeight])

	const updateThumbMaxY = () => {
		const viewportHeight = document.documentElement.clientHeight
		thumbHeight.current = thumb.current?.getBoundingClientRect().height || 0
		thumbMaxY.current = Math.round(viewportHeight - thumbHeight.current)
	}

	useEffect(() => {
		window.addEventListener('resize', updateThumbMaxY)

		if (double.current) {
			htmldoc.current = double.current.closest('html')
		}

		return () => {
			window.removeEventListener('resize', updateThumbMaxY)
		}
	}, [])

	useEffect(() => {
		setPageHeight(max)
		updateThumbMaxY()
	}, [max])

	const getScrollToPosition = useCallback(
		(y: number) => {
			return gsap.utils.mapRange(0, thumbMaxY.current, 0, pageHeight, y)
		},
		[thumbMaxY, pageHeight],
	)

	const handleClick = (evt: any) => {
		const clickY = evt.clientY
		const targetPageScrollY = getScrollToPosition(clickY)
		gsap.to(window, { duration: 0.5, scrollTo: targetPageScrollY })
	}

	useEffect(() => {
		const onMouseDown = (e: MouseEvent) => {
			isClicked.current = true

			coords.current.lastY = e.clientY
			coords.current.startY = e.clientY

			if (double.current) double.current.style.cursor = 'grabbing'

			if (htmldoc.current) {
				htmldoc.current.style.userSelect = 'none'
			}
		}

		const onMouseUp = () => {
			isClicked.current = false

			if (double.current) {
				coords.current.lastY = double.current.offsetTop
				double.current.style.cursor = ''
			}

			if (htmldoc.current) {
				htmldoc.current.style.userSelect = ''
			}

			if (double.current && thumb.current && !isClicked.current) {
				double.current.style.top = thumb.current.style.top
			}
		}

		const onMouseMove = (e: MouseEvent) => {
			if (!isClicked.current) return

			const nextY = e.clientY - coords.current.startY + coords.current.lastY

			if (double.current)
				double.current.style.top = `${nextY > thumbMaxY.current ? thumbMaxY.current : nextY}px`

			const targetPageScrollY = getScrollToPosition(nextY)
			st?.scroll(targetPageScrollY)
		}

		double.current?.addEventListener('mousedown', onMouseDown)
		double.current?.addEventListener('mouseup', onMouseUp)
		track.current?.addEventListener('mousemove', onMouseMove)
		track.current?.addEventListener('mouseleave', onMouseUp)
		const d = double.current
		const t = track.current

		return () => {
			d?.removeEventListener('mousedown', onMouseDown)
			d?.removeEventListener('mouseup', onMouseUp)
			t?.removeEventListener('mousemove', onMouseMove)
			t?.removeEventListener('mouseleave', onMouseUp)
		}
	}, [st, getScrollToPosition])

	return (
		<div
			ref={track}
			className="scrollbar-track fixed top-0 right-[1px] h-full w-3 hover:w-4 [transition:_width_0.3s_ease,opacity_0.3s_ease] opacity-0 hover:opacity-100 bg-transparent"
			onClick={handleClick}
		>
			<div
				ref={thumb}
				className="scrollbar-thumb absolute right-0 w-full h-[4vh] rounded-lg bg-black opacity-50 select-none pointer-events-none"
			></div>
			<div
				ref={double}
				className="scrollbar-double absolute right-0 w-full h-[4vh] rounded-lg bg-transparent cursor-grab z-10"
			></div>
		</div>
	)
}

export { Scrollbar }
