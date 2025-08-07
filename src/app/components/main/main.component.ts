import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  isMenuActive = false;

  openMenu(isMenuActive: boolean) {
    this.isMenuActive = isMenuActive; // Update menu active state
  }

  closeMenu(isMenuActive: boolean) {
    this.isMenuActive = isMenuActive; // Update menu active state
  }


}
