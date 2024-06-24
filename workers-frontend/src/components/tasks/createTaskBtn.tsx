import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTask } from "../../redux/taskSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Types } from "mongoose";
import Task from "../../classes/task";
import { TaskStatus } from "../../classes/enum/taskStatus.enum";

export default function AddTaskBtn() {
  const [open, setOpen] = React.useState(false);
  const businessId = new Types.ObjectId(import.meta.env.VITE_BUSINESSID);
  const managerId =   import.meta.env.VITE_MANAGERID?import.meta.env.VITE_MANAGERID  : 'companyName';
  const [taskName, setTaskName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [targetDate, setTargetDate] = React.useState(new Date(0));
  const [employee, setEmployee] = React.useState<Types.ObjectId[]>([]);
  const [urgency, setUrgency] = React.useState(0);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
   
    const task: Task = {
      businessId,
      managerId,
      taskName,
      description,
      targetDate,
      employee,
      urgency,
      status: TaskStatus.ToDo,
      completionDate: new Date(0),
      directLink: "http://localhost:3001/api#/Workers/WorkersController_create"
    };
    dispatch(createTask(task));
    setOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(new Date(e.target.value));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const employeeArray = value
      .split(",")
      .map((item) => {
        const trimmed = item.trim();
        if (Types.ObjectId.isValid(trimmed)) {
          return new Types.ObjectId(trimmed);
        }
        console.warn(`Invalid ObjectId: ${trimmed}`);
        return null;
      })
          .filter(item => item!==null) as Types.ObjectId[];

      setEmployee(employeeArray);
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleClose();
          },
        }}
      >
        <DialogTitle> Add new Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new task, please enter the data here. We will send updates
            to employees.
          </DialogContentText>
          <TextField
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
            required
            margin="dense"
            id="task_name"
            name="task_name"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleDateChange}
            value={targetDate.toISOString().split("T")[0]}
            autoFocus
            required
            margin="dense"
            id="target_date"
            name="Target Date"
            label="Target Date"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleEmployeeChange}
            value={employee.join(", ")}
            autoFocus
            // required
            margin="dense"
            id="employee"
            name="employee"
            label="Employee"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => setUrgency(parseInt(e.target.value))}
            autoFocus
            required
            margin="dense"
            id="urgency"
            name="Urgency"
            label="Urgency"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
