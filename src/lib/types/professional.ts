import type { BlockTemplate } from './block';

export interface ProfessionalCompanyTemplate {
  id_empresa_plantilla: string; // Unique ID for this company's template entry
  nombre_empresa: string;
  sector: string; // e.g., "Salud", "Retail", "Tecnología"
  plantillas_horario: BlockTemplate[]; // Array of block templates relevant to this company/sector
  jefes_autorizados_ids?: string[]; // Array of UserLefi IDs who can manage these templates
  tipo_turno?: string; // e.g., "Mañana", "Tarde", "Nocturno", "Rotativo"
  descripcion?: string;
  visible_para_empresa: boolean; // Is this template visible to all employees of the company?
  // Other fields like company logo, contact info, etc.
  createdAt: Date;
  updatedAt: Date;
}
