// TODO - make recursive like non-empties
// TODO - TESTS
export default function selectNonNulls(criteria: Record<string, any>): Record<string, any> {
	let _criteria: Record<string, any> = {};
	for (let prop in criteria) {
		if (criteria.hasOwnProperty(prop) && criteria[prop] !== null) {
			_criteria[prop] = criteria[prop];
		}
	}
	return _criteria;
}
