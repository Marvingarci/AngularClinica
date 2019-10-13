export interface AntecedentesPersonales {
    id_antecedente_personal? : number;
    diabetes : string;
    observacion_diabetes? : string;
    tb_pulmonar : string;
    observacion_tb_pulmonar? : string;
    its : string;
    observacion_its? : string
    desnutricion : string;
    observacion_desnutricion?: string;
    tipo_desnutricion?: string;
    enfermedades_mentales : string;
    observacion_enfermedades_mentales? : string;
    tipo_enfermedad_mental?: string;
    convulsiones : string;
    observacion_convulsiones? : string;
    alergias : string;
    observacion_alergias? : string;
    tipo_alergia?: string;
    cancer : string;
    observacion_cancer? : string;
    tipo_cancer?: string;
    hospitalarias_quirurgicas : string;
    fecha_antecedente_hospitalario: string;
    tratamiento: string;
    diagnostico: string;
    tiempo_hospitalizacion: string;
    observacion_hospitalarias_quirurgicas? : string;
    traumaticos : string;
    observacion_traumaticos? : string;
    otros? : string;
    observacion_otros? : string;
    id_paciente? : string;
    created_at? : string;
    updated_at? : string;
}
