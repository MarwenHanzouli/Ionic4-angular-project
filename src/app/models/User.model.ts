export class User {
    constructor(public firstName:string,
                public lastName:string,
                public phone:number,
                public email:string,
                public password:string,){}
                public repassword?:string
                public image:File
    }
