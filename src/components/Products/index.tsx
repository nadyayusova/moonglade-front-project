'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { FC, useRef } from 'react'
import { superfoodData } from '../SuperfoodSection/superfood-data'
import Image from 'next/image'
import { swiperOptions } from './swiper-options'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface ProductsProps {
	onSliderMove: any
	onTouchStart: any
	onTouchEnd: any
}

export const Products: FC<ProductsProps> = ({
	onSliderMove,
	onTouchStart,
	onTouchEnd,
}) => {
	const contain = useRef(null)
	const slides = useRef<HTMLDivElement[]>([])
	const viewportWidth = useRef<number>()

	const bounceSlides = () => {
		slides.current.forEach((slide) => {
			if ('hidden' in slide.dataset) {
				const rect = slide.getBoundingClientRect()
				if (viewportWidth.current && rect.x < viewportWidth.current) {
					slide.removeAttribute('data-hidden')
					const img = slide.querySelector('.images-wrapper')
					gsap.to(img, {
						opacity: 1,
						duration: 0.6,
						ease: 'none',
					})
					gsap.to(img, {
						scale: 1.1,
						duration: 0.4,
						repeat: 1,
						yoyo: true,
						ease: 'none',
					})
				}
			}
		})
	}

	useGSAP(
		() => {
			slides.current = gsap.utils.toArray('.swiper-slide')
			viewportWidth.current =
				window.innerWidth || document.documentElement.clientWidth

			slides.current.forEach((slide) => {
				const rect = slide.getBoundingClientRect()
				if (viewportWidth.current && rect.x > viewportWidth.current) {
					slide.setAttribute('data-hidden', '')
					const img = slide.querySelector('.images-wrapper')
					gsap.set(img, { opacity: 0 })
				}
			})
		},
		{ scope: contain },
	)

	return (
		<>
			<Swiper
				ref={contain}
				{...swiperOptions}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
				onSliderMove={(_, evt) => {
					onSliderMove(evt)
				}}
				onMomentumBounce={bounceSlides}
				onProgress={bounceSlides}
				onSlideChangeTransitionEnd={bounceSlides}
				className="mb-20 !overflow-visible"
			>
				{superfoodData.map((item) => {
					return (
						<SwiperSlide key={item.id}>
							<div
								className="slide-inner flex flex-col w-[29rem] mx-auto lg:mx-0 lg:my-0"
								data-slide
							>
								<div className="images-wrapper relative mb-6 text-center inline-block">
									<div className="back-image py-0 px-[25%] lg:px-[10%]">
										<Image
											className="w-full h-auto my-0 mx-auto select-none"
											src={item.srcProduct}
											alt=""
											aria-labelledby={`id-product-${item.id}`}
										/>
									</div>
									<div className="hover-image absolute top-0 right-[12%] lg:right-0 lg:left-0 flex justify-center items-center w-[40%] lg:w-full h-full opacity-0">
										<Image
											className="lg:absolute lg:-right-[10%] lg:-bottom-[10%] w-full lg:w-[70%] lg:max-w-none opacity-100 backface-hidden select-none"
											src={item.srcPlant}
											alt=""
											aria-hidden="true"
										/>
									</div>
								</div>
								<div className="product-description">
									<h3 className="product-title" id={`id-product-${item.id}`}>
										{item.title}
									</h3>
									<div className="product-meta">
										<div className="product-form">{item.form}</div>
										{item.price && (
											<div className="product-price mr-[0.9rem]">
												{item.price}
											</div>
										)}
										<div className="product-currency">{item.currency}</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
			<div data-products-pagination></div>
		</>
	)
}
