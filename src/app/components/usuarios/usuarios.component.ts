import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="usuarios-container">
      <h2>Cadastro de Usuários</h2>
      <form [formGroup]="usuarioForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input type="text" formControlName="nome" placeholder="Nome" required>
        </div>
        <div class="form-group">
          <input type="email" formControlName="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <input type="password" formControlName="senha" placeholder="Senha" required>
        </div>
        <div class="form-group">
          <select formControlName="nivelAcesso">
            <option value="usuario">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" [disabled]="usuarioForm.invalid">Cadastrar</button>
      </form>
      
      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .usuarios-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .error-message {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class UsuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      nivelAcesso: ['usuario', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.usuarioForm.valid) {
      const usuario: Usuario = this.usuarioForm.value;
      
      // Use register instead of create
      this.usuarioService.register(usuario).subscribe({
        next: (response: Usuario) => {
          console.log('Usuário cadastrado:', response);
          this.usuarioForm.reset();
          this.errorMessage = '';
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro no cadastro:', err);
          this.errorMessage = err.error?.message || 'Erro ao cadastrar usuário';
        }
      });
    }
  }
}