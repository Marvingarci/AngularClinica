export interface Login {
    id_login? : number;
    cuenta : string;
    clave : string;
    nombre?: string;
    carrera? : string;
    centro? : string;
    indice_global? : string;
    indice_periodo? : string;  
    created_at? : string;
    updated_at? : string;
}