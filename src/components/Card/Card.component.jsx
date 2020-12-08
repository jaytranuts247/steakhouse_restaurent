import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const WrappedItem = styled(motion.div)`
	width: ${({ cardWidth }) => cardWidth}px;
	height: 100%;
	padding: 0;
	overflow: hidden;
	position: absolute;
	top: 0px;
	${"" /* left: ${({ offset, new_x }) => new_x + offset}px; */}
	& img {
		height: 100%;
		width: 100%;
	}
	&.overlay {
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		padding: 0;
	}
`;

const Card = ({
	key,
	offset,
	transitionDuration,
	imgNum,
	new_x,
	new_y,
	cardWidth,
	isTransition,
}) => {
	console.log("cardwith", cardWidth);
	console.log("new_x", new_x);
	console.log("isTransition", isTransition);
	return (
		<WrappedItem
			animate={{ x: offset + new_x }}
			transition={{
				ease: "easeOut",
				duration: isTransition === true ? transitionDuration : 0,
			}}
			new_x
			new_y
			cardWidth
		>
			<div className="overlay"></div>
			<img src={`../../img/${imgNum}.jpg`} alt="No photo" />
		</WrappedItem>
	);
};

export default Card;
