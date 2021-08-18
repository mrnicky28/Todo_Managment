import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user-interface';

import { AuthService } from 'src/app/shared/services/auth.service';
import { PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    private FormBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста войдите в систему';
      }
    });

    this.form = this.FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
          PasswordValidator.correctPassword,
        ],
      ],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/tasks']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
