import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  private _previewed: boolean = true
  private _upload: any

  uploadChanged(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.createImageFromBlob(fileInputEvent.target.files[0])
    this._previewed = true
    
  }

  removeUpload(){
    this._previewed = false
    this._upload = undefined
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

  saveUpload(){
    
  }



  get previewed(): boolean{
    return this._previewed
  }
  get upload(): any {
    return this._upload
  }

}
