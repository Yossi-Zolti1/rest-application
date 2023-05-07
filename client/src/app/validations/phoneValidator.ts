import { AbstractControl } from '@angular/forms';
export function PhoneValidator(
  control: AbstractControl
): { [key: string]: string } | null {
  if (!control.value) {
    return {phone: 'שדה זו חובה'};
  }
  const regex = /^[0-9]{9,}$/;
  const valid = regex.test(control.value);
  if(!valid){
    return {phone: 'טלפון אמור להכיל רק ספרות ומינימום 9 ספרות'}
  }
  return null;
}