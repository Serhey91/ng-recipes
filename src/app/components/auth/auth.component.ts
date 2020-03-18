import { Component, OnDestroy, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IFirebaseAuthModel } from 'src/app/models/auth.model';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean;
  isLoading: boolean;
  // authError: string = null;
  private authSubs: Subscription;
  private closeAlertSubj: Subscription;
  @ViewChild(PlaceholderDirective, {static: true}) alertHost: PlaceholderDirective;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactory: ComponentFactoryResolver
  ) {
    this.isLoginMode = false;
    this.isLoading = false;
  }

  onSwitchMode() {
    // this.authError = null;
    this.isLoginMode = !this.isLoginMode;
  }

  authString(flag: boolean) {
    return flag ? this.isLoginMode ? 'Sign up' : 'Login' : this.isLoginMode ? 'Login' : 'Sign up'
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    // this.authError = null;
    if (!form.valid) {
      return;
    }

    const params = {
      email: form.value.email,
      password: form.value.password
    }

    let authObservable: Observable<IFirebaseAuthModel>;
    authObservable = this.isLoginMode ? this.authService.login(params) : this.authService.signup(params);

    this.authSubs = authObservable.subscribe((response: IFirebaseAuthModel) => {
      form.reset();
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, (errorMessage: string) => {
      // this.authError = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    })
  }

  onHandleError() {
    // this.authError = null;
  }

  ngOnDestroy() {
    if (this.authSubs) this.authSubs.unsubscribe();
    if (this.closeAlertSubj) this.closeAlertSubj.unsubscribe();
  }

  // programmatic component
  private showErrorAlert(msg: string) {
    const alertCompFactory = this.componentFactory.resolveComponentFactory(AlertComponent);
    this.alertHost.viewContainerRef.clear();

    const componentRef = this.alertHost.viewContainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = msg;
    this.closeAlertSubj = componentRef.instance.closeAlert.subscribe(() => {
      this.closeAlertSubj.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    })
  }
}
