import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: 'upload', pathMatch: 'full' }, //default route
    { path: 'upload', component: UploadComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'about', component: AboutComponent },
];