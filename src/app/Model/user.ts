export class User {

    userid: number;
    fName: string;
    lName: string;
    username: string;
    password: string;
    email: string;
    role: string;



    constructor(userid:number, firstname:string, lastname:string, password:string, email:string ){
        this.userid = userid;
        this.fName = firstname;
        this.lName = lastname;
        this.password = password;
        this.email = email;
    }

}
