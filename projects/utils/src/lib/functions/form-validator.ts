import { UntypedFormGroup } from '@angular/forms';

export function validate(form: UntypedFormGroup): void {
  form.markAllAsTouched();
  Object.entries(form.controls).forEach(([_key, control]) => {
    control.markAllAsTouched();
    control.markAsDirty();
  });
}
