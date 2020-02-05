export interface Login {
    id_login? : number;
    cuenta : string;
    password : string;
    nombre?: string;
    carrera? : string;
    centro? : string;
    numero_identidad?: string;
    imagen?: string;
    created_at? : string;
    updated_at? : string;
}