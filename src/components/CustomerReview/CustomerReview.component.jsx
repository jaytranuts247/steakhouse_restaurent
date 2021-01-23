import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Slider from "../Slider/Slider.component";
import RatingStars from "../RatingStars/RatingStars.component";

import { DoubleQuoteSerifRight } from "@styled-icons/open-iconic";

import "./CustomerReview.styles.scss";

const reviewsList = [
	{
		name: "Adriana Ford",
		review:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptate laborum est, quia quo deleniti velit repudiandae reiciendis error autem expedita explicabo quam blanditiis recusandae!",
		rating: 5,
	},
	{
		name: "Nancy Slovan",
		review:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptate laborum est, quia quo deleniti velit repudiandae reiciendis error autem expedita explicabo quam blanditiis recusandae!",
		rating: 5,
	},
	{
		name: "Poppen Frank",
		review:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptate laborum est, quia quo deleniti velit repudiandae reiciendis error autem expedita explicabo quam blanditiis recusandae!",
		rating: 5,
	},
	{
		name: "Levan Burgess",
		review:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptate laborum est, quia quo deleniti velit repudiandae reiciendis error autem expedita explicabo quam blanditiis recusandae!",
		rating: 5,
	},
];

const QouteIconTopLeft = styled(DoubleQuoteSerifRight)`
	color: #c19d60;
	position: absolute;
	left: 2rem;
	top: 2rem;
`;
const QouteIconButtomRight = styled(DoubleQuoteSerifRight)`
	color: #c19d60;
	position: absolute;
	bottom: 2rem;
	right: 2rem;
`;

const ReviewItem = styled.div`
	height: 100%;
	min-height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 0;
	box-sizing: border-box;
	position: relative;
	font-family: "Playfair Display", sans-serif;
	padding: 2rem;
	border: 1px solid #eee;
	background: #fff;
	& h1 {
		font-size: 2rem;
	}

	& p {
		font-size: 1.2rem;
		text-align: center;
		padding: 2rem 0;
		color: rgba(0, 0, 0, 0.7);
		line-height: 2.2rem;
	}
`;

const InitSliderSettings = {
	itemToShow: 3,
	arrowPosition: 0,
	dotSeperatorBottom: 20,
	showPagination: true,
	scaleWhenActive: true,
	paddingH: 75,
	paddingV: 10,
	showMiddleLine: true,
};

const CustomerReview = () => {
	const [sliderSettings, setSliderSettings] = useState(InitSliderSettings);

	useEffect(() => {
		const handleResize = () => {
			let paddingH;
			let itemToShow = 3;
			if (window.innerWidth <= 600) {
				paddingH = 55;
				itemToShow = 1;
			} else if (window.innerWidth <= 768) {
				paddingH = 60;
				itemToShow = 1;
			} else if (window.innerWidth <= 992) {
				paddingH = 20;
			} else if (window.innerWidth <= 1440) {
				paddingH = 25;
			}
			console.log("handleresize customer review");
			setSliderSettings((prevState) => ({
				...prevState,
				paddingH: paddingH,
				itemToShow: itemToShow,
			}));
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.addEventListener("resize", handleResize);
	}, []);

	return (
		<section className="section-customer-review">
			<div className="customer-reviews-container">
				<div className="section-title">
					<h2>What People said about us</h2>
					<h1>Customer Reviews</h1>
					<div className="dot-seperator">
						<span></span>
					</div>
				</div>
				<div className="reviews-container">
					<Slider {...sliderSettings} transitionDelay={0.1}>
						{reviewsList.map((item, idx) => {
							return (
								<ReviewItem key={idx}>
									<h1>{item.name}</h1>
									<RatingStars rating={item.rating} />
									<p>{item.review}</p>
									<QouteIconTopLeft size="30" />
									<QouteIconButtomRight size="30" />
								</ReviewItem>
							);
						})}
					</Slider>
				</div>
			</div>
		</section>
	);
};

export default CustomerReview;
