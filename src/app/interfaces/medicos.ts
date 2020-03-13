export interface Medicos {
    id_medico?:number;
    usuario: string;
    password : string;
    nombre : string;
    numero_identidad : string;
    especialidad : any;
    permisos?: boolean;
    created_at? : string;
    updated_at? : string;
}