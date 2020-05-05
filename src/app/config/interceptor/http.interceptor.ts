import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(public router: Router, private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.snackBar.open('An error occurred while serving your request. Please try again or contact your administrator.', 'Close', {
          panelClass: ['error-snackbar']
        });
        return throwError(error.message);
      })
    );
  }
}
