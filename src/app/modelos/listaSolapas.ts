export class ListaSolapas {
    url: string;
    nombre: string;
    activo: boolean;
    clasesCss:string;
    constructor(url:string,nombre:string,activo:boolean,clasesCss:string) {
        this.url=url;
        this.nombre=nombre;
        this.activo=activo;
        this.clasesCss=clasesCss;
    }
}