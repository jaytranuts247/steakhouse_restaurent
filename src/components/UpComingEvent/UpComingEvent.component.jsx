import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Button from "../Button/Button.component";
import Slider from "../Slider/Slider.component";

import "./UpComingEvent.styles.scss";

const EventList = [
	{
		eventName: "Jazz Band Live Event",
		date: "May 25th 2020",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quis alias facilis dicta iste nihil veniam odio nulla sapiente quod.",
	},
	{
		eventName: "Wine and Steak Day",
		date: "June 19th 2020",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quis alias facilis dicta iste nihil veniam odio nulla sapiente quod.",
	},
	{
		eventName: "Freedom Day Celebration",
		date: "Oct 14th 2020",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quis alias facilis dicta iste nihil veniam odio nulla sapiente quod.",
	},
];

const EventItem = styled.div`
	height: auto;
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

	& > h2 {
		font-size: 1.9rem;
		font-weight: 500;
		color: #fff;
		padding: 1rem 0 0 0;
	}
	& > h4 {
		font-size: 1.3rem;
		font-weight: 500;
		color: #c19d60;
		padding: 0 0 2rem 0;
		font-family: "Poppins", sans-serif;
	}
	& > p {
		font-size: 1.1rem;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.7);
		padding-bottom: 1rem;
		text-align: center;
		line-height: 2.4rem;
	}
`;

const BackgroundImage = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	height: 130%;
	width: 100%;
	background-image: url("../../../img/18.jpg");
	background-size: cover;
	background-position: center;
	background-origin: content-box;
`;

const UpComingEvent = () => {
	return (
		<section className="upcoming-event">
			<div
				className="column-left-wrap"
				style={{ backgroundImage: `url('../../../img/section-bg2.png')` }}
			>
				<div className="upcoming-event-container">
					<div className="column-text">
						<div className="section-title">
							<h2>Book a table</h2>
							<h1>Upcoming Events</h1>
							<div className="dot-seperator">
								<span></span>
							</div>
						</div>
						<div className="slider-container">
							<Slider>
								{EventList.map((eventItem, idx) => {
									const { eventName, date, description } = eventItem;
									return (
										<EventItem key={idx}>
											<h2>{eventName}</h2>
											<h4>{date}</h4>
											<p>{description}</p>
										</EventItem>
									);
								})}
							</Slider>
						</div>
						<div className="clear"></div>
						<div className="bold-seperator">
							<span></span>
						</div>
						<div className="book-now-btn">
							<Button
								content={"Book Table Now"}
								background={"#3F3F3F"}
								border={"1px solid #c19d60"}
								marginTop={"0rem"}
								paddingTop={"10px"}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="column-right-wrap">
				<BackgroundImage />
				<div className="overlay"></div>
				<div className="store-container">
					<div className="three-dot-seperator">
						<span></span>
					</div>
					<h3>Our Store</h3>
					<h4>Want to order food home? Visit our online store.</h4>
					<Button
						content={"Buy Online"}
						background={"#292929"}
						border={"#292929"}
						marginTop={"1.5rem"}
						paddingTop={"12px"}
					/>
				</div>
			</div>
		</section>
	);
};

export default UpComingEvent;
