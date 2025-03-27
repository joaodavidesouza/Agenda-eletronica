import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api-users-gdsb.onrender.com';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password: senha }).pipe(
      tap((response: any) => {
        // Salva o token
        localStorage.setItem('token', response.token);

        // Verifica se 'user' existe na resposta; se não, extrai do token ou usa um padrão
        let userData = response.user;
        if (!userData && response.token) {
          // Decodifica o token JWT para obter os dados do usuário
          const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
          userData = {
            id: tokenPayload.id,
            role: tokenPayload.role,
            username: tokenPayload.username
          };
        }
        localStorage.setItem('user', JSON.stringify(userData || {}));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.role === 'adm' || user.role === 'admin'; // Suporte a 'adm' ou 'admin'
    } catch (e) {
      console.error('Erro ao parsear user do localStorage:', e);
      return false; // Retorna false se os dados forem inválidos
    }
  }

  getCurrentUser(): any {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      console.error('Erro ao obter usuário do localStorage:', e);
      return {};
    }
  }
}