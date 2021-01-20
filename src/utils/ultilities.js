export const wrap = (index, arrayLength) => {
	return ((index % arrayLength) + arrayLength) % arrayLength;
};
