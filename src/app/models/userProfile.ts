export interface UserProfile {
  id?: string;
  userName?: string;
  email: string;
  phone?: string;
  cargo?: number; 
  fotoBase64?: string;
  powerBILinks?: string[];
  linkToImageMap?: Record<string, string>;
}

export interface PowerBILinks {
  url: string;
  cargo: UserRole;
}

export enum UserRole {
  Admin = 1,
  Diretor,
  Head,
  Consultor,
  Supply,
  Qualidade,
  Delivery,
  Marketing,
  GenteGestao,
  BrazaPT,
  BrazaStore,
  LojasBTG
}

export const UserRoleMapping: { [key: string]: UserRole } = {
  'Admin': UserRole.Admin,
  'Diretor': UserRole.Diretor,
  'Head': UserRole.Head,
  'Consultor': UserRole.Consultor,
  'Supply': UserRole.Supply,
  'Qualidade': UserRole.Qualidade,
  'Delivery': UserRole.Delivery,
  'Marketing': UserRole.Marketing,
  'Gente & Gestão': UserRole.GenteGestao,
  'Braza PT': UserRole.BrazaPT,
  'Braza Store': UserRole.BrazaStore,
  'Lojas BTG': UserRole.LojasBTG
};



