import { AbstractControl, ValidationErrors } from "@angular/forms";

export function validateSoldPrice(control: AbstractControl): ValidationErrors | null {
  const generalPrice = control.get('generalPrice')?.value;
  const soldPrice = control.get('soldPrice')?.value;

  if ( soldPrice <= generalPrice && soldPrice > 0 ) {
    control.get('soldPrice')?.setErrors({'isMinor': true});
  }
  return (null);
}
