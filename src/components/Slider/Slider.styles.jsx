import styled, { css } from "styled-components";
import { LeftArrow, RightArrow } from "@styled-icons/boxicons-solid";

export const Container = styled.div`
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

export const SlideItem = styled.div`
	position: absolute;
	width: ${({ width }) => width}px;
	transform: translateX(
			${({ translate, circulateOffset }) => translate + circulateOffset}px
		)
		scale(
			${({ activeIndex, id, scaleWhenActive }) =>
				scaleWhenActive ? (activeIndex === id ? "1.1" : ".9") : "1"}
		);
	transition: all ${({ transition }) => transition}s ease-out
		${({ transitionDelay }) => (transitionDelay ? transitionDelay : "0")}s;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	min-height: 100%;
	height: 100%;

	padding: ${({ paddingH, paddingV }) => `${paddingV}px ${paddingH}px`};

	& > div {
		background: ${({ scaleWhenActive, activeIndex, id }) => {
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

export const Next = styled(RightArrow)`
	position: absolute;
	top: 50%;
	right: ${({ arrowPosition }) => arrowPosition}px;
	height: 2rem;
	width: 2rem;
	color: #c19d60;
	cursor: pointer;
`;

export const Prev = styled(LeftArrow)`
	position: absolute;
	top: 50%;
	left: ${({ arrowPosition }) => arrowPosition}px;
	height: 2rem;
	width: 2rem;
	color: #c19d60;
	cursor: pointer;
`;
