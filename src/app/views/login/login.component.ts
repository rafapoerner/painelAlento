import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserLoginService } from '../../services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = false; // Adicionando a variável isLoading

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userAuthService: UserLoginService
  ) {}

  ngOnInit(): void {}

  login(): void {
    const email = this.email;
    const password = this.password;

    this.isLoading = true; // Mostrar o spinner ao iniciar o login

    this.userAuthService.login({ email, password }).subscribe(
      (response) => {
        console.log('Resposta do serviço:', response);
        sessionStorage.setItem('user', JSON.stringify(response));
        this.toastr.success('Usuário logado com sucesso!');
        this.router.navigate(['/dashboard']);
        this.isLoading = false; // Esconder o spinner após o login com sucesso
      },
      (error) => {
        console.error('Erro ao autenticar usuário:', error);
        if (error && error.error && error.error.errors) {
          console.error('Mensagens de erro:', error.error.errors);
          this.toastr.error('Credenciais inválidas');
        } else {
          this.toastr.error('Ocorreu um erro durante a autenticação');
        }
        this.isLoading = false; // Esconder o spinner após erro no login
      }
    );
  }
}
