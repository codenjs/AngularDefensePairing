import { AbstractControl, ValidatorFn } from '@angular/forms';

export class WhitespaceValidator {
  public static create(message?: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) {
        return null;
      }
      const inputValue = control.value.trim();
      return inputValue ? null : {invalidWhitespace: {value: message || 'Value is empty'}};
    };
  }
}
