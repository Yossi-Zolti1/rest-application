import { AbstractControl, Validators } from '@angular/forms';
export function MailValidator(
  control: AbstractControl
): { [key: string]: string } | null {
  if (!control.value) {
    return {mail: 'שדה זו חובה'};
  }
  if(control.value == Validators.email ){
    return {mail: 'כתובת מייל לא חוקית'}
  }
  return null;
}