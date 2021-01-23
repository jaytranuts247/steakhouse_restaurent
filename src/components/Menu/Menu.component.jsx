import React, {
	useState,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import styled from "styled-components";
import { menuList } from "./MenuList";
import Button from "../Button/Button.component";
import { motion, useTransform, useViewportScroll } from "framer-motion";

import { CaretLeft } from "@styled-icons/boxicons-regular";

import "./Menu.styles.scss";

const LeftBulletPoint = styled(CaretLeft)`
	color: #c19d60;
	height: 2rem;
	width: 2rem;
	${"" /* position: absolute;
	left: 1rem; */}
`;

const ServicesBackground = styled(motion.div)`
	height: 130%;
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	background-size: cover;
	background-position: center;
	background-origin: content-box;
	transition: background-image 2s ease;
	background-image: url(${({ imageUrl }) => imageUrl});
`;

const Menu = () => {
	const list = useMemo(
		() => ["main", "starter", "desserts", "seafood", "drinks"],
		[]
	);
	console.log(menuList[list[0]]);
	const initialState = Array.from(new Array(5), (val, index) => {
		if (index === 0) return true;
		return false;
	});

	const [isActive, setIsActive] = useState(initialState);
	const [imageUrl, setImageUrl] = useState("");
	const [foodContent, setFoodContent] = useState(null);

	const [parallaxScrollStart, setParallaxScrollStart] = useState(0);
	const [parallaxScrollEnd, setParallaxScrollEnd] = useState(0);

	const ref = useRef(null);

	const { scrollY } = useViewportScroll(ref);

	// scrollY.onChange((d) => {
	// 	console.log("offsetY", d, offsetY.current);
	// });

	const y = useTransform(
		scrollY,
		[parallaxScrollStart, parallaxScrollEnd],
		[0, 0.3 * 935]
	);

	useLayoutEffect(() => {
		if (!ref.current) return null;

		const rect = ref.current.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const offsetStart = rect.top + scrollTop;
		const offsetEnd = offsetStart + rect.height;

		// const elementScrollStart = offsetStart / document.body.clientHeight;
		// const elementScrollEnd = offsetEnd / document.body.clientHeight;

		const parallaxScrollStartOffset = offsetStart - window.innerHeight * 0.75;
		const parallaxScrollEndOffset = offsetEnd;

		setParallaxScrollStart(parallaxScrollStartOffset);
		setParallaxScrollEnd(parallaxScrollEndOffset);
	}, [ref]);

	useEffect(() => {
		isActive.forEach((item, idx) => {
			if (item === true) {
				console.log("set imageUrl");
				setImageUrl(`../../../img/${menuList[list[idx]].background}.jpg`);
				setFoodContent(menuList[list[idx]].menuContent);
			}
		});
	}, [isActive, imageUrl, setImageUrl, foodContent, setFoodContent, list]);

	const handleClick = (id) => {
		let newState = Array.from(new Array(5), (val, index) => false);
		newState[id] = true;
		setIsActive(newState);
	};

	return (
		<section className="special-menu" ref={ref}>
			<ServicesBackground imageUrl={imageUrl} style={{ y }} />

			<div className="overlay"></div>
			<div className="special-menu__container">
				<div className="special-menu__title">
					<h1 id="offer">Special menu offers.</h1>
					<h1 id="specialties">Enjoy Restaurents Specialties</h1>
					<div className="dot-seperator">
						<span></span>
					</div>
				</div>
				<div className="row">
					<div className="column-1">
						<div className="hero-menu_header">
							<ul className="tab-menu">
								{list.map((item) => {
									const { category, id } = menuList[item];
									const menuNumber = ("0" + id).slice(-2);
									return (
										<li
											key={item}
											className={`menu-category ${
												isActive[id - 1] ? "color-primary" : ""
											}`}
											onClick={() => handleClick(id - 1)}
										>
											{" "}
											<span id="menu-number">{menuNumber}.</span>
											{category}
											<span id="bullet-point">
												{isActive[id - 1] && <LeftBulletPoint />}
											</span>
										</li>
									);
								})}
							</ul>
						</div>
					</div>

					<div className="column-2">
						<div className="food-items-container">
							{foodContent &&
								foodContent.map((foodItem, index) => {
									const { id, food_name, description, price } = foodItem;
									const number = ("0" + id).slice(-2);
									return (
										<div key={id} className="food-item">
											<div className="food-name-container">
												<span id="food-id">{number}.</span>
												<span id="food-name">{food_name}</span>
												<div className="line"></div>
												<span id="price">${price}</span>
											</div>
											<div className="food-description-container">
												<span id="food-description">{description}</span>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
				<div className="menu-button">
					<Button
						content={"View Full Menu"}
						background={"rgba(255,255,255,0.1)"}
						paddingTop="8px"
						marginTop="40px"
					/>
				</div>
			</div>
		</section>
	);
};

export default Menu;
