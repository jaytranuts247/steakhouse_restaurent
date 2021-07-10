import React, { useEffect, useContext } from "react";
import { Context } from "../../context/context";
import ResizeObserver from "resize-observer-polyfill";
import PropTypes from "prop-types";

import { Container, LeftButton, RightButton } from "./CarouselContainer.styled";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";

import { wrap } from "../../utils/ultilities";

import Card from "../Card/Card.component";

import Loader from "../Loader/Loader";

const holdPositionOnResize = (id, cardlist = []) => {
  if (cardlist.length !== 0 && cardlist[id].cardPosition !== null) {
    return cardlist[id].cardPosition;
  }
  return id;
};

const CarouselContainer = ({ children, settings }) => {
  // console.log("CarouselContainer");

  const { state, dispatch } = useContext(Context);

  const {
    windowWidth,
    itemToShow,
    startIdx,
    transitionDuration,
    isTransitionInProgress,
    isLoading,
    zIndex,
    cardPropsList,
    curIdx,
    isBreakPointChange,
  } = state;

  var ro;
  const initResizeObserver = () => {
    ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        if (entry.target === document.body) {
          const { width } = entry.contentRect;
          // console.log("Element:", entry.target);
          // console.log("Width", width);
          dispatch({ type: "CHANGE_TRANSITION_DURATION", payload: 0.45 });
          dispatch({ type: "UPDATE_WINDOW_WIDTH", payload: width }); // update window width include set onResize true

          return width;
        }
      }
    });
    // console.log(ro);
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

  useEffect(() => {
    // console.log("Effect called once");
    // console.log("windowWidth2", windowWidth, itemToShow);

    let tempCardPropsList = [];
    let offset = 0;
    let tempOffSetPositionList = [];
    let cardW;
    let tempStartIdx = startIdx;

    initResizeObserver();
    // console.log("windowWidth", windowWidth, itemToShow);
    if (windowWidth !== null) {
      cardW = parseFloat(windowWidth) / itemToShow;
      // console.log(window.innerWidth);
      if (window.innerWidth <= 768) {
        cardW = windowWidth;
        tempStartIdx = Math.floor(cardListLength / 2);
      }

      for (let i = 0; i < cardListLength; i++) {
        offset = (i - tempStartIdx) * cardW;
        tempOffSetPositionList.push(offset);

        tempCardPropsList.push({
          id: i,
          cardPosition: holdPositionOnResize(i, cardPropsList),
          imgNum: cardPropsList[i] ? cardPropsList[i].id + 1 : i + 1,
          transitionDuration: transitionDuration,
          zIndex,
        });
      }

      if (window.innerWidth <= 768) {
        dispatch({
          type: "ADD_PROPS",
          payload: {
            cardPropsList: tempCardPropsList,
            offsetPositionList: tempOffSetPositionList,
            cardListLength,
            curIdx:
              cardPropsList.length !== 0
                ? isBreakPointChange
                  ? wrap(curIdx + 1, cardListLength)
                  : curIdx
                : 2,
            startIdx: Math.floor(cardListLength / 2),
          },
        });
      } else {
        dispatch({
          type: "ADD_PROPS",
          payload: {
            cardPropsList: tempCardPropsList,
            offsetPositionList: tempOffSetPositionList,
            cardListLength,
            curIdx:
              cardPropsList.length !== 0
                ? isBreakPointChange
                  ? wrap(curIdx - 1, cardListLength)
                  : curIdx
                : curIdx,
            startIdx: 1,
          },
        });
      }

      // dispatch({
      // 	type: "ADD_PROPS",
      // 	payload: {
      // 		cardPropsList: tempCardPropsList,
      // 		offsetPositionList: tempOffSetPositionList,
      // 		cardListLength,
      // 		// curIdx: 1,
      // 		// startIdx: 1,
      // 	},
      // });

      dispatch({
        type: "SET_ON_RESIZE",
        payload: { onResize: false, isBreakPointChange: false },
      });

      return () => {
        unSubscribeObserver();
      };
    }
  }, [windowWidth, startIdx]);

  const handleClickLeft = () => {
    if (!isTransitionInProgress) {
      dispatch({
        type: "CHANGE_TRANSITION_DURATION",
        payload: transitionDuration,
      });
      dispatch({ type: "SLIDE_LEFT" });
      setTimeout(() => {
        dispatch({ type: "SLIDE_RESET_LEFT" });
      }, transitionDuration * 1000 + 5);
    }
  };

  const handleClickRight = () => {
    if (!isTransitionInProgress) {
      dispatch({
        type: "CHANGE_TRANSITION_DURATION",
        payload: transitionDuration,
      });
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
          <Card
            key={idx}
            cardId={cardPropsList[idx] ? cardPropsList[idx].id : idx}
            activeId={Math.floor(cardListLength / 2)}
            {...settings.carouselInfo[idx]}
          >
            {child}
          </Card>
        ))}
        <IconContext.Provider value={{ className: "arrow-icon" }}>
          <LeftButton zIndex={zIndex} onClick={handleClickLeft}>
            <IoIosArrowBack />
          </LeftButton>
          <RightButton zIndex={zIndex} onClick={handleClickRight}>
            <IoIosArrowForward />
          </RightButton>
        </IconContext.Provider>
      </Container>
    </>
  );
};

export default CarouselContainer;

/*
 * wait for transition finish and scale
 * setUp autoplay
 */
