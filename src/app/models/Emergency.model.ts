import { Photo } from '../interfaces/photo';

export class Emergency{
    public affected:boolean;
    public ambilancier:string;
    public photos:Photo[];
    public dateEmergency:Date;
    constructor(public description:string,
                public lat:number,
                public lng:number,
                public idEmitter?:string){}
    
}