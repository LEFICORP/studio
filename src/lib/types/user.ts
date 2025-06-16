export interface UserLefi {
  id_usuario: string; // Firebase Auth UID
  nombre?: string;
  email: string; // Firebase Auth email
  codigo_unico_usuario: string; // Generated unique code for social linking
  modo_de_uso?: 'comando' | 'productivo' | 'ligero' | 'casual';
  hora_dormir?: string; // e.g., "22:00"
  trabaja_esta_semana?: boolean;
  idioma?: string; // e.g., "es", "en"
  onboarding_completed: boolean;
  reto_dia_actual?: number;
  // Other fields as needed
  createdAt: Date;
  updatedAt: Date;
}
