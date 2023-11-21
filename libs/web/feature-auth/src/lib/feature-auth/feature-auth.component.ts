import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { AuthService } from '@web/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'nx-ecommerce-feature-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmInputDirective,
    HlmButtonDirective,
    HlmLabelDirective,
  ],
  templateUrl: './feature-auth.component.html',
})
export class FeatureAuthComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly authService = inject(AuthService);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isSignup = signal(true);
  isSubmitted = signal(false);

  toggleForm() {
    this.isSignup.update((prevIsSignup) => !prevIsSignup);
  }

  onSubmit() {
    this.isSubmitted.set(true);

    if (this.isSignup()) {
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        // Switch to login form
        next: () => {
          this.isSubmitted.set(false);
          this.isSignup.set(false);
        },
      });
    } else {
      this.authService
        .login(this.loginForm.getRawValue())
        .subscribe((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          this.authService.getProfile().subscribe((response) => {
            this.authService.currentUser.set(response);
          });
          this.router.navigateByUrl('/');
        });
    }
  }
}
