export type BlockTier = 1 | 2 | 3 | 4; // Tier 1 (innegociables), Tier 2 (responsabilidades), Tier 3 (mejora), Tier 4 (ocio)
export type BlockState = 'pendiente' | 'completado' | 'cancelado'; // Or other relevant states

export interface IndividualBlock {
  id_bloque: string; // Unique ID for the block
  id_usuario: string; // Foreign key to UserLefi
  nombre_bloque: string;
  tier: BlockTier;
  hora_inicio: string; // ISO 8601 DateTime string or Firestore Timestamp
  hora_fin: string; // ISO 8601 DateTime string or Firestore Timestamp
  fecha: string; // YYYY-MM-DD to specify the day of the block
  obligatorio?: boolean; // Is this block mandatory?
  fuente?: string; // e.g., "manual", "plantilla_X", "trabajo"
  estado: BlockState;
  descripcion?: string;
  color?: string; // Optional color coding for the block
  // Other fields like recurrence, notifications, etc.
  createdAt: Date;
  updatedAt: Date;
}

export interface BlockStructure {
  nombre_bloque: string;
  duracion_minutos: number; // Duration in minutes
  tier: BlockTier;
  offset_minutos_desde_inicio_plantilla?: number; // For positioning within a template day
  // Other template-specific block properties
}

export interface BlockTemplate {
  id_plantilla: string;
  nombre_plantilla: string;
  creada_por: string; // User ID or "sistema" or empresa ID
  tipo: 'diaria' | 'semanal' | 'profesional' | 'social_compartida';
  estructura_bloques: BlockStructure[]; // Array of block structures
  visible: 'publica' | 'privada' | 'compartida'; // Visibility of the template
  descripcion?: string;
  createdAt: Date;
  updatedAt: Date;
}
