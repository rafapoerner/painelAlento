import { ChangeDetectorRef, Component, TemplateRef, OnInit } from '@angular/core';
import { PanelUserService } from '../../services/panel-user.service';
import { CommonModule } from '@angular/common';
import { DeleteUserService } from '../../services/delete-user.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { UserProfile, UserRole, UserRoleMapping } from '../../models/userProfile';
import { UpdateUserService } from '../../services/update-user';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { TopMenuComponent } from '../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-panel-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, TopMenuComponent],
  templateUrl: './panel-user.component.html',
  styleUrls: ['./panel-user.component.scss'],
})
export class PanelUserComponent implements OnInit {

  id: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  fotoBase64: string = '';
  phone: string = '';
  cargo: UserRole | null = null;
  userName: string = '';

  userRoles = UserRole;
  userRoleKeys = Object.keys(UserRoleMapping);

  modalRef?: BsModalRef;
  template: any;
  selectedUser: { id?: string; email?: string; cargo: UserRole | null; userName?: string } = { cargo: null };

  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  userToken: any | null = null;

  isLoggedIn: boolean = false;
  userEmail: string | null = null;
  isAdmin: boolean = false;

  selectedImage: any | null = null;
  imageName: string = '';

  powerBILinks: { url: string, description: string, imageName: string }[] = [];

  constructor(
    private panelUserService: PanelUserService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadUsuarios();
  }

  ngAfterViewInit(): void {
    this.carregarUsuarios();
  }

  sidebarHidden = true; // Inicia o sidebar escondido

  carregarUsuarios() {
    this.panelUserService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        this.filteredUsuarios = usuarios;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  toggleSidebar() {
    this.sidebarHidden = !this.sidebarHidden;
  }

  loadUserData(): void {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userEmail = userString.replace(/"/g, '');
      this.carregarUsuario(userEmail);
    }
  }

  carregarUsuario(userEmail: string): void {
    this.panelUserService.getUserByEmail(userEmail).subscribe(
      (usuario: any) => {
        if (usuario) {
          this.userName = usuario.userName;
          this.fotoBase64 = 'https://painelalentoapi.alentointeligencia.com.br/api/identity/image/' + usuario.fotoBase64;
        }
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }

  loadUsuarios(): void {
    const storedUsuarios = this.panelUserService.getStoredUsuarios();
    if (storedUsuarios.length > 0) {
      this.usuarios = storedUsuarios;
      this.filteredUsuarios = storedUsuarios;
    } else {
      this.panelUserService.fetchUsuariosFromServer().subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
          this.filteredUsuarios = usuarios;
          this.panelUserService.setUsuarios(usuarios);
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Erro ao carregar usuários:', error);
        }
      );
    }
  }

  getRoleLabel(roleNumber: UserRole): string {
    const entry = Object.entries(UserRoleMapping).find(([key, value]) => value === roleNumber);
    return entry ? entry[0] : 'Unknown';
  }

  getRoleOptions(): { label: string, value: UserRole | '' }[] {
    const roleOptions = Object.keys(UserRoleMapping).map(key => ({
      label: key,
      value: UserRoleMapping[key]
    }));
  
    roleOptions.unshift({ label: '', value: '' as any });
  
    return roleOptions;
  }

  openModal(template: TemplateRef<any>, user: any) {
    this.selectedUser = { ...user, cargo: user.cargo ?? null };
    this.modalRef = this.modalService.show(template);
  }

  filterUsersByRole(role: UserRole | ''): void {
    if (role === '') {
      this.filteredUsuarios = this.usuarios;
    } else {
      this.filteredUsuarios = this.usuarios.filter(usuario => usuario.cargo === role);
    }
  }

  updateUserProfile(): void {
    const updatedUser: UserProfile = {
      id: this.selectedUser.id!,
      email: this.selectedUser.email!,
      cargo: this.selectedUser.cargo!,
      userName: this.selectedUser.userName!,
    };

    if (updatedUser.id && typeof updatedUser.id === 'string') {
      this.updateUserService.updateUser(updatedUser.id, updatedUser).subscribe(
        (response) => {
          this.loadUsuarios(); // Recarregar a lista de usuários após a atualização
          this.modalRef?.hide();
          this.toastr.success('Usuário atualizado com sucesso!'); // Exibir mensagem de sucesso
        },
        (error) => {
          console.error('Erro ao atualizar perfil:', error);
          this.toastr.error('Erro ao atualizar perfil!'); // Exibir mensagem de erro
        }
      );
    } else {
      console.error('ID do usuário inválido:', updatedUser.id);
    }
  }

  updateUserPhoto(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      this.imageName = selectedFile.name;
      this.cdr.detectChanges();
    }
  }

  deleteUser(id: string): void {
    this.deleteUserService.userDelete(id).subscribe(
      () => {
        this.toastr.success('Usuário deletado com sucesso!');
        this.usuarios = this.usuarios.filter(user => user.id !== id);
        this.filteredUsuarios = this.filteredUsuarios.filter(user => user.id !== id);
      },
      (error) => {
        this.toastr.error('Erro ao deletar usuário!');
      }
    );
  }

  handleImageSelection(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      this.imageName = selectedFile.name;
    }
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }

    this.handleImageSelection(event);
  }

  shouldShowContainer(): boolean {
    return !!this.imageName;
  }

  deleteImage(): void {
    this.imageName = '';
  }
}
