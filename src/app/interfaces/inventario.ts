export interface Inventario{
    id_inventario?: number,
    unidad: number,
    nombre: string,
    descripcion: string,
    //fecha_vencimiento: Date,
    presentacion: string,
    observacion: string,
    created_at? : string;
    updated_at? : string;
}