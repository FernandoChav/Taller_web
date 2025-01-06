import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../user/service/session.service';

/**
 * This componet represent the main navbar
 */

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  /**
   * A boolean that show is a user is authenticated
   */
  isAuthenticated: boolean = false; // Define si el usuario está logueado.

  /**
   * The name user role
   */

  userRole: string = ''; // Puede ser 'user' o 'admin'.

  /**
   * The storage service
   */

  private storageService = inject(LocalStorageService); // Servicio para manejar el almacenamiento local.

  constructor(private router: Router,
    private sessionService : SessionService
  ) {
    // Verifica si el usuario está logueado.
    if (this.storageService.getVar('token')) {
      this.isAuthenticated = true;
      this.userRole = this.storageService.getVar('role');
    }

  }

  /**
   * This method go to profile page
   */

  profile(){ 
    this.router.navigate(['profile']);
  }

  /**
   * This method is called when is user logout, and delete all data
   */

  log(){
    this.storageService.removeVar('token');
    this.storageService.removeVar('role');
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }

  /**
   * This method is called when user is access to register
   */

  register(){
    this.storageService.removeVar('token');
    this.storageService.removeVar('role');
    this.isAuthenticated = false;
    this.router.navigate(['register']);
  }

  product(){
    this.router.navigate(['']);
  }

  /**
   * This method is called when user is access to user section
   */

  user(){
    this.router.navigate(['user']);
  }

  /**
   * This method is called when user is access to shopping cart section
   */

  shoppingCart(){
    this.router.navigate(['shopping-cart']);
  }

  /**
   * This method is called when is user logout, and delete all data
   */

  logOut(){
    this.storageService.removeVar('token');
    this.storageService.removeVar('role');
    this.isAuthenticated = false;
    this.sessionService.delete();
    this.router.navigate(['login']);
  }

  /**
   * This method is called when user is access to product admin section
   */

  goToProductAdmin() {
    this.router.navigate(['product-admin']);
  }

}
