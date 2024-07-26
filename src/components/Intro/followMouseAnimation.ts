import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

export function followMouseAnimation(
	container: HTMLDivElement,
	element: HTMLDivElement,
) {
	gsap.registerPlugin(ScrollTrigger)

	if (ScrollTrigger.isTouch === 1) {
		return
	}

	const mouse = { x: 0, y: 0, moved: false, leave: false }

	let rect = container.getBoundingClientRect()
	const maxDistance = Number(element.dataset.maxDistance) || 20

	function mouseMoveHandler(e: MouseEvent) {
		mouse.moved = true
		mouse.leave = false
		mouse.x = e.clientX - rect.left
		mouse.y = e.clientY - rect.top
	}

	function mouseLeaveHandler() {
		mouse.moved = false
		mouse.leave = true
	}

	ScrollTrigger.create({
		trigger: container,
		start: 'top bottom',
		end: 'bottom top',
		onEnter: () => {
			gsap.ticker.add(move)
			container.addEventListener('mousemove', mouseMoveHandler)
			container.addEventListener('mouseleave', mouseLeaveHandler)
			window.addEventListener('resize', updateRect)
			window.addEventListener('scroll', updateRect)
		},
		onLeave: () => {
			gsap.ticker.remove(move)
			container.removeEventListener('mousemove', mouseMoveHandler)
			container.removeEventListener('mouseleave', mouseLeaveHandler)
			window.removeEventListener('resize', updateRect)
			window.removeEventListener('scroll', updateRect)
		},
		onEnterBack: () => {
			gsap.ticker.add(move)
			container.addEventListener('mousemove', mouseMoveHandler)
			container.addEventListener('mouseleave', mouseLeaveHandler)
			window.addEventListener('resize', updateRect)
			window.addEventListener('scroll', updateRect)
		},
		onLeaveBack: () => {
			gsap.ticker.remove(move)
			container.removeEventListener('mousemove', mouseMoveHandler)
			container.removeEventListener('mouseleave', mouseLeaveHandler)
			window.removeEventListener('resize', updateRect)
			window.removeEventListener('scroll', updateRect)
		},
	})

	function move() {
		if (mouse.moved) {
			const movement = Number(
				mouse.leave ? 0 : element.dataset.animateParallaxElement,
			)
			const easing = 'power2'
			const speed = Number(mouse.leave ? 1 : element.dataset.speed)
			const direction = Number(element.dataset.direction)

			let x = direction * ((mouse.x - rect.width / 2) / rect.width) * movement
			let y = direction * ((mouse.y - rect.height / 2) / rect.height) * movement

			if (x < -maxDistance * 2) x = -maxDistance * 2
			if (x > 0) x = 0

			if (Math.abs(y) > maxDistance) {
				if (y > 0) y = maxDistance
				if (y < 0) y = -maxDistance
			}

			parallaxIt(element, x, y, speed, easing)
		}

		mouse.moved = false
	}

	function updateRect() {
		rect = element.getBoundingClientRect()
	}

	function parallaxIt(
		target: HTMLDivElement,
		x: number,
		y: number,
		speed: number,
		easing: string,
	) {
		gsap.to(target, {
			duration: speed,
			ease: easing,
			x: x,
			y: y,
		})
	}
}
