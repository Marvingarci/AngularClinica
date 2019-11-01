export interface Inventario{
    id_inventario?: number,
    cantidad: number,
    nombre: string,
    descripcion: string,
    fecha_vencimiento: Date,
    created_at? : string;
    updated_at? : string;
}