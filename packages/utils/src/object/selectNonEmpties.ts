import { isEmpty, isObject } from '../predicate';

// TODO - TESTS
export default function selectNonEmpties(criteria: Record<string, any> | Array<any>): Record<string, any> | Array<any> {
	if (isObject(criteria) || Array.isArray(criteria)) {
		let _criteria = Array.isArray(criteria) ? [] : {};
		for (let prop in criteria) {
			if (criteria.hasOwnProperty(prop) && !isEmpty(criteria[prop])) {
				let filteredData = selectNonEmpties(criteria[prop]);
				if (!isEmpty(filteredData)) {
					if (Array.isArray(_criteria)) {
						_criteria.push(filteredData);
					} else {
						_criteria[prop] = filteredData;
					}
				}
			}
		}
		return _criteria;
	}
	return criteria;
}
