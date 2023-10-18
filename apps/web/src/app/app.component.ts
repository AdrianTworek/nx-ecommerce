import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';

@Component({
  standalone: true,
  imports: [RouterModule, HlmButtonModule],
  providers: [HttpClient],
  selector: 'nx-ecommerce-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  result = '';

  ngOnInit(): void {
    this.getApi();
  }

  getApi() {
    return this.http.get<{ message: string }>('/api').subscribe((response) => {
      this.result = response.message;
    });
  }
}
