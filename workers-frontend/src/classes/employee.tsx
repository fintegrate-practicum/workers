class employee {

    userId!: number;
    businessId!: string;
    code!: string;
    createdBy!: string;
    updatedBy!: string;
    roleId!: number;
    position!: string;

    constructor(userId: number, businessId: string, code: string,createdBy: string,updatedBy: string, roleId: number,position: string) {
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