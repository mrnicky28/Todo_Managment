import { FormControl, ValidationErrors } from "@angular/forms";

export class PasswordValidator{

  static correctPassword(control: FormControl): ValidationErrors | null {

    const regExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z]).+$');

    if (!regExp.test(control.value)) {
          return { correctPassword: true }
    }
    return null;
  }
}
