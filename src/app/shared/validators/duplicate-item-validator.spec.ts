import { FormControl } from '@angular/forms';
import { DuplicateItemValidator } from './duplicate-item-validator';

describe('DuplicateItemValidator', () => {
  let existingItems: string[];

  beforeEach(() => {
    existingItems = ['Item1', 'Item2'];
  });

  const validate = (inputValue: string) => {
    const validatorFn = DuplicateItemValidator.create(() => existingItems);
    const validationResult = validatorFn(new FormControl(inputValue));
    return validationResult;
  };

  it('should return null when the item does not already exist', () => {
    const result = validate('Item3');
    expect(result).toBeNull();
  });

  it('should return an error message when the item already exists', () => {
    const result = validate('Item1');
    expect(result.duplicateItem.value).toBe('Item1 already exists');
  });

  it('should return an error message when the item has whitespace but trimmed item already exists', () => {
    const result = validate(' Item1 ');
    expect(result.duplicateItem.value).toBe('Item1 already exists');
  });

  it('should return null when no items already exist', () => {
    existingItems = [];
    const result = validate('Item1');
    expect(result).toBeNull();
  });

  it('should return null when the item is null', () => {
    const result = validate(null);
    expect(result).toBeNull();
  });
});
