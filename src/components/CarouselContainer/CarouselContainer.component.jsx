import React, { useEffect, useContext } from "react";
import { Context } from "../../context/context";
import ResizeObserver from "resize-observer-polyfill";
import PropTypes from "prop-types";

import { Container, LeftButton, RightButton } from "./CarouselContainer.styled";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";

import Card from "../Card/Card.component";
// import WithSpinner from "../With-Spinner/WithSpinner";
import Loader from "../Loader/Loader";

const CarouselContainer = ({ children, settings }) => {
	console.log("CarouselContainer");

	const { state, dispatch } = useContext(Context);

	const {
		windowWidth,
		itemToShow,
		startIdx,
		transitionDuration,
		isTransitionInProgress,
		isLoading,
		zIndex,
	} = state;
	var ro;
	const initResizeObserver = () => {
		ro = new ResizeObserver((entries, observer) => {
			for (const entry of entries) {
				if (entry.target === document.body) {
					const { width } = entry.contentRect;
					console.log("Element:", entry.target);
					console.log("Width", width);
					dispatch({ type: "UPDATE_WINDOW_WIDTH", payload: width });

					return width;
				}
			}
		});
		console.log(ro);
		// ro.observe(CarouselSlider.current);
		ro.observe(document.body);
	};
	const cardListLength = React.Children.toArray(children).length;

	const UpdateInitialState = () =>
		dispatch({ type: "UPDATE_INITIAL_STATE", payload: settings });

	const unSubscribeObserver = () => {
		ro.disconnect();
	};

	useEffect(() => {
		// update initial State
		UpdateInitialState();
	}, []);

	// useEffect(() => {
	// 	initResizeObserver();
	// 	console.log("windowWidth", windowWidth, itemToShow);
	// }, [windowWidth]);

	useEffect(() => {
		console.log("Effect called once");
		console.log("windowWidth2", windowWidth, itemToShow);

		let tempCardPropsList = [];
		let offset = 0;
		let tempOffSetPositionList = [];
		let cardW;

		initResizeObserver();
		console.log("windowWidth", windowWidth, itemToShow);
		if (windowWidth !== null) {
			cardW = parseFloat(windowWidth) / itemToShow;
			if (windowWidth <= 768) {
				cardW = windowWidth;
			}

			for (let i = 0; i < cardListLength; i++) {
				offset = (i - startIdx) * cardW;
				tempOffSetPositionList.push(offset);

				tempCardPropsList.push({
					id: i,
					cardPosition: i,
					imgNum: i + 1,
					transitionDuration: transitionDuration,
					zIndex,
				});
			}

			dispatch({
				type: "ADD_PROPS",
				payload: {
					cardPropsList: tempCardPropsList,
					offsetPositionList: tempOffSetPositionList,
					cardListLength,
				},
			});

			return () => {
				unSubscribeObserver();
			};
		}
	}, [windowWidth]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClickLeft = () => {
		console.log("left cliked");
		if (!isTransitionInProgress) {
			dispatch({ type: "SLIDE_LEFT" });
			setTimeout(() => {
				dispatch({ type: "SLIDE_RESET_LEFT" });
			}, transitionDuration * 1000 + 5);
		}
	};

	const handleClickRight = () => {
		console.log("right clicked");
		if (!isTransitionInProgress) {
			dispatch({ type: "SLIDE_RIGHT" });
			setTimeout(() => {
				dispatch({ type: "SLIDE_RESET_RIGHT" });
			}, transitionDuration * 1000 + 5);
		}
	};

	return (
		<>
			<Loader loading={isLoading} />
			<Container>
				{React.Children.map(children, (child, idx) => (
					<Card key={idx} cardId={idx} passedChild={child} />
				))}
				<IconContext.Provider value={{ className: "arrow-icon" }}>
					<LeftButton onClick={handleClickLeft}>
						<IoIosArrowBack />
					</LeftButton>
					<RightButton onClick={handleClickRight}>
						<IoIosArrowForward />
					</RightButton>
				</IconContext.Provider>
			</Container>
		</>
	);
};

export default CarouselContainer;

/*
 * render children
 * change the state structure
 * change transitionDuration time onload
 * add styles to those arrow icons
 * setUp autoplay
 */
