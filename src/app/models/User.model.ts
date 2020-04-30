import { File } from './File.model'

export class User {
    public id:string;
    public repassword:string;
    public image:File;
    public role:string;
    constructor(
        public firstName:string,
        public lastName:string,
        public phone:number,
        public email:string,
        public password:string){}
    }
