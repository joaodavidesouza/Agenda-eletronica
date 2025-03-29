import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;
  registrationSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmSenha: ['', [Validators.required]]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  // Validador personalizado para confirmar senha
  passwordMatchValidator(form: FormGroup) {
    const senha = form.get('senha')?.value;
    const confirmSenha = form.get('confirmSenha')?.value;
    
    if (senha !== confirmSenha) {
      form.get('confirmSenha')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const adminUser: Usuario = {
      nome: this.registerForm.value.nome,
      email: this.registerForm.value.email,
      senha: this.registerForm.value.senha,
      nivelAcesso: 'admin'
    };

    this.usuarioService.register(adminUser).subscribe({
      next: () => {
        this.registrationSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 409) {
          this.errorMessage = 'Este email já está cadastrado.';
        } else {
          this.errorMessage = 'Erro ao registrar. Por favor, tente novamente.';
        }
        console.error('Erro no registro:', error);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}