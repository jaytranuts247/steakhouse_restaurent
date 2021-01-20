import React from "react";
import styled from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { IconContext } from "react-icons";

const CustomedButton = styled.button`
	padding: ${({ paddingTop }) => `${paddingTop} 20px ${paddingTop} 25px`};

	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;

	position: relative;
	font-family: "Playfair Display", cursive;
	color: ${({ color }) => color};
	margin-top: ${({ marginTop }) => marginTop};
	background: ${({ background }) => background};
	font-weight: 700;
	font-size: 1.3rem;
	border: ${({ border }) => border};
	transition: 0.5s linear;
	min-width: 10rem;

	&:focus {
		outline: none;
	}

	&:hover {
		background: #c19d60;
		cursor: pointer;
	}
	& span {
		padding-left: 1.8rem;
	}
`;

const Button = ({ styles, size, content, ...otherProps }) => {
	return (
		<>
			<IconContext.Provider value={{ style: styles, size: size }}>
				<CustomedButton {...otherProps}>
					{content}{" "}
					<span>
						<BsArrowRight />
					</span>
				</CustomedButton>
			</IconContext.Provider>
		</>
	);
};

Button.defaultProps = {
	color: "#fff",
	styles: { paddingTop: ".5rem" },
	size: "1.4rem",
	background: "#292929",
	border: "1px solid #c19d60",
	marginTop: "10rem",
	paddingTop: "12px",
};

export default Button;
