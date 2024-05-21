export enum RoleEnum {
    'secretary',
    'cleaner',
    'deliveryPerson',
    'developer',
    'tester',
    'maneger',
    'owner',
}
class employee {

    userId!: string;
    businessId!: string;
    code!: string;
    createdBy!: string;
    updatedBy!: string;
    role!: RoleEnum;

    constructor(userId: string, businessId: string, code: string, createdBy: string, updatedBy: string, role: RoleEnum) {
        this.userId = userId
        this.businessId = businessId
        this.code = code
        this.createdBy = createdBy
        this.updatedBy = updatedBy
        this.role = role
    }
}

export default employee;