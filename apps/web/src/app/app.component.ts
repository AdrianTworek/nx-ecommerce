import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [RouterModule],
  providers: [HttpClient],
  selector: 'nx-ecommerce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
