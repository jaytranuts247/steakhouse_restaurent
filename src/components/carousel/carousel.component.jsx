import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import useDimensions from "react-use-dimensions";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";

import { motion } from "framer-motion";

import useHookWithRefCallback from "../../utilities";
import Card from "../Card/Card.component";

import "./carousel.styles.css";

const ButtonBaseStyles = css`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 6rem;
	height: 6rem;
	color: white;
	z-index: 1;
	background-color: rgba(18, 18, 18, 0.4);
	border-radius: 50%;
	outline: none;
	border: none;
	&:hover {
		background-color: rgba(181, 181, 181, 0.3);
	}
`;
const LeftButton = styled.button`
	${ButtonBaseStyles};
	left: 2rem;
`;

const RightButton = styled.button`
	${ButtonBaseStyles};
	right: 2rem;
`;

const CarouselSlider = styled.div`
	height: 100%;
	width: ${({ windowWidth }) => parseFloat(windowWidth / 3) * 5}px;
	padding: 0;
	/* z-index: 50; */
	/* overflow: visible; */
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow: hidden;
`;

const WrappedItem = styled(motion.div)`
	width: ${({ screenWidth }) => screenWidth * 0.3333333}px;
	height: 100%;
	padding: 0;
	overflow: hidden;
	position: relative;
	& img {
		height: 100%;
		width: 100%;
	}
`;

const Carousel = () => {
	const [cardProps, setCardProps] = useState([]);
	const cardList = [1, 2, 3, 4, 5];
	let isTransition = false;
	let startIdx = 1;
	let firstCardIdx = 0;
	let lastCardIdx = 4;
	const transitionDuration = 0.5;
	const windowWidth = window.innerWidth;

	useEffect(() => {
		let windowWidth = window.innerWidth;
		console.log(windowWidth, "windowWidth");
		let cardWidth = parseFloat(windowWidth) / 3;
		let offset = 0;
		let new_x,
			new_y = 0;
		let tempCardList = [];

		for (let i = 0; i < cardList.length; i++) {
			new_x = (i - startIdx) * cardWidth;
			console.log(new_x);

			tempCardList.push({
				id: i,
				offset,
				transitionDuration,
				imgNum: i + 1,
				new_x,
				new_y,
				isTransition,
				cardWidth,
			});
		}
		setCardProps([...tempCardList]);
	}, []);

	const handleClickLeft = () => {
		console.log("left cliked");
		let firstCardOffset = cardProps[firstCardIdx].offset;
		let firstCardNew_X = cardProps[firstCardIdx].new_x;
		console.log("firstCardOffset", firstCardOffset);
		setCardProps([
			...cardProps.map((cardprops, idx) => {
				if (idx === lastCardIdx) {
					cardprops = {
						...cardprops,
						offset: firstCardOffset,
						new_x: firstCardNew_X,
						isTransition: false,
					};
				} else {
					cardprops = {
						...cardprops,
						offset: cardprops.offset + cardprops.cardWidth,
						isTransition: true,
					};
				}
				cardprops.metadata = { ...cardprops, type: "closed" };
				return cardprops;
			}),
		]);

		// setCardProps([
		// 	...cardProps.map((cardprops, idx) => {
		// 		if (idx === lastCardIdx) {
		// 			return { ...cardprops, isTransition: true };
		// 		} else {
		// 			return { ...cardprops };
		// 		}
		// 	}),
		// ]);
		firstCardIdx = lastCardIdx;
		lastCardIdx -= 1;
		console.log(cardProps);
	};

	const handleClickRight = () => {
		console.log("right cliked");

		setCardProps([
			...cardProps.map((cardprops) => {
				cardprops = {
					...cardprops,
					offset: cardprops.offset - cardprops.cardWidth,
					isTransition: true,
				};
				cardprops.metadata = { ...cardprops, type: "closed" };
				return cardprops;
			}),
		]);
	};

	return (
		<div className="carousel-container">
			<CarouselSlider windowWidth={windowWidth}>
				{cardProps.map(({ ...cprops }, index) => (
					<Card key={index} {...cprops} />
				))}
			</CarouselSlider>
			<IconContext.Provider value={{ className: "arrow-icon" }}>
				<LeftButton onClick={handleClickLeft}>
					<IoIosArrowBack />
				</LeftButton>
				<RightButton onClick={handleClickRight}>
					<IoIosArrowForward />
				</RightButton>
			</IconContext.Provider>
		</div>
	);
};

export default Carousel;
