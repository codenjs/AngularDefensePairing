import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidatorExtensions {
  public static addCustomMessage(existingValidatorFn: ValidatorFn, message: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const validationResult = existingValidatorFn(control);
      return validationResult ? {customMessage: {value: message}} : null;
    };
  }

  public static firstError(errors: ValidationErrors): string {
    const keys = Object.keys(errors);
    return errors[keys[0]].value;
  }
}
