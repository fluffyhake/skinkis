import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IReturnImage, IUploadData } from './upload.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UploadService {

  constructor(private http: HttpClient) { }

  addImage(data: Blob): Observable<IReturnImage> {
        let formData = new FormData();
        formData.append('images', data);
        return this.http.post<IReturnImage>(environment.apiUrl + "api/images/upload", data)
        .pipe(
          catchError(this.handleError)
        );
  }

   // source https://angular.io/guide/http-handle-request-errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}