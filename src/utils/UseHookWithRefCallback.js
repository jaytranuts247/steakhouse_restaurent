import { useCallback, useRef } from "react";

export default function useHookWithRefCallback() {
	const ref = useRef(null);
	const setRef = useCallback((node) => {
		if (ref.current) {
			// Make sure to cleanup any events/references added to the last instance
			console.log("useHookWithRefCallback ref", ref.current);
		}

		if (node) {
			// Check if a node is actually passed. Otherwise node would be null.
			// You can now do what you need to, addEventListeners, measure, etc.
			console.log("node is exist", node);
		}

		// Save a reference to the node
		ref.current = node;
	}, []);

	return [setRef];
}
