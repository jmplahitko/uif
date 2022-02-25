import 'jasmine';
import { ValidationResultList, ValidationResult } from '../src';

describe('ValidationResultList#isValid', () => {
	it('should be true when #withErrors().length is 0', () => {
		const resultList = new ValidationResultList();
		expect(resultList.withErrors.length).toBe(0);
		expect(resultList.isValid).toBeTrue();
	});

	it('should be false when #withErrors().length is greater than 0', () => {
		const resultList = new ValidationResultList();
		const result = new ValidationResult('test', 1);
		result.errors['bad'] = 'This is bad';
		resultList.push(result);

		expect(resultList.withErrors.length).toBe(1);
		expect(resultList.isValid).toBeFalse();
	});

	it('should be true when #withWarnings().length is greater than 0', () => {
		const resultList = new ValidationResultList();
		const result = new ValidationResult('test', 1);
		result.warnings['possiblyBad'] = 'This might be bad';
		resultList.push(result);

		expect(resultList.withWarnings.length).toBe(1);
		expect(resultList.isValid).toBeTrue();
	});
});

describe('ValidationResultList#withErrors', () => {
	const resultList = new ValidationResultList();
	const result = new ValidationResult('test', 1);
	result.errors['bad1'] = 'This is bad';
	result.errors['bad2'] = 'This is bad';
	result.errors['bad3'] = 'This is bad';
	result.warnings['possiblyBad1'] = 'This might be bad';
	result.warnings['possiblyBad2'] = 'This might be bad';
	resultList.push(result);

	it('should return a new ValidationResultList', () => {
		expect(resultList.withErrors).toBeInstanceOf(ValidationResultList);
	});

	it('should return a new ValidationResultList who\'s entries all contain warnings', () => {
		const withErrors = resultList.entries.filter((result) => result.errorCount > 0);
		expect(resultList.length).toBe(withErrors.length);
	});
});

describe('ValidationResultList#withWarnings', () => {
	const resultList = new ValidationResultList();
	const result = new ValidationResult('test', 1);
	result.errors['bad1'] = 'This is bad';
	result.errors['bad2'] = 'This is bad';
	result.errors['bad3'] = 'This is bad';
	result.warnings['possiblyBad1'] = 'This might be bad';
	result.warnings['possiblyBad2'] = 'This might be bad';
	resultList.push(result);

	it('should return a new ValidationResultList', () => {
		expect(resultList.withWarnings).toBeInstanceOf(ValidationResultList);
	});

	it('should return a new ValidationResultList who\'s entries all contain errors', () => {
		const withWarnings = resultList.entries.filter((result) => result.warningCount > 0);
		expect(resultList.length).toBe(withWarnings.length);
	});
});

describe('ValidationResultList#clear', () => {
	it('should remove all entries', () => {
		const resultList = new ValidationResultList();
		const resultCount = 5;

		for(let i = 0, j = resultCount; i < j; i++) {
			resultList.push(new ValidationResult(`test${i}`, i));
		}

		expect(resultList.length).toBe(resultCount);

		resultList.clear();

		expect(resultList.length).toBe(0);
	});
});

describe('ValidationResultList#get', () => {
	it('should return a ValidationResult if found, undefined if not found', () => {
		const resultList = new ValidationResultList();
		const result = new ValidationResult('test', 1);
		result.errors['bad1'] = 'This is bad';

		resultList.push(result);

		expect(resultList.get('test')).toBeInstanceOf(ValidationResult);
		expect(resultList.get('test1')).toBeUndefined();
	});
});

describe('ValidationResultList#getWithRelatedResults', () => {
	const resultList = new ValidationResultList([
		new ValidationResult('arr', [0, 1, 2, 3]),
		new ValidationResult('arr[0]', 0),
		new ValidationResult('arr[1]', 1),
		new ValidationResult('arr[2]', 2),
		new ValidationResult('arr[3]', 3),
		new ValidationResult('obj', { test0: 0, test1: 1, test2: 2, test3: 3}),
		new ValidationResult('obj.test0', 0),
		new ValidationResult('obj.test1', 1),
		new ValidationResult('obj.test2', 2),
		new ValidationResult('obj.test3', 3),
	]);

	const arrResultList = resultList.getWithRelatedResults('arr');
	const arrResultListKeys = ['arr', 'arr[0]', 'arr[1]', 'arr[2]', 'arr[3]'];
	const objResultList = resultList.getWithRelatedResults('obj');
	const objResultListKeys = ['obj', 'obj.test0', 'obj.test1', 'obj.test2', 'obj.test3']

	it('should return a new ValidationResultList', () => {
		expect(arrResultList).toBeInstanceOf(ValidationResultList);
		expect(objResultList).toBeInstanceOf(ValidationResultList);
	});

	it('should return a ValidationResultList containing a ValidationResult for an array property and for each of its contained elements', () => {
		expect(arrResultList.length).toBe(5);
		expect(Object.keys(arrResultList.toObject())).toEqual(jasmine.arrayWithExactContents(arrResultListKeys));
	});

	it('should return a ValidationResultList containing a ValidationResult for an object property and for each of its own keys', () => {
		expect(objResultList.length).toBe(5);
		expect(Object.keys(objResultList.toObject())).toEqual(jasmine.arrayWithExactContents(objResultListKeys));
	});
});

describe('ValidationResultList#merge', () => {
	const result1 = new ValidationResult('test1', 1);
	const result2 = new ValidationResult('test2', 2);
	const result3 = new ValidationResult('test1', 1);
	const result4 = new ValidationResult('test2', 2);

	const badMessage1 = 'One bad';
	const badMessage2 = 'Two bad';
	const badMessage3 = 'Three bad';
	const badMessage4 = 'Four bad';

	const maybeBadMessage1 = 'One might be bad';
	const maybeBadMessage2 = 'Two might be bad';
	const maybeBadMessage3 = 'Three might be bad';
	const maybeBadMessage4 = 'Four might be bad';

	result1.errors['bad'] = badMessage1;
	result2.errors['alsoBad'] = badMessage2;
	result3.errors['bad'] = badMessage3;
	result4.errors['alsoBad'] = badMessage4;

	result1.warnings['maybeBad1'] = maybeBadMessage1;
	result2.warnings['maybeBad2'] = maybeBadMessage2;
	result3.warnings['maybeBad3'] = maybeBadMessage3;
	result4.warnings['maybeBad4'] = maybeBadMessage4;

	const resultList1 = new ValidationResultList([ result1, result2 ]);
	const resultList2 = new ValidationResultList([ result3, result4 ]);

	const merged = resultList1.merge(resultList2);

	it('should not break reference from itself when merging another ValidationResultList', () => {
		expect(merged).toBe(resultList1);
	});

	it('should merge entries of two ValidationResultLists', () => {
		const withErrors = merged.withErrors;
		const withWarnings = merged.withWarnings;
		let withErrorsTotalCount = 0;
		let withWarningsTotalCount = 0;

		withErrors.forEach(result => withErrorsTotalCount += result.errorCount);
		withWarnings.forEach(result => withWarningsTotalCount += result.warningCount);

		expect(withErrors.length).toBe(2);
		expect(withWarnings.length).toBe(2);
		expect(withErrorsTotalCount).toBe(2);
		expect(withWarningsTotalCount).toBe(4);
	});
});

describe('ValidationResultList#push', () => {
	const test1Result = new ValidationResult('test1', 1);
	const test2Result = new ValidationResult('test2', 2);
	const anotherTest1Result = new ValidationResult('test1', 1);


	it('should increase entry length by one when an entry with matching propertyName does not exist', () => {
		const resultList = new ValidationResultList([ test1Result ]);

		expect(resultList.length).toBe(1);

		resultList.push(test2Result);
		expect(resultList.length).toBe(2);
	});

	it('should merge a push candidate with an existing entry when propertyName matches', () => {
		const resultList = new ValidationResultList([ test1Result ]);

		resultList.push(anotherTest1Result);
		expect(resultList.length).toBe(1);
	});
});

describe('ValidationResultList#remove', () => {
	const test1Result = new ValidationResult('test1', 1);
	const resultList = new ValidationResultList([ test1Result ]);
	const resultListInitialLength = resultList.length;

	const successfullyRemoved = resultList.remove('test1');
	const unsuccessfullyRemoved = resultList.remove('test2');

	it('should remove a ValidationResult from its entries', () => {
		expect(resultListInitialLength).toBe(1);
		expect(resultList.length).toBe(0);
	});

	it('should return the ValidationResult when successfully removed', () => {
		expect(successfullyRemoved).toBeInstanceOf(ValidationResult);
		expect((<ValidationResult>successfullyRemoved).propertyName).toBe('test1');
		expect((<ValidationResult>successfullyRemoved).value).toBe(1);
	});

	it('should return null when ValidationResult is not successfully removed', () => {
		expect(unsuccessfullyRemoved).toBe(null);
	});
});

describe('ValidationResultList#removeWithRelatedResults', () => {
	const arr = [0, 1, 2];
	const obj = { zero: 0, one: 1, two: 2 };

	const arrResult = new ValidationResult('arr', arr);
	const arr0Result = new ValidationResult('arr[0]', arr[0]);
	const arr1Result = new ValidationResult('arr[1]', arr[1]);
	const arr2Result = new ValidationResult('arr[2]', arr[2]);

	const objResult = new ValidationResult('obj', obj);
	const obj0Result = new ValidationResult('obj.0', obj.zero);
	const obj1Result = new ValidationResult('obj.1', obj.one);
	const obj2Result = new ValidationResult('obj.2', obj.two);

	const arrResults = new ValidationResultList([
		arrResult, arr0Result, arr1Result, arr2Result
	]);

	const arrRemoved = arrResults.removeWithRelatedResults('arr');

	const objResults = new ValidationResultList([
		objResult, obj0Result, obj1Result, obj2Result
	]);

	const objRemoved = objResults.removeWithRelatedResults('obj');

	it('should return a new ValidationResultList', () => {
		expect(arrRemoved).toBeInstanceOf(ValidationResultList);
	});

	it('should remove the ValidationResult for an array and each of its contained elements', () => {
		expect(arrResults.entries).toEqual([]);
		expect(arrRemoved.entries).toEqual(jasmine.arrayWithExactContents([
			arrResult, arr0Result, arr1Result, arr2Result
		]));
	});

	it('should remove the ValidationResult for an object property and each of its contained elements', () => {
		expect(objResults.entries).toEqual([]);
		expect(objRemoved.entries).toEqual(jasmine.arrayWithExactContents([
			objResult, obj0Result, obj1Result, obj2Result
		]));
	});
});

describe('ValidationResultList#toArray', () => {
	it('should return a new array that accurately represents the ValidationResultList\'s entries', () => {
		const results = new ValidationResultList([
			new ValidationResult('test1', 1),
			new ValidationResult('test2', 1),
			new ValidationResult('test3', 1),
		]);

		const resultsArr = results.toArray();

		expect(resultsArr).toEqual(jasmine.arrayWithExactContents(results.entries));
	});
});

describe('ValidationResultList#toObject', () => {
	it('should return a key/value pair where each value is a ValidationResult and each key is it\'s value\'s propertyName', () => {
		const results = new ValidationResultList([
			new ValidationResult('test1', 1),
			new ValidationResult('test2', 1),
			new ValidationResult('test3', 1),
		]);

		const resultsObj = results.toObject();

		const expectedKeys = results.entries.map(result => result.propertyName);
		const expectedValues = results.entries;

		expect(Object.keys(resultsObj)).toEqual(jasmine.arrayWithExactContents(expectedKeys));
		expect(Object.values(resultsObj)).toEqual(jasmine.arrayWithExactContents(expectedValues));
	});
});