import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="signin-container">
      <h2>Registrar Usuário</h2>
      <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input type="text" formControlName="nome" placeholder="Nome" required>
          <div *ngIf="signinForm.get('nome')?.invalid && signinForm.get('nome')?.touched" class="error-message">
            Nome é obrigatório e deve ter pelo menos 3 caracteres
          </div>
        </div>
        <div class="form-group">
          <input type="email" formControlName="email" placeholder="Email" required>
          <div *ngIf="signinForm.get('email')?.invalid && signinForm.get('email')?.touched" class="error-message">
            Email inválido
          </div>
        </div>
        <div class="form-group">
          <input type="password" formControlName="senha" placeholder="Senha" required>
          <div *ngIf="signinForm.get('senha')?.invalid && signinForm.get('senha')?.touched" class="error-message">
            Senha é obrigatória e deve ter pelo menos 6 caracteres
          </div>
        </div>
        <div class="form-group">
          <select formControlName="nivelAcesso">
            <option value="usuario">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" [disabled]="signinForm.invalid">Registrar</button>
      </form>
      
      <div *ngIf="errorMessage" class="global-error-message">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .signin-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form-group {
      width: 100%;
      margin-bottom: 15px;
      position: relative;
    }
    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error-message {
      color: red;
      font-size: 0.8em;
      margin-top: 5px;
    }
    .global-error-message {
      color: red;
      margin-top: 10px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      nome: ['', [
        Validators.required, 
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      senha: ['', [
        Validators.required, 
        Validators.minLength(6)
      ]],
      nivelAcesso: ['usuario', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signinForm.valid) {
      const novoUsuario: Usuario = this.signinForm.value;
      
      // Explicitly type the observable and use the typed error
      this.usuarioService.register(novoUsuario).subscribe({
        next: (response: Usuario) => {
          console.log('Usuário registrado com sucesso:', response);
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro no registro:', err);
          this.errorMessage = err.error?.message || 'Erro ao registrar usuário';
        }
      });
    }
  }
}