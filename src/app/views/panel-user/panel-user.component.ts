import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core'
import { PanelUserService } from '../../services/panel-user.service'
import { CommonModule } from '@angular/common'
import { DeleteUserService } from '../../services/delete-user.service'
import { ToastrService } from 'ngx-toastr'
import { GoogleApiService } from '../../utils/google-peopple.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms'
import { UserProfile } from '../../models/userProfile'
import { UpdateUserService } from '../../services/update-user'
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-panel-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './panel-user.component.html',
  styleUrl: './panel-user.component.scss',
})
export class PanelUserComponent {

  // variáveis para o registro
  id: string = ''
  email: string = ''
  password: string = ''
  passwordConfirmation: string = ''
  fotoBase64: string = ''
  phone: string = ''
  profession: string = ''

  modalRef?: BsModalRef
  template: any
  selectedUser: any = {}

  usuarios: any[] = [];
  userName: string | null = null
  userToken: any | null = null

  isLoggedIn: boolean = false
  userEmail: string | null = null
  isAdmin: boolean = false

  // variáveis para o nome do arquivo
  selectedImage: any | null = null
  imageName: string = ''

  constructor(private panelUserService: PanelUserService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
    private toastr: ToastrService,
    private googleApiService: GoogleApiService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      const userString = sessionStorage.getItem('user')
  
      if (userString) {
        const user = JSON.parse(userString);
  
        const userEmail = user.userToken?.email || ''
        const isAdmin = this.checkIfUserIsAdmin(userEmail)
  
        this.panelUserService.getUserByEmail(userEmail).subscribe(
          (userData) => {
            const loggedInUser = userData.find((u: { email: string }) => u.email === userEmail);
            if (loggedInUser && loggedInUser.userName) {
              this.userName = loggedInUser.userName
              this.userToken = loggedInUser
              this.panelUserService.saveUserToLocalStorage({
                ...user,
                userName: loggedInUser.userName
              })
            }
          },
          (error) => {
            console.error('Erro ao carregar dados do usuário:', error);
          }
        );
        this.userEmail = userEmail
        this.isLoggedIn = true
        this.isAdmin = isAdmin
      }
    }
  }
  
  ngAfterViewInit(): void {
    this.carregarUsuarios();
  }
  

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  carregarUsuarios() {
    this.panelUserService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        this.cdr.detectChanges(); // Forçar detecção de alterações após a atualização dos usuários
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error)
      }
    );
  }

  obterFotoPerfil(email: string): void {
    this.googleApiService.getProfilePicture(email).subscribe((response: any) => {
      const photoUrl = response.photos?.[0]?.url
      this.atualizarUrlFoto(email, photoUrl)
    })
  }

  atualizarUrlFoto(email: string, photoUrl: string): void {
    const usuario = this.usuarios.find(u => u.email === email)
    if (usuario) {
      usuario.photoUrl = photoUrl
    }
  }

  editUser(template: TemplateRef<any>, user: UserProfile): void {
    this.email = user.email || '';
    this.phone = user.phone || '';
    this.profession = user.profession || '';

    // Abra o modal
    this.openModal(template);
  }


  updateUserProfile(): void {

    const updatedUser: UserProfile = {
      email: this.email,
      profession: this.profession,
      fotoBase64: this.fotoBase64
    };
    
    this.updateUserService.updateUser(updatedUser).subscribe(
      (response) => {
        console.log('Resposta do serviço de atualização de perfil:', response);

        this.modalRef?.hide();
      },
      (error) => {
        console.error('Erro ao atualizar perfil:', error);
      }
    );
  }


  openEditModal(usuario: any): void {
    this.selectedUser = { ...usuario };
    this.modalRef = this.modalService.show(this.template, { class: 'modal-lg' });
  }


  deleteUser(id: string): void {
    this.deleteUserService.userDelete(id).subscribe(
      () => {
        console.log('Usuário deletado com sucesso.')
        this.toastr.success('Usuário deletado com sucesso!');
        this.usuarios = this.usuarios.filter(user => user.id !== id)
      },
      (error) => {
        console.error('Erro ao deletar usuário:', error)
        this.toastr.error('Usuário não deletado')
      }
    )
  }

  checkIfUserIsAdmin(email: string): boolean {
    const adminEmails = ['marcelotheo@grupoalento.com.br', 'rafaelcoutinho@grupoalento.com.br'];
    return adminEmails.includes(email);
  }

  handleImageSelection(event: any): void {
    const fileInput = event.target

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0]
      this.imageName = selectedFile.name
    }
  }

  onFileSelected(event: any): void {
    const fileInput = event.target

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
    console.log("Imagem selecionada:", this.selectedImage)

    this.handleImageSelection(event)
  }

  shouldShowContainer(): boolean {
    return !!this.imageName
  }

  deleteImage(): void {
    this.imageName = ''
  }

}
