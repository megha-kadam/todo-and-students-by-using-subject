import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loader : LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   this.loader.loaderEmitter(true)
    let reqClone = request.clone({
      setHeaders : {
        'Auth' : 'Token from LS',
        'Content-Type' : 'application/json'
      }
    })
    return next.handle(reqClone)
          .pipe(
            finalize(() => {
               this.loader.loaderEmitter(false)
            })
          )
  }
}
