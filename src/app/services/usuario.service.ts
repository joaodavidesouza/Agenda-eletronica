import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://api-users-gdsb.onrender.com';

  constructor(private http: HttpClient) {}

  register(usuario: Usuario): Observable<Usuario> {
    const payload = {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      role: usuario.nivelAcesso === 'admin' ? 'adm' : 'user'
    };

    return this.http.post<Usuario>(`${this.apiUrl}/register`, payload);
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/users`);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/users/${id}`);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    const payload = {
      name: usuario.nome,
      email: usuario.email,
      role: usuario.nivelAcesso === 'admin' ? 'adm' : 'user'
    };
    return this.http.put<Usuario>(`${this.apiUrl}/users/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}