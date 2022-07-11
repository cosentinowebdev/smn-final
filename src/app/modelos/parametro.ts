export class parametro  {
    desde:number;
    hasta:number;
    color:string;
    constructor(valor:any) {
        this.desde = valor.desde;
        this.hasta = valor.hasta; 
        this.color = valor.color;
    }
}