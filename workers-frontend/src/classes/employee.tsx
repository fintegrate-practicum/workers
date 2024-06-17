import { Types } from "mongoose";
import { EmployeeRole } from "./enum/employeeRole.enum";
class employee {
    userId !: Types.ObjectId;
    businessId!: Types.ObjectId;
    code!: string;
    createdBy!: string;
    updatedBy!: string;
    role!: EmployeeRole;
    constructor(userId: Types.ObjectId, businessId: Types.ObjectId, code: string, createdBy: string, updatedBy: string, role: EmployeeRole) {
        this.userId = userId
        this.businessId = businessId
        this.code = code
        this.createdBy = createdBy
        this.updatedBy = updatedBy
        this.role = role
    }
}
export default employee;