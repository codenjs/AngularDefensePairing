import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DuplicateItemValidator {
  public static create(existingItems: () => string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) {
        return null;
      }
      const inputValue = control.value.trim();
      const exists = existingItems().find(i => i === inputValue);
      return exists ? {duplicateItem: {value: `${inputValue} already exists`}} : null;
    };
  }
}
