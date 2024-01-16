import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import {MatTabsModule} from '@angular/material/tabs';
import {Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTabsModule, RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  constructor(private router: Router) { }

  links = ['upload', 'gallery', 'about'];
  activeLink = this.links[0];

}
