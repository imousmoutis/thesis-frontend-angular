import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(public router: Router, private snackBar: MatSnackBar, private translateService: TranslateService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.snackBar.open(this.translateService.instant('genericError'), this.translateService.instant('close'), {
          panelClass: ['error-snackbar']
        });
        return throwError(error.message);
      })
    );
  }
}
