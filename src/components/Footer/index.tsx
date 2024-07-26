'use client'

import { Connect, Modal } from '@/components'
import Link from 'next/link'
import { useState } from 'react'

export function Footer({ loco }: { loco: LocomotiveScroll | null }) {
	const [isContactsOpened, setIsContactsOpened] = useState(false)

	const handleClick = () => {
		setIsContactsOpened(true)
	}

	const closeModal = () => {
		setIsContactsOpened(false)
	}

	return (
		<footer className="flex-shrink-0 mt-24">
			<div className="container">
				<div className="footer-top-bar flex justify-between">
					<address className="footer-address font-plain text-[1.4rem] font-thin not-italic uppercase">
						<p className="mb-[1.5em] text-[1.4rem] font-semibold">MOONLAB</p>
						<p className="mb-[1.5em]">
							11, Some street
							<br />
							Some_city
							<br />
							Some_country
							<br />
							12345
						</p>
					</address>
					<ul className="footer-nav flex flex-wrap justify-end items-center mb-4 md:mb-0 font-plain text-[1.4rem] uppercase">
						<li className="footer-list-item flex items-baseline">
							<Link
								href="#"
								className="btn btn--link text-[1.4rem]"
								target="_blank"
								rel="noopener, nofollow, noreferrer"
							>
								<span className="inline-block">Films</span>
							</Link>
						</li>
						<li className="footer-list-item flex items-baseline">
							<Link
								href="#"
								className="btn btn--link text-[1.4rem]"
								target="_blank"
								rel="noopener, nofollow, noreferrer"
							>
								<span className="inline-block">Sound</span>
							</Link>
						</li>
						<li className="footer-list-item flex items-baseline">
							<Link
								href="#"
								className="btn btn--link text-[1.4rem]"
								target="_blank"
								rel="noopener, nofollow, noreferrer"
							>
								<span className="inline-block">Instagram</span>
							</Link>
						</li>
						<li className="footer-list-item flex items-baseline">
							<button
								className="btn btn--link text-[1.4rem]"
								onClick={handleClick}
							>
								<span className="inline-block">Connect</span>
							</button>
							{isContactsOpened && (
								<Modal onClick={closeModal} className="left" loco={loco}>
									<Connect />
								</Modal>
							)}
						</li>
					</ul>
				</div>
				<div className="footer-bottom-bar flex justify-between py-[27px] text-[1.2rem] footer-top-border">
					<p className="mb-4 md:mb-0 uppercase opacity-40">
						© 2024 THE COMPANY LTD. <br className="br-2" />
						All rights reserved. <br className="br-1" />
						Company Number: <br className="br-3" />
						1234567
					</p>
					<ul className="agreements flex flex-wrap justify-end items-center mb-4 md:mb-0 font-plain text-[1.2rem] uppercase">
						<li className="footer-list-item flex items-baseline">
							<Link
								href="#"
								className="btn btn--link text-[1.2rem]"
								target="_blank"
							>
								<span className="inline-block">Shipping & Payment</span>
							</Link>
						</li>
						<li className="footer-list-item flex items-baseline">
							<Link
								href="#"
								className="btn btn--link text-[1.2rem]"
								target="_blank"
							>
								<span className="inline-block">Privacy Policy</span>
							</Link>
						</li>
						<li className="footer-list-item flex items-baseline">
							<Link
								href="#"
								className="btn btn--link text-[1.2rem]"
								target="_blank"
							>
								<span className="inline-block">Terms & Conditions</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
