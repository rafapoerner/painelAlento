import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewUserService } from '../../services/new-user.service';
import { NewUser } from '../../models/newUser';
import { ToastrService } from 'ngx-toastr';
import { UserRole, UserRoleMapping } from '../../models/userProfile';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {
  userName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  phone: string = '';
  cargo: string | null = null;

  selectedImage: any | null = null;
  fotoBase64: string = ''
  imageName: string = ''

  userRoles = UserRole;
  userRoleKeys = Object.keys(UserRoleMapping);

  constructor(private router: Router, private toastr: ToastrService, private newUserService: NewUserService) { }

  ngOnInit() { }

  register(): void {
    const newUser = {
      userName: this.userName,
      email: this.email,
      phone: this.phone,
      cargo: UserRoleMapping[this.cargo!] || UserRole.Consultor,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      fotoBase64: this.imageName
    };
    console.log('Resposta do serviço de cadastro:', newUser);

    this.newUserService.cadastrarUsuario(newUser).subscribe(
      (response: any) => {
        if (response.id) {
          this.uploadImagem(response.id); // Envie o ID do usuário para associar a imagem
        } else {
          console.error('ID do usuário não está presente na resposta do serviço de cadastro.');
        }
      },
      (error: any) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );
  }

  uploadImagem(userId: string): void {
    if (!this.selectedImage) {
      console.error('Nenhuma imagem selecionada.')
      return
    }
  
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('files', this.selectedImage)
    // formData.append('imageName', this.imageName)  // Envia o nome da imagem
  
    this.newUserService.uploadImage(formData).subscribe(
      (imageResponse) => {
        console.log('Resposta do serviço de upload de imagem:', imageResponse)
  
        this.toastr.success('Usuário cadastrado com sucesso')
        this.router.navigate(['/panel-user'])
      },
      (error) => {
        console.error('Erro ao fazer upload de imagem:', error)
      }
    )
  }
  
  

  onFileSelected(event: any): void {
    const fileInput = event.target

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
    console.log("Imagem selecionada:", this.selectedImage)

    this.handleImageSelection(event)
  }

  handleImageSelection(event: any): void {
    const fileInput = event.target

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0]
      this.imageName = selectedFile.name
    }
  }

  deleteImage(): void {
    this.selectedImage = null;
    this.imageName = '';
  }

  shouldShowContainer(): boolean {
    return !!this.imageName;
  }
}
