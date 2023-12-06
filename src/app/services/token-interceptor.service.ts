import { Injectable, NgModule } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS, HttpResponse} from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('access_token') != null && localStorage.getItem('access_token')?.toString().trim() != null) {
      var token = localStorage.getItem('access_token');
      var tokenRequest = this.addTokenHeader(req, token);

      return next.handle(tokenRequest).pipe(tap((event: HttpEvent<any>) => {       
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
          console.info("Sucesso na operacao")
        }        
      }));
    } else {
      console.info("Erro com o token")
      return next.handle(req).pipe();
    }
  }


  private addTokenHeader(req: HttpRequest<any>, token: any) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
      withCredentials: true,
    });
  }
}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },],
})

export class HeaderInterceptorModule {

}