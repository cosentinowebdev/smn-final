export class parametro  {
    desde:number;
    hasta:number;
    color:string;
    desc: string;
    constructor(valor:any) {
        this.desde = valor.desde;
        this.hasta = valor.hasta; 
        this.color = valor.color;
        this.desc = valor.desc;
    }
}