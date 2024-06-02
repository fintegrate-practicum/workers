import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import GenericList from '../generic/genericList';
import employee, { RoleEnum } from '../../classes/employee';
import taskSlice from '../../redux/taskSlice';
import Task from '../../classes/task';

const TasksShowList = () => {
  const tasks: Task[] = useAppSelector(state => state.taskSlice);
  console.log(tasks)
  const newEmployee: employee = {
    userId: '123',
    businessId: 'someBusinessId',
    code: 'EMP123',
    createdBy: 'adminUserId',
    updatedBy: 'adminUserId',
    role: RoleEnum.cleaner,
  };
  let filteredTasks = tasks;

  if (newEmployee.role !== RoleEnum.maneger) {
    console.log('is ' + newEmployee.userId);
    filteredTasks = tasks.filter(task => task.employee.includes(newEmployee.userId));
  }


  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <GenericList title={"tasks list"} list={filteredTasks} column={["taskName", "targetDate", "theUrgencyOfTheTask"]} desing={null} />
      </div>
    </>
  );
};
export default TasksShowList;