export interface SocialLink {
  id_vinculo: string; // Unique ID for the link
  usuario_1_id: string; // UserLefi ID
  usuario_2_id: string; // UserLefi ID
  nivel_amistad: number; // e.g., 1, 2, 3...
  bloques_compartidos_ids?: string[]; // Array of BlockTemplate IDs shared between users
  estado: 'pendiente' | 'aceptado' | 'bloqueado';
  // Other fields like shared goals, messages, etc.
  createdAt: Date;
  updatedAt: Date;
}
