import React from "react";
import { useAppSelector } from "../../redux/hooks";
import GenericList from "../generic/genericList";
import { EmployeeRole } from "../../classes/enum/employeeRole.enum";
import taskSlice from "../../redux/taskSlice";
import Task from "../../classes/task";
import employee from "../../classes/employee";
import { Types } from "mongoose";

const TasksShowList = () => {
  const tasks: Task[] = useAppSelector((state) => state.taskSlice);

  const newEmployee: employee = {
    _id: new Types.ObjectId("664cba7ee786ab5c121aa40b"),
    businessId: new Types.ObjectId("664cba7ee786ab5c121aa40b"),
    code: "EMP123",
    createdBy: "adminUserId",
    updatedBy: "adminUserId",
    role: new EmployeeRole("cleaner", true, "clean room"),
    nameEmployee: ""
  };
  let filteredTasks = tasks;
  if (newEmployee.role.type !=='manager') {
    filteredTasks = tasks.filter((task) => {
      return task.employee.filter((emp) => {
        return emp === newEmployee._id;
      });
    });
  }
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <GenericList
          title={"tasks list"}
          list={filteredTasks}
          column={["taskName", "targetDate", "theUrgencyOfTheTask"]}
          desing={null}
        />
      </div>
    </>
  );
};
export default TasksShowList;
