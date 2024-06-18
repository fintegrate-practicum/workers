export class EmployeeRole{
  type!:string;
  active!: boolean;
  description!: string;
  constructor( type:string,active:boolean,description:string){
    this.type=type;
    this.active=active;
    this.description=description;
  }
}
