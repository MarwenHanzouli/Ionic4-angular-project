export class Emergency{
    public affected:boolean;
    public ambilancier:string;
    constructor(public description:string,
                public lat:number,
                public lng:number){}
    
}