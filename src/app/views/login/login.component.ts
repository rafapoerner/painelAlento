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
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userAuthService: UserLoginService
  ) {}

  ngOnInit(): void {}

  login(): void {
    const email = this.email;
    const password = this.password;

    //spinner
    this.isLoading = true;

    this.userAuthService.login({ email, password }).subscribe(
      (response) => {
        sessionStorage.setItem('user', JSON.stringify(response.email));
        this.toastr.success('Usuário logado com sucesso!', '', {
          positionClass: 'toast-top-center',
          timeOut: 2000, // Duration in milliseconds (2 seconds)
          easeTime: 300, // Animation duration in milliseconds (0.3 seconds)
          closeButton: true // Show close button
        });
        this.router.navigate(['/dashboard']);
        this.isLoading = false; 
      },
      (error) => {
        console.error('Erro ao autenticar usuário:', error);
        if (error && error.error && error.error.errors) {
          console.error('Mensagens de erro:', error.error.errors);
          this.toastr.error('Credenciais inválidas');
        } else {
          this.toastr.error('Ocorreu um erro durante a autenticação');
        }
        this.isLoading = false;
      }
    );
  }
}
