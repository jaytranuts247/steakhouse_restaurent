import React from "react";
import { ContextProvider } from "../../context/context";
import CarouselContainer from "../CarouselContainer/CarouselContainer.component";

import "./carousel.styles.css";

const Carousel = ({ children, settings }) => {
	return (
		<ContextProvider>
			<CarouselContainer settings={settings}>{children}</CarouselContainer>
		</ContextProvider>
	);
};

export default Carousel;
