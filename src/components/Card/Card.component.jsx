import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Context } from "../../context/context";

const Wrapper = styled(motion.div)`
	position: absolute;
	height: 100%;
	width: ${(props) => (props.cardWidth ? props.cardWidth : 0)}px;
	top: 0px;

	padding: 0;
	overflow: hidden;
	z-index: ${({ zIndex }) => zIndex};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& .overlay {
		background-color: rgba(
			0,
			0,
			0,
			${({ isActive, isTransitionInProgress }) =>
				isActive && !isTransitionInProgress ? "0.1" : "0.5"}
		);
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		padding: 0;
		z-index: ${({ zIndex }) => zIndex + 1};
		transition: all 0.45s ease-out;
	}
`;

const BackgroundItem = styled.div`
	position: absolute;
	top: 0;
	left: -15%;
	height: 100%;
	width: 150%;
	transition: ${(props) => `${props.transitionDuration}s ease-out `};
	-webkit-transform: ${(props) => `${props.transitionDuration}s ease-out `};
	transform: translateX(${(props) => props.offset}px);
	-ms-transform: translateX(${(props) => props.offset}px);
	background-image: url(${(props) => props.imageURL});
	background-size: cover;
	background-repeat: no-repeat;
	background-attachment: scroll;
	background-position: center;
	z-index: ${({ zIndex }) => zIndex};
`;

const ChildWrapper = styled(motion.div)`
	height: auto;
	width: auto;
	z-index: ${({ zIndex }) => zIndex + 1};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Card = ({ cardId, activeId, children, imageNum }) => {
	// console.log("children", passedChild); // can passed the children
	const { state, dispatch } = useContext(Context);

	const {
		offsetPositionList,
		initialTransitionDuration,
		cardWidth,
		cardPropsList,
		isLoading,
		isTransitionInProgress,
	} = state;

	const cardProps = cardPropsList.filter((cp) => cp.id === cardId);
	const { cardPosition, zIndex, transitionDuration } = cardProps[0] || {};
	console.log("cardId, cardPosition", cardId, cardPosition);
	// const getSrc = () => {
	// 	if (passedChild.props.children.type === "img") {
	// 		const src = `../${passedChild.props.children.props.src}`;
	// 		// console.log(src);
	// 		return src;
	// 	} else {
	// 		// console.log("NO IMG FOUND");
	// 	}
	// };

	// console.log("offsetValue", offsetValue.current);

	const setIsLoading = () => {
		// console.log("Fire animation complete");
		if (cardWidth && isLoading) {
			setTimeout(() => {
				dispatch({ type: "TOGGLE_LOADING" });
			}, 100);
		}
	};

	return (
		<Wrapper
			animate={{
				x: offsetPositionList[cardPosition],
				width: cardWidth,
			}}
			transition={{
				ease: "easeOut",
				duration: isLoading ? initialTransitionDuration : transitionDuration,
			}}
			cardWidth={cardWidth}
			zIndex={zIndex}
			onAnimationComplete={setIsLoading}
			isActive={cardPosition === activeId}
			isTransitionInProgress={isTransitionInProgress}
		>
			<div className="overlay"></div>
			<BackgroundItem
				transitionDuration={
					isLoading ? initialTransitionDuration : transitionDuration
				}
				offset={-0.1 * offsetPositionList[cardPosition]}
				imageURL={`../../img/${imageNum}.jpg`}
				zIndex={zIndex}
			>
				{""}
			</BackgroundItem>
			<ChildWrapper
				animate={{
					scale:
						cardPosition === activeId && !isTransitionInProgress ? 1.1 : 0.9,
				}}
				transition={{
					ease: "easeOut",
					duration: 0.45,
				}}
				zIndex={zIndex}
			>
				{children}
			</ChildWrapper>
		</Wrapper>
	);
};

export default Card;
