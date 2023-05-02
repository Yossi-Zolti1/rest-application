import { AbstractControl, Validators } from '@angular/forms';
export function MailValidator(
  control: AbstractControl
): { [key: string]: string } | null {
  if (!control.value) {
    return {mail: 'שדה זו חובה'};
  }
  const regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
  const valid = regex.test(control.value);
  if(!valid){
    return {mail: 'כתובת מייל לא חוקית'}
  }
  return null;
}