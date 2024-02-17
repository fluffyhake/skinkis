import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { catchError, throwError } from 'rxjs';
import { IReturnImage } from './upload.interfaces';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  constructor(private http: HttpClient) {

  }
  private _previewed: boolean = true
  private _upload: any
  private _uploadName: string = ""
  private _blob: Blob = new Blob
  private _saved: boolean = false
  private _savedUrl: string = ""

  uploadChanged(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this._uploadName = fileInputEvent.target.files[0].name
    this.createImageFromBlob(fileInputEvent.target.files[0])
    this._blob = fileInputEvent.target.files[0]
    this._previewed = true
    
  }

  removeUpload(){
    this._previewed = false
    this._upload = undefined
    this._blob = new Blob

  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this._upload = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
   }
  }
  goAgain(){
    this._saved = false
    this._savedUrl = ""
    this._previewed = false
    this._upload = undefined
    this._blob = new Blob

  }

  saveUpload(){
      let formData = new FormData();
      formData.append('images', this._blob);
      console.log(formData)
      // TODO fix return type!!! Look at IReturnImage
      // TODO read http path from uri
      return this.http.post<any>(environment.apiUrl  + "upload", formData)
      .pipe(
        catchError(this.handleError)
      ).subscribe(response => {
        console.log(response)
        console.log(response['creationStatus'] )
          let creationStatus = response['creationStatus']
          if(creationStatus.saved = true){
            this._saved = true
            // TODO read from env! 
            this._savedUrl = environment.apiUrl + creationStatus[this._uploadName].image.imagePath
          }
        
       
        

      });
}  
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


  get previewed(): boolean{
    return this._previewed
  }
  get upload(): any {
    return this._upload
  }
  get saved(): boolean{
    return this._saved
  }
  get savedUrl(): string{
    return this._savedUrl
  }
}
