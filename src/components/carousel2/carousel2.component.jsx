import React from "react";
import Carousel from "react-elastic-carousel";

import "./carousel2.styles.css";

const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2, itemsToScroll: 2 },
	{ width: 768, itemsToShow: 3 },
	{ width: 1200, itemsToShow: 4 },
];

const Carousel2 = () => {
	const initialArray = [1, 2, 3, 4, 5];
	return (
		<div>
			<Carousel breakPoints={breakPoints}>
				{initialArray.map((imgNum, imgIdx) => {
					return (
						<div key={imgIdx} className="carousel-item">
							<div className="overlay"></div>
							<img src={`../../img/${imgNum}.jpg`} alt="No photo" />
						</div>
					);
				})}
			</Carousel>
		</div>
	);
};

export default Carousel2;
