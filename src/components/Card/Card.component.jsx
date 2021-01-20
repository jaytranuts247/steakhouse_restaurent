import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Context } from "../../context/context";

const Wrapper = styled(motion.div)`
	position: absolute;
	height: 100%;
	width: ${(props) => (props.cardWidth ? props.cardWidth : 0)}px;
	top: 0px;

	padding: 0;
	overflow: hidden;
	z-index: ${({ zIndex }) => zIndex};

	& .overlay {
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		padding: 0;
		z-index: ${({ zIndex }) => zIndex + 1};
	}
`;

const BackgroundItem = styled.div`
	position: absolute;
	top: 0;
	left: -15%;
	height: 100%;
	width: 130%;
	transition: ${(props) => `${props.transitionDuration}s linear `};
	-webkit-transform: ${(props) => `${props.transitionDuration}s linear `};
	transform: translateX(${(props) => props.offset}px);
	-ms-transform: translateX(${(props) => props.offset}px);
	background-image: url(${(props) => props.imageURL});
	background-size: cover;
	background-repeat: no-repeat;
	background-attachment: scroll;
	background-position: center;
	z-index: ${({ zIndex }) => zIndex};
`;

const Item = styled(motion.div)`
	position: absolute;
	top: 0;
	left: -15%;
	height: 100%;
	width: 130%;
	z-index: ${({ zIndex }) => zIndex};
`;

const Card = ({ cardId, passedChild }) => {
	// console.log("children", passedChild); // can passed the children
	const { state, dispatch } = useContext(Context);

	const {
		offsetPositionList,
		initialTransitionDuration,
		cardWidth,
		cardPropsList,
		isLoading,
	} = state;

	const cardProps = cardPropsList.filter((cp) => cp.id === cardId);
	const { cardPosition, zIndex, transitionDuration } = cardProps[0] || {};

	const getSrc = () => {
		if (passedChild.props.children.type === "img") {
			const src = `../${passedChild.props.children.props.src}`;
			// console.log(src);
			return src;
		} else {
			// console.log("NO IMG FOUND");
		}
	};

	const offsetValue = useMotionValue(0);

	// console.log("offsetValue", offsetValue.current);

	const setIsLoading = () => {
		console.log("Fire animation complete");
		if (cardWidth && isLoading) {
			setTimeout(() => {
				dispatch({ type: "TOGGLE_LOADING" });
			}, 100);
		}
	};

	return (
		<Wrapper
			animate={{ x: offsetPositionList[cardPosition] }}
			transition={{
				ease: "easeOut",
				duration: isLoading ? initialTransitionDuration : transitionDuration,
			}}
			cardWidth={cardWidth}
			zIndex={zIndex}
			onAnimationComplete={setIsLoading}
		>
			<div className="overlay"></div>
			<BackgroundItem
				transitionDuration={
					isLoading ? initialTransitionDuration : transitionDuration
				}
				offset={-0.05 * offsetPositionList[cardPosition]}
				imageURL={getSrc}
				zIndex={zIndex}
			>
				{""}
			</BackgroundItem>
		</Wrapper>
	);
};

export default Card;
