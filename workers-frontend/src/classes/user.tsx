class User {
    
    name!:string;
    registeredAt!: Date;
    lastLogin!: Date;
    mobile!: string;    
    status!:statuses
    dateOfBirth!: Date;
    address!: {
        city: string;
        street: string;
        num: number;
      };  
   
    constructor() { }
}

export default User

enum statuses {
    Married,
    divorcee,
    widower,
    Bachelor
}