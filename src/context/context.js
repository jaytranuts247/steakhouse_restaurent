import React, { createContext, useReducer } from "react";
import { wrap } from "../utils/ultilities";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
	const SLIDE_LEFT = "SLIDE_LEFT";
	const SLIDE_RIGHT = "SLIDE_RIGHT";
	const SLIDE_RESET_LEFT = "SLIDE_RESET_LEFT";
	const SLIDE_RESET_RIGHT = "SLIDE_RESET_RIGHT";
	const ADD_PROPS = "ADD_PROPS";
	const UPDATE_WINDOW_WIDTH = "UPDATE_WINDOW_WIDTH";
	const UPDATE_INITIAL_STATE = "UPDATE_INITIAL_STATE";
	const TOGGLE_LOADING = "TOGGLE_LOADING";
	const CHANGE_TRANSITION_DURATION = "CHANGE_TRANSITION_DURATION";
	const RESET_TRANSITION_DURATION = "RESET_TRANSITION_DURATION";
	const SET_ON_RESIZE = "SET_ON_RESIZE";

	const initialState = {
		cardPropsList: [],
		offsetPositionList: [],
		zIndex: 1,
		startIdx: 1,
		curIdx: 1,
		isTransitionInProgress: false,
		initialTransitionDuration: 0,
		transitionDuration: 1.4,
		windowWidth: null,
		cardWidth: 0,
		itemToShow: 3,
		isLoading: true,
		cardListLength: null,
		onResize: false,
		isBreakPointChange: false,
	};

	const MoveLeftPosition = (cardPropsList, startIdx, curIdx) => {
		const cardListLength = cardPropsList.length;

		const temp = cardPropsList.map((propsItem) => {
			console.log(
				"propsItem.cardPosition",
				propsItem.id,
				propsItem.cardPosition,
				wrap(curIdx - startIdx + cardListLength - 1, cardListLength)
			);
			if (
				propsItem.id ===
				wrap(curIdx - startIdx + cardListLength - 1, cardListLength)
			) {
				// find the last Card id
				console.log("move", propsItem.id);
				return {
					...propsItem,
					transitionDuration: 0,
					zIndex: -90,
					cardPosition: wrap(propsItem.cardPosition + 1, cardListLength),
				};
			} else {
				return {
					...propsItem,
					cardPosition: wrap(propsItem.cardPosition + 1, cardListLength),
				};
			}
		});
		return temp;
	};

	const MoveRightPosition = (cardPropsList, startIdx, curIdx) => {
		const cardListLength = cardPropsList.length;
		const temp = cardPropsList.map((propsItem) => {
			console.log(
				"propsItem.cardPosition Right",
				propsItem.id,
				propsItem.cardPosition,
				wrap(curIdx - startIdx, cardListLength)
			);
			if (propsItem.id === wrap(curIdx - startIdx, cardListLength)) {
				// find the first Card id
				return {
					...propsItem,
					transitionDuration: 0,
					zIndex: -90,
					cardPosition: wrap(propsItem.cardPosition - 1, cardListLength),
				};
			} else {
				return {
					...propsItem,
					cardPosition: wrap(propsItem.cardPosition - 1, cardListLength),
				};
			}
		});
		return temp;
	};

	function reducer(state, action) {
		switch (action.type) {
			case UPDATE_INITIAL_STATE:
			case ADD_PROPS:
				return {
					...state,
					...action.payload,
				};

			case TOGGLE_LOADING:
				console.log("isLoading", state.isLoading);
				return {
					...state,
					isLoading: false,
				};
			case UPDATE_WINDOW_WIDTH:
				return {
					...state,
					windowWidth: action.payload,
					cardWidth:
						action.payload <= 768
							? action.payload
							: Math.ceil(parseFloat(action.payload) / state.itemToShow),
					onResize: true,
					isBreakPointChange:
						state.windowWidth !== null
							? (state.windowWidth <= 768) ^ (action.payload <= 768)
							: false,
				};
			case SLIDE_LEFT:
				return {
					...state,
					cardPropsList: [
						...MoveLeftPosition(
							state.cardPropsList,
							state.startIdx,
							state.curIdx
						),
					],
					isTransitionInProgress: true,
				};
			case SLIDE_RESET_LEFT:
				return {
					...state,
					cardPropsList: [
						...state.cardPropsList.map((propsItem) => ({
							...propsItem,
							transitionDuration: state.transitionDuration,
							zIndex: state.zIndex,
						})),
					],
					curIdx: wrap(state.curIdx - 1, state.cardListLength),
					isTransitionInProgress: false,
				};
			case SLIDE_RIGHT:
				return {
					...state,
					cardPropsList: [
						...MoveRightPosition(
							state.cardPropsList,
							state.startIdx,
							state.curIdx
						),
					],
					isTransitionInProgress: true,
				};
			case SLIDE_RESET_RIGHT:
				return {
					...state,
					cardPropsList: [
						...state.cardPropsList.map((propsItem) => ({
							...propsItem,
							transitionDuration: state.transitionDuration,
							zIndex: state.zIndex,
						})),
					],
					curIdx: wrap(state.curIdx + 1, state.cardListLength),
					isTransitionInProgress: false,
				};
			case CHANGE_TRANSITION_DURATION:
			case RESET_TRANSITION_DURATION:
				return {
					...state,
					cardPropsList: [
						...state.cardPropsList.map((propsItem) => ({
							...propsItem,
							transitionDuration: action.payload,
						})),
					],
				};

			case SET_ON_RESIZE:
				return {
					...state,
					...action.payload,
					// onResize: action.payload,
					// isBreakPointChange: false
				};

			default:
				return initialState;
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
	);
};
