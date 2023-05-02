import { AbstractControl } from '@angular/forms';
export function NameValidator(
  control: AbstractControl
): { [key: string]: string } | null {
  if (!control.value) {
    return {name: 'שדה זו חובה'};
  }
  const regex = new RegExp('^[a-zA-Z ]+$');
  const valid = regex.test(control.value);
  if(!valid){
    return {name: 'שם אמור להכיל רק אותיות'}
  }
  return null;
}