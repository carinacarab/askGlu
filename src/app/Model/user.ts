export class User {

    public userid: number;
    public firstName: string;
    public lastName: string;
    public password: string;
    public email: string;

    constructor(userid:number, firstname:string, lastname:string, password:string, email:string ){
        this.userid = userid;
        this.firstName = firstname;
        this.lastName = lastname;
        this.password = password;
        this.email = email;
    }

}
