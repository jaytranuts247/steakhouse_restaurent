import React, { useEffect, useState } from "react";
import "./FlipCard.styles.scss";
import styled from "styled-components";
// import Fish from '@styled-icons/ionicons-outline';
import { Fish } from "@styled-icons/ionicons-outline";
import { Carrot } from "@styled-icons/fa-solid";
import { SpoonKnife } from "@styled-icons/icomoon/SpoonKnife";
import { StyledIconBase } from "@styled-icons/styled-icon";

const flipCardInfo = [
	{
		id: 0,
		title: "Daily New Refresh Menus",
		description: "start eating better",
		icon: "fish",
		background: "12",
	},
	{
		id: 1,
		title: "Fresh Ingredient, Tasty Meals",
		description: "Quality is the heart",
		icon: "carrot",
		background: "13",
	},
	{
		id: 2,
		title: "Creative & Talented Chef",
		description: "Hot & Ready to Serve",
		icon: "fork",
		background: "14",
	},
];

const IconStyleWrapper = styled.div`
	${StyledIconBase} {
		color: #c19d60;
		position: absolute;
		top: 8rem;
		left: 50%;
		transform: translateX(-50%);

		@media screen and (max-width: 992px) {
			top: 4rem;
		}
		@media screen and (max-width: 768px) {
			top: 3rem;
		}
	}
`;

const IconSwtich = (id, size) => {
	switch (id) {
		case 0:
			return <Fish size={size} />;
		case 1:
			return <Carrot size={size} />;
		case 2:
			return <SpoonKnife size={size} />;
		default:
			return <Fish />;
	}
};

const FlipCard = ({ id }) => {
	const { title, description, background } = flipCardInfo[id];
	const imageUrl = `../../../img/${background}.jpg`;
	const serviceNumber = ("0" + (id + 1)).slice(-2);

	const [iconSize, setIconSize] = useState(70);

	const getIconSize = () => {
		if (window.innerWidth <= 768) {
			setIconSize(50);
		} else if (window.innerWidth <= 992) {
			setIconSize(60);
		}
	};

	useEffect(() => {
		getIconSize();
		window.addEventListener("resize", getIconSize);
		return () => {
			window.addEventListener("resize", getIconSize);
		};
	}, []);

	return (
		<div className="flip-card">
			<div className="flip-card-inner">
				<div
					className="flip-card-front"
					style={{ backgroundImage: `url(${imageUrl})` }}
				>
					<div className="overlay"></div>
					<div className="service-info">
						<h1 id="title">{title}</h1>
						<h1 id="description">{description}</h1>
						<p>{serviceNumber}.</p>
					</div>
				</div>
				<div className="flip-card-back">
					<IconStyleWrapper>{IconSwtich(id, iconSize)}</IconStyleWrapper>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum,
						esse accusamus sequi mollitia sapiente placeat.
					</p>
					<div className="three-dot-seperator">
						<span></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlipCard;
