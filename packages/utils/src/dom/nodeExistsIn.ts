export default function nodeExistsIn(element: HTMLElement | ParentNode, target: HTMLElement): boolean {
	while (element) {
		if (element === target) {
			return true;
		}
		// TODO - typing
		// @ts-ignore
		element = element && element.parentNode;
	}

	return false;
}
