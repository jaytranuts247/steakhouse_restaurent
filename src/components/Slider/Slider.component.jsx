import React, { useEffect, useState, useRef, Fragment, useMemo } from "react";

import { Container, SlideItem, Next, Prev } from "./Slider.styles";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import Pagination from "./Pagination.component";

import { useResizeObserver } from "./useResizeObserver";

var PREV_DIRECTION = -1;
var NEXT_DIRECTION = 1;
var TIME_OUT = 100;

const shiftArray = (array, from, to) => {
  let arr_temp = [...array];
  let cutOut = arr_temp.splice(from, 1)[0];
  arr_temp.splice(to, 0, cutOut);
  return arr_temp;
};

const shiftIndexArray = (array, shiftCount, direction) => {
  let arr_temp = [...array];

  for (let index = 0; index < shiftCount; index++) {
    if (direction === NEXT_DIRECTION) {
      arr_temp = shiftArray(arr_temp, 0, arr_temp.length);
    } else {
      arr_temp = shiftArray(arr_temp, -1, 0);
    }
  }
  return arr_temp;
};

const circulate = (state, array, direction) => {
  const temp = state.slides.map((slide, idx) => {
    if (array.some((item) => item === slide.idx)) {
      return {
        ...slide,
        circulateOffset:
          slide.circulateOffset + direction * state.circulateOffsetLength,
      };
    } else {
      return slide;
    }
  });
  return temp;
};

const Slider = ({ children, ...restProps }) => {
  const ref = useRef();

  const dimensions = useResizeObserver(ref);

  const {
    itemToShow,
    arrowPosition,
    showPagination,
    scaleWhenActive,
    showMiddleLine,
  } = restProps;

  const [state, setState] = useStateWithCallbackLazy({
    currentIndex: 0,
    translate: 0,
    transition: 0.45,
    slides: [],
    indexArray: [],
    slideWidth: 0,
    isTransition: true,
    slidesLength: 0,
    firstIdx: 0,
    lastIdx: 0,
    NumberOfShowItem: 1,
  });

  const handlePagination = (direction) => {
    // console.log("handle Pagination");
    let from, to, indexToCompared;

    if (direction === NEXT_DIRECTION) {
      from = 0;
      to = state.indexArray.length / 2;
      indexToCompared = state.lastIdx + 1 - state.NumberOfShowItem;
    } else {
      from = state.indexArray.length / 2;
      to = state.indexArray.length;
      indexToCompared = state.firstIdx;
    }

    if (state.currentIndex === indexToCompared) {
      return setState(
        (prevState) => ({
          ...prevState,
          transition: 0,
          slides: circulate(
            prevState,
            prevState.indexArray.slice(from, to),
            direction
          ),
          indexArray: shiftIndexArray(
            prevState.indexArray,
            prevState.indexArray.length / 2,
            direction
          ),
          firstIdx:
            prevState.firstIdx + (direction * prevState.indexArray.length) / 2,
          lastIdx:
            prevState.lastIdx + (direction * prevState.indexArray.length) / 2,
        }),
        () => {
          setTimeout(() => {
            // console.log("callback after set state");
            setState((prevState) => ({
              ...prevState,
              transition: 0.45,
              currentIndex: prevState.currentIndex + direction,
              translate:
                -(prevState.currentIndex + direction) * prevState.slideWidth,
            }));
          }, TIME_OUT);
        }
      );
    }
    setState((prevState) => ({
      ...prevState,
      currentIndex: prevState.currentIndex + direction,
      translate: -(prevState.currentIndex + direction) * prevState.slideWidth,
    }));
  };
  /*
	useEffect(() => {
		console.log("run useEffect");
		if (!ref.current) return;

		const ro = new ResizeObserver((entries, observer) => {
			for (const entry of entries) {
				if (entry.target === ref.current) {
					const { width } = entry.contentRect;
					console.log("Element:", entry.target);
					console.log("Width", width);
					console.log("ItemToShow", itemToShow);
					setContainerWidth(width, () => {
						console.log("resizeObserver containerWidth", containerWidth);
						setState(
							(prevState) => ({
								...prevState,
								NumberOfShowItem: itemToShow,
							}),
							() => {
								console.log("state.NumberOfShowItem", state.NumberOfShowItem);
							}
						);
					});
					// setState((prevState) => ({
					// 	...prevState,
					// 	NumberOfShowItem: itemToShow,
					// }));
					// handleResize();
				}
			}
		});
		ro.observe(ref.current);

		return () => ro.disconnect();
	}, []);
	*/

  useEffect(() => {
    if (dimensions) {
      console.log(
        "ref sider mounted ",
        dimensions,
        dimensions.width / itemToShow,
        itemToShow,
        restProps.itemToShow,
        ref
      );

      let NumberOfShowItem;
      let slideWidth_tmp;

      slideWidth_tmp = dimensions.width / itemToShow;
      NumberOfShowItem = itemToShow;

      console.log(
        "setup width",
        slideWidth_tmp,
        NumberOfShowItem,
        dimensions.width,
        restProps.itemToShow,
        itemToShow
      );
      let index_array = Array.from(
        [...children, ...children],
        (value, idx) => idx
      );
      let circulateOffsetLength = index_array.length * slideWidth_tmp;
      let slides_tmp = Array.from([...children, ...children], (child, idx) => ({
        child,
        idx,
        itemTranslate: idx * slideWidth_tmp,
        circulateOffset: 0,
      }));

      setState(
        (prevState) => ({
          ...prevState,
          slides: slides_tmp,
          indexArray: index_array,
          slideWidth: slideWidth_tmp,
          slidesLength: index_array.length,
          circulateOffsetLength,
          firstIdx: 0,
          lastIdx: index_array.length - 1,
          NumberOfShowItem,
          translate: 0, // to make sure item stay in place when screen resize
        }),
        () => {
          console.log("then callback");
        }
      );
    }
  }, [dimensions, itemToShow]);

  // useEffect(() => {
  // 	if (containerWidth && state && setState) {
  // 		console.log(
  // 			"ref sider mounted ",
  // 			containerWidth,
  // 			containerWidth / itemToShow,
  // 			itemToShow,
  // 			restProps.itemToShow,
  // 			ref
  // 		);

  // 		let NumberOfShowItem;
  // 		let slideWidth_tmp;

  // 		slideWidth_tmp = containerWidth / itemToShow;
  // 		NumberOfShowItem = itemToShow;

  // 		console.log(
  // 			"setup width",
  // 			slideWidth_tmp,
  // 			NumberOfShowItem,
  // 			containerWidth,
  // 			restProps.itemToShow,
  // 			itemToShow
  // 		);
  // 		let index_array = Array.from(
  // 			[...children, ...children],
  // 			(value, idx) => idx
  // 		);
  // 		let circulateOffsetLength = index_array.length * slideWidth_tmp;
  // 		let slides_tmp = Array.from([...children, ...children], (child, idx) => ({
  // 			child,
  // 			idx,
  // 			itemTranslate: idx * slideWidth_tmp,
  // 			circulateOffset: 0,
  // 		}));

  // 		setState(
  // 			(prevState) => ({
  // 				...prevState,
  // 				slides: slides_tmp,
  // 				indexArray: index_array,
  // 				slideWidth: slideWidth_tmp,
  // 				slidesLength: index_array.length,
  // 				circulateOffsetLength,
  // 				firstIdx: 0,
  // 				lastIdx: index_array.length - 1,
  // 				NumberOfShowItem,
  // 			}),
  // 			() => {
  // 				console.log("then callback");
  // 			}
  // 		);
  // 	}
  // }, [containerWidth]);

  // useEffect(() => {
  // 	if (dimensions && state && setState) {
  // 		console.log(
  // 			"ref sider mounted ",
  // 			dimensions.width / itemToShow,
  // 			itemToShow,
  // 			ref
  // 		);

  // 		let NumberOfShowItem;
  // 		let slideWidth_tmp;

  // 		if (dimensions.width <= 400) {
  // 			slideWidth_tmp = dimensions.width;
  // 			NumberOfShowItem = 1;
  // 		} else {
  // 			slideWidth_tmp = dimensions.width / itemToShow;
  // 			NumberOfShowItem = itemToShow;
  // 		}

  // 		let index_array = Array.from(
  // 			[...children, ...children],
  // 			(value, idx) => idx
  // 		);
  // 		let circulateOffsetLength = index_array.length * slideWidth_tmp;
  // 		let slides_tmp = Array.from([...children, ...children], (child, idx) => ({
  // 			child,
  // 			idx,
  // 			itemTranslate: idx * slideWidth_tmp,
  // 			circulateOffset: 0,
  // 		}));

  // 		setState(
  // 			(prevState) => ({
  // 				...prevState,
  // 				slides: slides_tmp,
  // 				indexArray: index_array,
  // 				slideWidth: slideWidth_tmp,
  // 				slidesLength: index_array.length,
  // 				circulateOffsetLength,
  // 				firstIdx: 0,
  // 				lastIdx: index_array.length - 1,
  // 				NumberOfShowItem,
  // 			}),
  // 			() => {
  // 				console.log("then callback");
  // 			}
  // 		);
  // 	}
  // }, [dimensions]);

  return (
    <Fragment>
      <Container
        ref={ref}
        scaleWhenActive={scaleWhenActive}
        showMiddleLine={showMiddleLine}
      >
        {state.slideWidth &&
          state.slides.map((slide) => {
            const {
              slideWidth,
              transition,
              translate,
              currentIndex,
              slidesLength,
              NumberOfShowItem,
            } = state;
            const { child, idx, itemTranslate, circulateOffset } = slide;
            const { width, ...rest } = restProps;
            const widthToUse = slideWidth ? slideWidth : width;

            return (
              <SlideItem
                key={idx}
                id={idx}
                width={widthToUse}
                transition={transition}
                translate={itemTranslate + translate}
                circulateOffset={circulateOffset}
                activeIndex={
                  (currentIndex +
                    Math.floor(NumberOfShowItem / 2) +
                    slidesLength) %
                  slidesLength
                }
                {...rest}
              >
                {child}
              </SlideItem>
            );
          })}
      </Container>
      {showPagination && (
        <Pagination
          slides={children}
          currentIndex={
            state.currentIndex % React.Children.toArray(children).length
          }
        />
      )}

      <Next
        arrowPosition={arrowPosition}
        onClick={() => handlePagination(NEXT_DIRECTION)}
      />
      <Prev
        arrowPosition={arrowPosition}
        onClick={() => handlePagination(PREV_DIRECTION)}
      />
    </Fragment>
  );
};

Slider.defaultProps = {
  paddingH: "20",
  paddingV: "0",
  width: "50",
  itemToShow: 2,
  arrowPosition: -80,
  dotSeperatorBottom: 0,
  scaleWhenActive: false,
  showPagination: false,
  showMiddleLine: false,
  transitionDelay: 0,
};

export default Slider;
