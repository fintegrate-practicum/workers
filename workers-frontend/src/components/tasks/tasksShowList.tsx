import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import GenericList from "../generic/genericList";
import { EmployeeRole } from "../../classes/enum/employeeRole.enum";
import taskSlice from "../../redux/taskSlice";
import Task from "../../classes/task";
import employee from "../../classes/employee";
import { Types } from "mongoose";
import { useLocation } from "react-router-dom";  // Import useLocation from react-router-dom


const TasksShowList = () => {
  const tasks: Task[] = useAppSelector((state) => state.taskSlice);
  const [highlightedTask, setHighlightedTask] = useState<Task | null>(null);
  const location = useLocation();  // Use useLocation to get the current URL


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

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const taskId = query.get('taskId');

    if (taskId) {
      const task = tasks.find(task => task._id.equals(taskId));  // Use equals for ObjectId comparison
      if (task) {
        setHighlightedTask(task);
      }
    }
  }, [location, tasks]);


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
      {highlightedTask && (
          <div style={{ flex: 1, marginLeft: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h2>{highlightedTask.taskName}</h2>  // Assuming 'taskName'
            <p>{highlightedTask.description}</p>
            <p>Due Date: {highlightedTask.targetDate.toDateString()}</p>  // Assuming 'targetDate'
            <p>Urgency: {highlightedTask.urgency}</p>
          </div>
        )}
    </>
  );
};
export default TasksShowList;
