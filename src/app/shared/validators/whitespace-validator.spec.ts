import { FormControl } from '@angular/forms';
import { WhitespaceValidator } from './whitespace-validator';

describe('WhitespaceValidator', () => {
  let customMessage: string;

  beforeEach(() => {
    customMessage = null;
  });

  const validate = (inputValue: string) => {
    const validatorFn = customMessage
      ? WhitespaceValidator.create(customMessage)
      : WhitespaceValidator.create();

    const validationResult = validatorFn(new FormControl(inputValue));
    return validationResult;
  };

  it('should return null when the value contains non-whitespace', () => {
    const result = validate('abc');
    expect(result).toBeNull();
  });

  it('should return null when the value contains non-whitespace padded with whitespace', () => {
    const result = validate(' abc ');
    expect(result).toBeNull();
  });

  it('should return an error message when the value is a space', () => {
    const result = validate(' ');
    expect(result.invalidWhitespace.value).toBe('Value is empty');
  });

  it('should return an error message when the value is all spaces', () => {
    const result = validate('   ');
    expect(result.invalidWhitespace.value).toBe('Value is empty');
  });

  it('should return an error message when the value is a tab', () => {
    const result = validate('\t');
    expect(result.invalidWhitespace.value).toBe('Value is empty');
  });

  it('should return null when the value is empty', () => {
    const result = validate('');
    expect(result).toBeNull();
  });

  it('should return null when the value is null', () => {
    const result = validate(null);
    expect(result).toBeNull();
  });

  it('should return a custom message when the value is invalid and a custom message was provided', () => {
    customMessage = 'custom message';
    const result = validate(' ');
    expect(result.invalidWhitespace.value).toBe('custom message');
  });

  it('should return default error message when the value is invalid and an empty message was provided', () => {
    customMessage = '';
    const result = validate(' ');
    expect(result.invalidWhitespace.value).toBe('Value is empty');
  });
});
