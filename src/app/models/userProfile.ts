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
  Operacoes,
  Marketing,
  GenteGestao,
  BrazaPT
}

export const UserRoleMapping: { [key: string]: UserRole } = {
  'Admin': UserRole.Admin,
  'Diretor': UserRole.Diretor,
  'Head': UserRole.Head,
  'Consultor': UserRole.Consultor,
  'Supply': UserRole.Supply,
  'Qualidade': UserRole.Qualidade,
  'Operações': UserRole.Operacoes,
  'Marketing': UserRole.Marketing,
  'Gente & Gestão': UserRole.GenteGestao,
  'BrazaPT': UserRole.BrazaPT
};



