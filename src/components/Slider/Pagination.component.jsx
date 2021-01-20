import React from "react";
import styled from "styled-components";

const PaginationWrap = styled.div`
	display: block;
	position: absolute;
	bottom: -50px;
	left: 50%;
	transform: translateX(-50%);
`;

const DotItem = styled.span`
	display: inline-block;
	margin: 0 10px;
	height: 0.6rem;
	width: 0.6rem;
	position: relative;
	border-radius: 100%;
	transition: all 300ms ease-out;
	background: ${({ currentIndex, id }) =>
		currentIndex === id ? "#c19d60" : "#eee"};
	z-index: 2;

	&::before {
		content: " ";
		height: 1.3rem;
		width: 1.3rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: block;
		background: transparent;
		border: 1px solid #ccc;
		border-radius: 100%;
		opacity: ${({ currentIndex, id }) => (currentIndex === id ? "1" : "0")};
	}
`;

const Pagination = ({ slides, currentIndex }) => {
	return (
		<PaginationWrap>
			{slides.map((slide, idx) => {
				return <DotItem key={idx} id={idx} currentIndex={currentIndex} />;
			})}
		</PaginationWrap>
	);
};

export default Pagination;
