import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "styled-components";

const LoaderOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: row;
	webkit-flex-direction: row;
	-ms-flex-direction: row;
	flex: 0 1 auto;
	justify-content: center;
	align-items: center;
	background-color: #171f22;
	z-index: 1111;
`;

const Loader = (props) => {
	const color = "#F84AA7";

	// console.log("Displayed Loader", props.loading);
	return (
		props.loading && (
			<LoaderOverlay>
				<PulseLoader loading={props.loading} color={color} />
			</LoaderOverlay>
		)
	);
};

export default Loader;
