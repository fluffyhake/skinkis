import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { environment } from '../../environments/environment';

interface AllImagesResponse{
  images: string[]
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit{
  private _isLoading = true
  private _imageArr = new Array

  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    this.http.get<AllImagesResponse>(environment.apiUrl + "upload/🐦‍⬛🐦‍⬛🐦‍⬛").subscribe(response => {
      for(let entry of response["images"]){
        this._imageArr.push(environment.apiUrl + entry)

      }
    })
    
    this._isLoading = false
  }
  get isLoading(): boolean {
    return this._isLoading
  }
  get imageArr(): ImageBitmap[]{
    return this._imageArr
  }
}

