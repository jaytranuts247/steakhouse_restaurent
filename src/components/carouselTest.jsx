import React, { Component } from "react";
import styled, { css } from "styled-components";
import ResizeObserver from "resize-observer-polyfill";

import Card from "./Card/Card.component";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";

import PropTypes from "prop-types";

const ButtonBaseStyles = css`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 6rem;
	height: 6rem;
	color: white;
	z-index: 1;
	background-color: rgba(18, 18, 18, 0.4);
	border-radius: 50%;
	outline: none;
	border: none;
	&:hover {
		background-color: rgba(181, 181, 181, 0.3);
	}
`;
const LeftButton = styled.button`
	${ButtonBaseStyles};
	left: 2rem;
`;

const RightButton = styled.button`
	${ButtonBaseStyles};
	right: 2rem;
`;
const CarouselSlider = styled.div`
	height: 100%;
	width: 100vw;
	padding: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow: hidden;
	position: relative;
`;

class CarouselTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardPropsList: [],
			offsetPositionList: [],
			zIndex: 1,
			startIdx: 1,
			curIdx: 1,
			isTransitionInProgress: false,
			initialTransitionDuration: 0,
			transitionDuration: props.transitionDuration,
			windowWidth: 1447,
			cardWidth: 0,
			itemToShow: props.itemToShow,
			isLoading: true,
		};
	}
	componentDidMount() {
		const cardWidthLength = React.Children.toArray(this.props.children).length;
		console.log("carouselSettings", this.props.carouselSettings);
		this.initResizeObserver();
		this.updateState();
	}

	componentWillUnmount() {
		this.unSubscribeObserver();
	}

	updateState = () => {
		this.setState(
			(state) => ({
				...state,
				...this.props.settings,
			}),
			() => {
				console.log("class state", { ...this.state });
			}
		);
		// for (let i = 0; i < cardWidthLength; i++) {
		// 	this.setState({
		// 		transitionDuration: this.props.transitionDuration
		// 			? this.props.transitionDuration
		// 			: this.state.transitionDuration,
		// 		startIdx: this.props.startIdx
		// 			? this.props.startIdx
		// 			: this.state.startIdx,
		// 		itemToShow: this.props.itemToShow
		// 			? this.props.itemToShow
		// 			: this.state.itemToShow,
		// 	});
		// }
	};

	initResizeObserver = () => {
		this.ro = new ResizeObserver((entries, observer) => {
			for (const entry of entries) {
				if (entry.target === document.body) {
					const { width } = entry.contentRect;
					console.log("Element:", entry.target);
					console.log("Width", width);
					this.setState({
						windowWidth: width,
					});
				}
			}
		});

		this.ro.observe(this.CarouselSlider);
		this.ro.observe(document.body);
	};

	unSubscribeObserver = () => {
		this.ro.disconnect();
	};

	setRef = (name) => (ref) => (this[name] = ref);

	handleClickLeft = () => {
		console.log("left cliked");
	};
	handleClickRight = () => {
		console.log("right clicked");
	};
	render() {
		return (
			<div className="carousel-container">
				<CarouselSlider ref={this.setRef("CarouselSlider")}>
					{React.Children.map(this.props.children, (child, id) => {
						<Card key={id} passedChild={child} />;
					})}
				</CarouselSlider>
				<IconContext.Provider value={{ className: "arrow-icon" }}>
					<LeftButton onClick={this.handleClickLeft}>
						<IoIosArrowBack />
					</LeftButton>
					<RightButton onClick={this.handleClickRight}>
						<IoIosArrowForward />
					</RightButton>
				</IconContext.Provider>
			</div>
		);
	}
}

CarouselTest.defaultProps = {
	cardPropsList: [],
	offsetPositionList: [],
	zIndex: 1,
	startIdx: 1,
	curIdx: 1,
	isTransitionInProgress: false,
	initialTransitionDuration: 0,
	transitionDuration: 1.5,
	windowWidth: 1447,
	cardWidth: 0,
	itemToShow: 3,
	isLoading: false,
};

export default CarouselTest;
