import { Component, OnDestroy, ComponentFactoryResolver, ViewChild, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { LoginStartAction, SignupStartAction } from './store/auth.actions';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean;
  isLoading: boolean;
  private closeAlertSubj: Subscription;
  @ViewChild(PlaceholderDirective, {static: true}) alertHost: PlaceholderDirective;
  constructor(
    private componentFactory: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {
    this.isLoginMode = false;
    this.isLoading = false;
  }

  ngOnInit() {
    this.store.select('auth').subscribe(({isLoading, authError}) => {
      this.isLoading = isLoading;
      if (authError) {
        this.showErrorAlert(authError);
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  authString(flag: boolean) {
    return flag ? this.isLoginMode ? 'Sign up' : 'Login' : this.isLoginMode ? 'Login' : 'Sign up'
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const params = {
      email: form.value.email,
      password: form.value.password
    }

    this.isLoginMode ? this.store.dispatch(new LoginStartAction(params)) : this.store.dispatch(new SignupStartAction(params));
  }

  ngOnDestroy() {
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
