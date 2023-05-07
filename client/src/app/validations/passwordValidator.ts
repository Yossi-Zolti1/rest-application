import { AbstractControl } from '@angular/forms';
export function PasswordValidator(
  control: AbstractControl
): { [key: string]: string } | null {
  if (!control.value) {
    return {password: 'שדה זו חובה'};
  }
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{9,}$/;
  const valid = regex.test(control.value);
  if(!valid){
    return {password: 'סיסמא אמורה להכיל לפחות אות קטנה אחת ואות גדולה אחת באנגלית וסיפרה אחת ומינימום 9 תווים'}
  }
  return null;
}