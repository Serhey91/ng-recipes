import { Component, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IFirebaseAuthModel } from 'src/app/models/auth.model';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean;
  isLoading: boolean;
  authError: string = null;
  private auth$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoginMode = false;
    this.isLoading = false;
  }

  onSwitchMode() {
    this.authError = null;
    this.isLoginMode = !this.isLoginMode;
  }

  authString(flag: boolean) {
    return flag ? this.isLoginMode ? 'Sign up' : 'Login' : this.isLoginMode ? 'Login' : 'Sign up'
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.authError = null;
    if (!form.valid) {
      return;
    }

    const params = {
      email: form.value.email,
      password: form.value.password
    }

    let authObservable: Observable<IFirebaseAuthModel>;
    authObservable = this.isLoginMode ? this.authService.login(params) : this.authService.signup(params);

    this.auth$ = authObservable.subscribe((response: IFirebaseAuthModel) => {
      form.reset();
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, (errorMessage: string) => {
      this.authError = errorMessage;
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    if (this.auth$) this.auth$.unsubscribe();
  }
}
