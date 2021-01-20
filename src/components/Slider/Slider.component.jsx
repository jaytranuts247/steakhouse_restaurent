import React, {
	useEffect,
	useState,
	useRef,
	Fragment,
	useLayoutEffect,
	useMemo,
} from "react";

import styled, { css } from "styled-components";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import Pagination from "./Pagination.component";

import { LeftArrow, RightArrow } from "@styled-icons/boxicons-solid";
import useDimensions from "./useDimensions";

const Container = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100%;
	position: relative;
	display: flex;
	align-items: center;
	overflow: ${({ scaleWhenActive }) =>
		scaleWhenActive ? "visible" : "hidden"};
	box-sizing: border-box;
	padding: 2rem 0;
	&:before {
		${(props) =>
			props.showMiddleLine &&
			css`
				content: " ";
				position: absolute;
				top: 50%;
				left: 0;
				right: 0;
				height: 1px;
				border-top: 1px dotted #c19d60;
			`}
		${
			"" /* content: " ";
		position: absolute;
		top: 50%;
		width: 100%;
		height: 1px;
		border-top: 1px dotted #c19d60; */
		}
	}
`;

const SlideItem = styled.div`
	position: absolute;
	width: ${({ width }) => width}px;
	transform: translateX(
			${({ translate, circulateOffset }) => translate + circulateOffset}px
		)
		scale(
			${({ activeIndex, id, scaleWhenActive }) =>
				scaleWhenActive ? (activeIndex === id ? "1.1" : ".9") : "1"}
		);
	transition: all ${({ transition }) => transition}s ease-out;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	min-height: 100%;
	height: 100%;

	padding: ${({ paddingH, paddingV }) => `${paddingV}px ${paddingH}px`};

	& > div {
		background: ${({ scaleWhenActive, activeIndex, id }) => {
			console.log("scaleWhenActive", activeIndex, id);
			return scaleWhenActive && (activeIndex === id ? "#F9F9F9" : "");
		}};
	}
	&:after {
		color: #c19d60;
		position: absolute;
		content: "\\25CF\\25CF\\25CF";
		width: 50px;
		left: 50%;
		bottom: ${({ dotSeperatorBottom }) => dotSeperatorBottom}px;
		margin-left: -25px;
		font-size: 9px;
		letter-spacing: 4px;
		display: flex;
		justify-content: center;
	}
`;

const PaginationWrap = styled.div`
	height: auto;
	padding-top: ${({ PagepaddingTop }) => PagepaddingTop}px;
	padding-bottom: ${({ PagepaddingBottom }) => PagepaddingBottom}px;
`;

const Next = styled(RightArrow)`
	position: absolute;
	top: 50%;
	right: ${({ arrowPosition }) => arrowPosition}px;
	height: 2rem;
	width: 2rem;
	color: #c19d60;
	cursor: pointer;

	@media screen and (max-width: 768px) {
		right: -10rem;
	}
	@media screen and (max-width: 600px) {
		right: -3rem;
	}
`;

const Prev = styled(LeftArrow)`
	position: absolute;
	top: 50%;
	left: ${({ arrowPosition }) => arrowPosition}px;
	height: 2rem;
	width: 2rem;
	color: #c19d60;
	cursor: pointer;
	@media screen and (max-width: 768px) {
		left: -10rem;
	}
	@media screen and (max-width: 600px) {
		left: -3rem;
	}
`;

const Slider = ({ children, ...restProps }) => {
	const timeout = useMemo(() => 20, []);
	const prevDirection = useMemo(() => -1, []);
	const nextDirection = useMemo(() => 1, []);
	const ref = useRef();

	const dimensions = useDimensions(ref);
	const {
		itemToShow,
		arrowPosition,
		showPagination,
		scaleWhenActive,
		showMiddleLine,
	} = restProps;

	const [state, setState] = useStateWithCallbackLazy({
		currentIndex: 0,
		translate: 0,
		transition: 0.45,
		slides: [],
		indexArray: [],
		slideWidth: 0,
		isTransition: true,
		slidesLength: 0,
		firstIdx: 0,
		lastIdx: 0,
		realItemToShow: 1,
	});

	const shiftArray = (array, from, to) => {
		let arr_temp = [...array];
		let cutOut = arr_temp.splice(from, 1)[0];
		arr_temp.splice(to, 0, cutOut);
		return arr_temp;
	};

	const shiftIndexArray = (array, shiftCount, direction) => {
		let arr_temp = [...array];
		console.log("shiftIndexArray", shiftCount);

		for (let index = 0; index < shiftCount; index++) {
			if (direction === nextDirection) {
				arr_temp = shiftArray(arr_temp, 0, arr_temp.length);
			} else {
				arr_temp = shiftArray(arr_temp, -1, 0);
			}
			console.log("shiftIndexArray", arr_temp);
		}
		return arr_temp;
	};

	const circulate = (state, array, direction) => {
		const temp = state.slides.map((slide, idx) => {
			if (array.some((item) => item === slide.idx)) {
				return {
					...slide,
					circulateOffset:
						slide.circulateOffset + direction * state.circulateOffsetLength,
				};
			} else {
				return slide;
			}
		});
		return temp;
	};

	const handlePagination = (direction) => {
		console.log("handle Pagination");

		let from, to, indexToCompared;

		if (direction === nextDirection) {
			from = 0;
			to = state.indexArray.length / 2;
			indexToCompared = state.lastIdx + 1 - state.realItemToShow;
		} else {
			from = state.indexArray.length / 2;
			to = state.indexArray.length;
			indexToCompared = state.firstIdx;
		}

		if (state.currentIndex === indexToCompared) {
			return setState(
				(prevState) => ({
					...prevState,
					transition: 0,
					slides: circulate(
						prevState,
						prevState.indexArray.slice(from, to),
						direction
					),
					indexArray: shiftIndexArray(
						prevState.indexArray,
						prevState.indexArray.length / 2,
						direction
					),
					firstIdx:
						prevState.firstIdx + (direction * prevState.indexArray.length) / 2,
					lastIdx:
						prevState.lastIdx + (direction * prevState.indexArray.length) / 2,
				}),
				() => {
					setTimeout(() => {
						console.log("callback after set state");
						setState((prevState) => ({
							...prevState,
							transition: 0.45,
							currentIndex: prevState.currentIndex + direction,
							translate:
								-(prevState.currentIndex + direction) * prevState.slideWidth,
						}));
					}, timeout);
				}
			);
		}
		setState((prevState) => ({
			...prevState,
			currentIndex: prevState.currentIndex + direction,
			translate: -(prevState.currentIndex + direction) * prevState.slideWidth,
		}));
	};

	useEffect(() => {
		if (dimensions && state && setState) {
			console.log(
				"ref sider mounted ",
				dimensions.width / itemToShow,
				itemToShow,
				ref
			);

			let realItemToShow;
			let slideWidth_tmp;

			if (dimensions.width <= 400) {
				slideWidth_tmp = dimensions.width;
				realItemToShow = 1;
			} else {
				slideWidth_tmp = dimensions.width / itemToShow;
				realItemToShow = itemToShow;
			}

			let index_array = Array.from(
				[...children, ...children],
				(value, idx) => idx
			);
			let circulateOffsetLength = index_array.length * slideWidth_tmp;
			let slides_tmp = Array.from([...children, ...children], (child, idx) => ({
				child,
				idx,
				itemTranslate: idx * slideWidth_tmp,
				circulateOffset: 0,
			}));

			setState(
				(prevState) => ({
					...prevState,
					slides: slides_tmp,
					indexArray: index_array,
					slideWidth: slideWidth_tmp,
					slidesLength: index_array.length,
					circulateOffsetLength,
					firstIdx: 0,
					lastIdx: index_array.length - 1,
					realItemToShow,
				}),
				() => {
					console.log("then callback");
				}
			);
		}
	}, [dimensions]);

	return (
		<>
			<Container
				ref={ref}
				scaleWhenActive={scaleWhenActive}
				showMiddleLine={showMiddleLine}
			>
				{state.slideWidth &&
					state.slides.map((slide) => {
						const {
							slideWidth,
							transition,
							translate,
							currentIndex,
							slidesLength,
							realItemToShow,
						} = state;
						const { child, idx, itemTranslate, circulateOffset } = slide;
						const { width, ...rest } = restProps;
						const widthToUse = slideWidth ? slideWidth : width;

						return (
							<SlideItem
								key={idx}
								id={idx}
								width={widthToUse}
								transition={transition}
								translate={itemTranslate + translate}
								circulateOffset={circulateOffset}
								activeIndex={
									(currentIndex + Math.floor(realItemToShow / 2)) % slidesLength
								}
								{...rest}
							>
								{child}
							</SlideItem>
						);
					})}
			</Container>
			{showPagination && (
				<Pagination
					slides={children}
					currentIndex={
						state.currentIndex % React.Children.toArray(children).length
					}
				/>
			)}

			<Next
				arrowPosition={arrowPosition}
				onClick={() => handlePagination(nextDirection)}
			/>
			<Prev
				arrowPosition={arrowPosition}
				onClick={() => handlePagination(prevDirection)}
			/>
		</>
	);
};

Slider.defaultProps = {
	paddingH: "20",
	paddingV: "0",
	width: "50%",
	itemToShow: 2,
	arrowPosition: -80,
	dotSeperatorBottom: 0,
	scaleWhenActive: false,
	showPagination: false,
	showMiddleLine: false,
};

export default Slider;
