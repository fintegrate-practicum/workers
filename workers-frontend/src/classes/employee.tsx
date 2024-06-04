import{Types}from 'mongoose'
class employee {

    userId!: Types.ObjectId;
    businessId!: string;
    code!: string;
    createdBy!: string;
    updatedBy!: string;
    role!: string;

    constructor(userId: Types.ObjectId, businessId: string, code: string,createdBy: string,updatedBy: string, role: string) {
        this.userId = userId
        this.businessId = businessId
        this.code = code
        this.createdBy = createdBy
        this.updatedBy = updatedBy
        this.role = role
    }
}

export default employee;