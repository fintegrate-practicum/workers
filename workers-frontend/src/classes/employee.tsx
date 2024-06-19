import { Types } from "mongoose";
import { EmployeeRole } from "./enum/employeeRole.enum";
class employee {
    _id:Types.ObjectId | undefined;
    businessId!: Types.ObjectId;
    code!: string;
    createdBy!: string;
    updatedBy!: string;
    role!: EmployeeRole;
    nameEmployee!: string;   

   
    constructor( businessId: Types.ObjectId, code: string, createdBy: string, updatedBy: string, role: EmployeeRole,workerCode:string,) {
        this.businessId = businessId
        this.code = code
        this.createdBy = createdBy
        this.updatedBy = updatedBy
        this.role = role
    }
}
export default employee;