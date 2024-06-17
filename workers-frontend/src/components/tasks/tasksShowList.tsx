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
    userId: new Types.ObjectId("664cba7ee786ab5c121aa40b"),
    businessId: new Types.ObjectId("664cba7ee786ab5c121aa40b"),
    code: "EMP123",
    createdBy: "adminUserId",
    updatedBy: "adminUserId",
    role: EmployeeRole.manager,
  };
  let filteredTasks = tasks;
  if (newEmployee.role !== EmployeeRole.manager) {
    filteredTasks = tasks.filter((task) => {
      return task.employee.filter((emp) => {
        return emp === newEmployee.userId;
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
