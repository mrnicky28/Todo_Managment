import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/interfaces/interfaces';
import { AuthService } from 'src/services/auth.service';
import { PasswordValidator } from 'src/validators/password.validator';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  form: FormGroup | any;
  submitted = false;
  message: string | any;

  constructor(
    private FormBuilder: FormBuilder,
      public auth: AuthService,
      private router: Router,
      private route: ActivatedRoute
      ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста войдите в систему'
      }
    })

    this.form = this.FormBuilder.group({
      email: [null, [
        Validators.required,
         Validators.email,
        ]],
      password: [null,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
        PasswordValidator.correctPassword,
      ]],
    })
  }

  submit(){
    if (this.form.invalid) {
      return
    };

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/tasks']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
