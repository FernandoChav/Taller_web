import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAuthenticated: boolean = false; // Define si el usuario está logueado.
  userRole: string = ''; // Puede ser 'user' o 'admin'.
  private storageService = inject(LocalStorageService); // Servicio para manejar el almacenamiento local.

  constructor(private router: Router) {
    // Verifica si el usuario está logueado.
    if (this.storageService.getVar('token')) {
      this.isAuthenticated = true;
      this.userRole = this.storageService.getVar('role');
    }

  }
  profile(){ 
    this.router.navigate(['profile-user']);
  }

  log(){
    this.storageService.removeVar('token');
    this.storageService.removeVar('role');
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
  register(){
    this.storageService.removeVar('token');
    this.storageService.removeVar('role');
    this.isAuthenticated = false;
    this.router.navigate(['register']);
  }
  product(){
    this.router.navigate(['']);
  }
  user(){
    this.router.navigate(['user']);
  }
  shoppingCart(){
    this.router.navigate(['shopping-cart']);
  }
  logOut(){
    this.storageService.removeVar('token');
    this.storageService.removeVar('role');
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
