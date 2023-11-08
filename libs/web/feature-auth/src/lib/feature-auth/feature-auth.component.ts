import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'nx-ecommerce-feature-auth',
  standalone: true,
  imports: [
    CommonModule,
    HlmInputDirective,
    HlmButtonDirective,
    HlmLabelDirective,
  ],
  templateUrl: './feature-auth.component.html',
})
export class FeatureAuthComponent {
  isSignup = signal(true);

  toggleForm() {
    this.isSignup.update(() => !this.isSignup());
  }
}
