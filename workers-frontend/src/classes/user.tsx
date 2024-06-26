class User {
    
    userName!:string;
    userEmail!: string;
    auth0_user_id!:string;
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