import React from "react";
import styled from "styled-components";

import { StarOutlined, Star } from "@styled-icons/entypo";

const RatingWrap = styled.div`
	width: auto;
	padding-top: ${({ paddingTop }) => paddingTop}px;
	padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
`;

const StarOutlinedStyled = styled(StarOutlined)`
	color: #c19d60;
	z-index: 3;
`;
const StarStyled = styled(Star)`
	color: #c19d60;
	z-index: 3;
`;

const RatingStars = ({ rating, size, paddingTop, paddingBottom, ...rest }) => {
	const starToShow = Array.from(new Array(5), (value, idx) => {
		if (idx > rating - 1) {
			return false;
		} else {
			return true;
		}
	});
	return (
		<RatingWrap paddingTop={paddingTop} paddingBottom={paddingBottom}>
			{starToShow.map((star, idx) => {
				if (star) {
					return <StarStyled size={size} {...rest} />;
				} else {
					return <StarOutlinedStyled size={size} {...rest} />;
				}
			})}
		</RatingWrap>
	);
};

RatingStars.defaultProps = {
	rating: 3,
	size: 12,
	paddingTop: 12,
	paddingBottom: 12,
};

export default RatingStars;
