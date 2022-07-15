export class ListaSolapas {
    url: string;
    nombre: string;
    activo: boolean;
    constructor(url:string,nombre:string,activo:boolean) {
        this.url=url;
        this.nombre=nombre;
        this.activo=activo;
    }
}