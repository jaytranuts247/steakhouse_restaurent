import styled, { css } from "styled-components";

const ButtonBaseStyles = css`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 6rem;
	height: 6rem;
	color: white;

	background-color: rgba(18, 18, 18, 0.4);
	border-radius: 50%;
	outline: none;
	border: none;

	&:hover {
		background-color: rgba(181, 181, 181, 0.3);
	}
`;

export const LeftButton = styled.button`
	${ButtonBaseStyles};
	left: 2rem;
	z-index: ${({ zIndex }) => zIndex + 1};
`;

export const RightButton = styled.button`
	${ButtonBaseStyles};
	right: 2rem;
	z-index: ${({ zIndex }) => zIndex + 1};
`;

// * this can add variable to set size for this container
export const Container = styled.div`
	width: 100%;
	height: 100vh;
	position: relative;
	overflow: hidden;
`;
