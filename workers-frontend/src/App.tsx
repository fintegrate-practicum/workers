import "./App.css";
import { TaskStatus } from "./classes/enum/taskStatus.enum";
import DeleteTask from "./components/tasks/deleteTask";
import EditTask from "./components/tasks/editTask";
import AddTaskBtn from "./components/tasks/createTaskBtn";

const App = () => {
  return (  
    <>
      <h1>hello</h1>
      <WorkersShowList/>
      <AddTaskBtn/>
      <DeleteTask taskId={"66712f4c08db628c2c3c9d5b"} />
      <EditTask status={TaskStatus.ToDo} taskId={"66712f4c08db628c2c3c9d5b"} description={"aaaa"} taskName={"ddd"} targetDate={new Date()} employee={[]} />
      </>
    </>
)}

export default App;
 
