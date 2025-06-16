export type ActivityType = 
  | 'login' 
  | 'onboarding_paso'
  | 'bloque_creado' 
  | 'bloque_completado' 
  | 'reto_dia_avanzado' 
  | 'vinculo_social_creado'
  | 'plantilla_aplicada';

export interface ActivityRecord {
  id_actividad: string; // Unique ID for the activity log
  id_usuario: string; // UserLefi ID
  tipo_actividad: ActivityType;
  fecha_hora: Date; // Firestore Timestamp
  detalle?: Record<string, any>; // JSON object for additional details, e.g., { bloque_id: "xyz", paso_onboarding: 3 }
  // Other fields like IP address (with privacy considerations), device type, etc.
}
