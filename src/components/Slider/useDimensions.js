import { useState, useEffect } from "react";

const useDimensions = (myRef) => {
	const getDimensions = () => ({
		width: myRef.current.offsetWidth,
		height: myRef.current.offsetHeight,
	});

	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (myRef.current) setDimensions(getDimensions());
	}, [myRef]);
	return dimensions;
};

export default useDimensions;
