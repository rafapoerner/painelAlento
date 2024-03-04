import { Component} from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NewUserService } from '../../services/new-user.service'
import { NewUser } from '../../models/newUser'
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule, ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {

  // variáveis para o registro
  userName: string = ''
  email: string = ''
  password: string = ''
  passwordConfirmation: string = ''
  fotoBase64: string = ''
  phone: string = ''
  profession: string = ''

  // variáveis para o nome do arquivo
  selectedImage: any | null = null
  imageName: string = ''

  constructor(private router: Router, private toastr: ToastrService, private newUserService: NewUserService) { }

  ngOnInit() { }

  // exibirToastr(): void {
  //   const toastrConfig = {
  //     positionClass: 'toast-top-center',
  //   };

  //   this.toastr.success('Usuário cadastrado com sucesso!', '', toastrConfig)
  // }


  register(): void {
    const newUser: NewUser = {
      userName: this.userName,
      email: this.email,
      phone: this.phone,
      profession: this.profession,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      fotoBase64: this.fotoBase64
    };

    this.newUserService.cadastrarUsuario(newUser).subscribe(
      (response) => {
        console.log('Resposta do serviço de cadastro:', response)
        if (response.id) {
          this.uploadImagem(response.id)
        } else {
          console.error('ID do usuário não está presente na resposta do serviço de cadastro.')
        }
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error)
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
    this.imageName = ''
  }

  shouldShowContainer(): boolean {
    return !!this.imageName
  }

}
