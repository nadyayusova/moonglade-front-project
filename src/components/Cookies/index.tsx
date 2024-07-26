'use client'

import { FC, useEffect, useRef } from 'react'
import { Cross } from '@/shared/svg/Cross'
import { FlipButton } from '../FlipButton'
import Link from 'next/link'
import {
	CURRENT_PROJECT_COOKIES_DURATION,
	COOKIES_BASE_DURATION,
	COOKIES_NAME,
} from '@/constants/cookies'

export const Cookies: FC = () => {
	const cookies = useRef<HTMLDivElement>(null)

	const getCookies = (value: string) => {
		const matches = document.cookie.match(
			new RegExp(
				'(?:^|; )' +
					value.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') +
					'=([^;]*)',
			),
		)

		return matches ? decodeURIComponent(matches[1]) : false
	}

	const setCookies = (value: string, days: number) => {
		let expires = ''
		if (days) {
			const date = new Date()
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
			expires = '; expires=' + date.toUTCString()
		}
		document.cookie = COOKIES_NAME + '=' + (value || '') + expires + '; path=/'
	}

	// just in case
	// const deleteCookies = () => {
	// 	setCookies('', -1)
	// }

	const hideWindow = () => {
		if (cookies.current) {
			cookies.current.style.transform = 'translateY(120%)'
			setTimeout(() => {
				cookies.current?.classList.remove('is-visible')
			}, 300)
		}
	}

	const showWindow = () => {
		if (cookies.current) {
			cookies.current.classList.add('is-visible')
			cookies.current.style.transform = 'translateY(0%)'
		}
	}

	const handleAcceptClick = () => {
		if (cookies.current) {
			const cookieDuration =
				parseInt(cookies.current.dataset.cookiesDuration || '') ||
				COOKIES_BASE_DURATION
			setCookies('yes', cookieDuration)
		}

		hideWindow()
	}

	const handleCloseClick = () => {
		hideWindow()
	}

	useEffect(() => {
		const cookiesString = getCookies(COOKIES_NAME)

		if (!cookiesString) {
			showWindow()
		}
	}, [])

	return (
		<div
			ref={cookies}
			className="cookies fixed bottom-[20px] right-[20px] hidden items-center w-[calc(100%-32px)] max-w-[777px] p-[26px_27px_27px_40px] bg-[#1f1f1f] rounded-[12px] transition-transform duration-300 z-[2000]"
			style={{ transform: 'translateY(120%)' }}
			data-cookies
			data-cookies-duration={CURRENT_PROJECT_COOKIES_DURATION}
		>
			<p className="flex-1 m-0 mr-[20px] text-[13px] leading-[1.38] uppercase text-white">
				By continuing to use our site you agree to using cookies in accordance
				with our{' '}
				<Link
					className="text-white no-underline border-solid border-b-[1px] border-white transition-opacity hover:opacity-80 duration-300"
					href="https://share.macwel.app/privacypolicy"
				>
					Privacy Policy
				</Link>
			</p>
			<div className="cookie-btn-wrapper flex items-center">
				<FlipButton
					className="flip-btn--text flip-btn--white"
					onClick={handleAcceptClick}
				>
					<span>Accept cookies</span>
				</FlipButton>
				<button
					type="button"
					className="cookies-close-btn"
					onClick={handleCloseClick}
				>
					<Cross />
				</button>
			</div>
		</div>
	)
}
