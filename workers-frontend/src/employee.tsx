class employee {

    userId!: number;
    businessId!: string;
    code!: string;
    createdBy!: string;
    updatedBy!: string;
    roleId!: number;
    position!: string;

<<<<<<< HEAD
    constructor(userId: number, code: string,createdBy: string,updatedBy: string, roleId: number,position: string) {
=======

    constructor(userId: number, businessId: string, code: string,createdBy: string,updatedBy: string, roleId: number,position: string) {
>>>>>>> 847352ea0e90ab627a9b88d474f453ec26f6e921
        this.userId = userId
        this.businessId = businessId
        this.code = code
        this.createdBy = createdBy
        this.updatedBy = updatedBy
        this.roleId = roleId
        this.position = position

    }
}

export default employee;