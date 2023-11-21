import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICurrentUser } from '@shared/domain';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  currentUser = signal<ICurrentUser | undefined | null>(undefined);

  getProfile(): Observable<ICurrentUser> {
    return this.http.get<ICurrentUser>('/api/users/profile');
  }

  register(registerData: {
    email: string;
    password: string;
  }): Observable<{ id: string; email: string }> {
    return this.http.post<{ id: string; email: string }>(
      `/api/users/register`,
      registerData,
    );
  }

  login(loginData: {
    email: string;
    password: string;
  }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `/api/users/login`,
      loginData,
    );
  }
}
