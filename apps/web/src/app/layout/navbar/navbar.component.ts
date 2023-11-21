import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterModule } from '@angular/router';
import { AuthService } from '@web/data-access';

@Component({
  selector: 'nx-ecommerce-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HlmButtonDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout() {
    localStorage.setItem('accessToken', '');
    this.authService.currentUser.set(null);
  }
}
