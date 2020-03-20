import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/components/store/app.reducer';

@Injectable()
export class AuthInterseptorService implements HttpInterceptor {
  constructor(
    private store: Store<AppState>
    ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      exhaustMap(({user}) => {
        if (!user) {
          return next.handle(req);
        }
        const request = req.clone({params: new HttpParams().set('auth', user.token)});
        return next.handle(request);
      })
    )
  }
}
