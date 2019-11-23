export interface Paciente {
    id_paciente: number;
    numero_paciente?: string;
    contrasenia?: string;
    nombre_completo: string;
    numero_cuenta: string;
    numero_identidad: string;
    imagen?: string;
    lugar_procedencia: string;
    direccion: string;
    carrera: string;
    fecha_nacimiento: Date;
    sexo: string;
    estado_civil: string;
    seguro_medico?: string;
    numero_telefono: string;
    emergencia_telefono: string;
    emergencia_persona: string;
    peso?: string;
    talla?: string;
    imc?: string;
    temperatura?: string;
    presion?: string;
    pulso?: string;
    categoria?:string;
    created_at?:string;
    updated_at?:string;
}
