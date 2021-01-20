import React, { useEffect } from "react";

const CarouselSlider = () => {
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

		ro.observe(CarouselSlider.current);
		ro.observe(document.body);
	};

	const unSubscribeObserver = () => {
		ro.disconnect();
	};
	const handleClickLeft = () => {
		console.log("left cliked");
		if (!isTransitionInProgress) {
			dispatch({ type: "SLIDE_LEFT" });
			setTimeout(() => {
				dispatch({ type: "SLIDE_RESET_LEFT" });
			}, transitionDuration * 1000 + 2);
		}
	};

	useEffect(() => {
		console.log("Effect called once");

		const wW = initResizeObserver();
		console.log("wW", wW);
		const newItemToShow = props.itemToShow ? props.itemToShow : itemToShow;
		const cardW = parseFloat(windowWidth) / newItemToShow;

		let tempCardPropsList = [];
		let offset = 0;
		let newStartIdx = props.startIdx ? props.startIdx : startIdx;
		let tempOffSetPositionList = [];

		for (let i = 0; i < cardListLength; i++) {
			offset = (i - startIdx) * cardW;
			tempOffSetPositionList.push(offset);

			tempCardPropsList.push({
				id: i,
				cardPosition: i,
				imgNum: i + 1,
				transitionDuration: props.transitionDuration
					? props.transitionDuration
					: transitionDuration,
			});
		}

		dispatch({
			type: "ADD_PROPS",
			payload: {
				cardPropsList: tempCardPropsList,
				offsetPositionList: tempOffSetPositionList,
				startIdx: newStartIdx,
				curIdx: newStartIdx,
				transitionDuration: props.transitionDuration
					? props.transitionDuration
					: transitionDuration,
			},
		});

		return () => {
			unSubscribeObserver();
		};
	}, []);
	return <div></div>;
};

export default CarouselSlider;
