import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse,HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector,public snackbar: MatSnackBar) { }

   intercept(req,next){
     let authService = this.injector.get(AuthService);
   	let tokenizedReq = req.clone({
   		setHeaders: {
   			Authorization:`Bearer ${authService.getToken()}`
   		}
   	})
   	return next.handle(tokenizedReq).pipe(catchError((err, caught) => {
        //intercept the respons error and displace it to the console
        this.handleAuthError(err);
        return of(err);
      }) as any);
   }



   private handleAuthError(err: HttpErrorResponse): Observable<any> {
       if (err.status === 422 || err.status === 404 ) {
        if(err.error.message){
            this.snackbar.open(err.error.message, 'close')
         }
         else if (err.error.errors){
            this.snackbar.open(err.error.errors[0].msg, 'close')
         }
         return of(err.message);
       }
       throw err;
     }

}