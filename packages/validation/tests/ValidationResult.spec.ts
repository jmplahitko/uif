import 'jasmine';

import { ValidationResult, ValidationResultList } from '../src';

describe('ValidationResult#isValid', () => {
	it('should be true when errorCount is 0', () => {
		const result = new ValidationResult('test1', 1);

		expect(result.errorCount).toBe(0);
		expect(result.isValid).toBeTrue();
	});

	it('should be false when errorCount is greater than 0', () => {
		const result = new ValidationResult('test1', 1);
		result.errors['bad'] = 'This is bad';

		expect(result.errorCount).toBe(1);
		expect(result.isValid).toBeFalse();
	});

	it('should be true when warningCount is greater than 0', () => {
		const result = new ValidationResult('test1', 1);
		result.warnings['potentiallyBad'] = 'This might be bad';

		expect(result.warningCount).toBe(1);
		expect(result.isValid).toBeTrue();
	});
});

describe('ValidationResult#merge', () => {
	it('should not break reference from itself when merging another ValidationResult', () => {
		const result1 = new ValidationResult('test1', 1);
		const result2 = new ValidationResult('test1', 1);
		const merged = result1.merge(result2);
		expect(merged).toBe(result1);
	});

	it('should merge errors of two ValidationResults', () => {
		const result1 = new ValidationResult('test1', 1);
		const result2 = new ValidationResult('test2', 1);

		const badMessage = 'This is a bad thing';
		const anotherBadMessage = 'This is also a bad thing';

		result1.errors['bad'] = badMessage;
		result2.errors['anotherBad'] = anotherBadMessage;

		const merged = result1.merge(result2);

		expect(merged.errorCount).toBe(2);
		expect(merged.errors['bad']).toBe(badMessage);
		expect(merged.errors['anotherBad']).toBe(anotherBadMessage);
	});

	it('should favor source errors over destination errors when error keys match', () => {
		const result1 = new ValidationResult('test1', 1);
		const result2 = new ValidationResult('test2', 1);

		const badMessage = 'This is a bad thing';
		const anotherBadMessage = 'This is also a bad thing';

		result1.errors['bad'] = badMessage;
		result2.errors['bad'] = anotherBadMessage;

		const merged = result1.merge(result2);

		expect(merged.errorCount).toBe(1);
		expect(merged.errors['bad']).toBe(anotherBadMessage);
	});

	it('should merge warnings of two ValidationResults', () => {
		const result1 = new ValidationResult('test1', 1);
		const result2 = new ValidationResult('test2', 1);

		const potentiallyBadMessage = 'This is a bad thing';
		const anotherPotentiallyBadMessage = 'This is also a bad thing';

		result1.warnings['bad'] = potentiallyBadMessage;
		result2.warnings['anotherBad'] = anotherPotentiallyBadMessage;

		const merged = result1.merge(result2);

		expect(merged.warningCount).toBe(2);
		expect(merged.warnings['bad']).toBe(potentiallyBadMessage);
		expect(merged.warnings['anotherBad']).toBe(anotherPotentiallyBadMessage);
	});

	it('should favor source errors over destination errors when error keys match', () => {
		const result1 = new ValidationResult('test1', 1);
		const result2 = new ValidationResult('test2', 1);

		const potentiallyBadMessage = 'This is a bad thing';
		const anotherPotentiallyBadMessage = 'This is also a bad thing';

		result1.warnings['bad'] = potentiallyBadMessage;
		result2.warnings['bad'] = anotherPotentiallyBadMessage;

		const merged = result1.merge(result2);

		expect(merged.warningCount).toBe(1);
		expect(merged.warnings['bad']).toBe(anotherPotentiallyBadMessage);
	});
});

describe('ValidationResult#toValidationResultList', () => {
	const result = new ValidationResult('test1');
	result.errors['bad'] = 'This is bad';
	result.warnings['potentiallyBad'] = 'This might be bad';
	const resultList = result.toValidationResultList();

	it('should return a ValidationResultList', () => {
		expect(resultList).toBeInstanceOf(ValidationResultList);
	});

	it('should return a ValidationResultList with a matching errorCount', () => {
		expect(resultList.withErrors.length).toBe(result.errorCount);
	});

	it('should return a ValidationResultList with a matching warningCount', () => {
		expect(resultList.withWarnings.length).toBe(result.warningCount);
	});

	it('should return a ValidationResultList with exactly one entry', () => {
		expect(resultList.entries.length).toBe(1);
	});

	it('should return a ValidationResultList who\'s single entry is the original ValidationResult', () => {
		const clone = resultList.get('test1');
		expect((<ValidationResult>clone)).toBe(result);
	});
});