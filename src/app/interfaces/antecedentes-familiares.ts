export interface AntecedentesFamiliares {
    
    id_antecedente_familiar? : number;
    diabetes : string;
    parentesco_diabetes? : string;
    tb_pulmonar : string;
    parentesco_tb_pulmonar? : string;
    desnutricion : string;
    parentesco_desnutricion? : string;
    tipo_desnutricion?: string;
    enfermedades_mentales : string;
    parentesco_enfermedades_mentales? : string;
    tipo_enfermedad_mental?: string;
    convulsiones : string;
    parentesco_convulsiones? : string;
    alcoholismo_sustancias_psicoactivas : string;
    parentesco_alcoholismo_sustancias_psicoactivas? : string;
    alergias : string;
    parentesco_alergias? : string;
    tipo_alergia?: string;
    cancer : string;
    parentesco_cancer? : string;
    tipo_cancer?: string;
    hipertension_arterial: string;
    parentesco_hipertension_arterial?: string;
    otros : string;
    parentesco_otros? : string;
    id_paciente? : number;
    created_at? : string;
    updated_at? : string;
}
