import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbAuthResponse } from '../models/firebase-interfase';
import { HttpErrors } from '../models/http-errors';
import { User } from '../models/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string | any {
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<FbAuthResponse | null> {
    user.returnSecureToken = true;
    return this.http
      .post<FbAuthResponse>(
        `${environment.fbUrl}/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case HttpErrors.INVALID_EMAIL:
        this.error$.next('Invalid email');
        break;
      case HttpErrors.INVALID_PASSWORD:
        this.error$.next('Invalid password');
        break;
      case HttpErrors.EMAIL_NOT_FOUND:
        this.error$.next('Invalid email specified');
        break;
    }
    console.log(message);

    return throwError(error);
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
