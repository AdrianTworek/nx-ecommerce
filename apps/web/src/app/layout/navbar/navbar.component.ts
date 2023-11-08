import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'nx-ecommerce-navbar',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
