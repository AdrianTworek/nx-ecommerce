import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from '@web/data-access';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  selector: 'nx-ecommerce-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.authService.currentUser.set(response);
      },
      error: () => {
        this.authService.currentUser.set(null);
      },
    });
  }
}
