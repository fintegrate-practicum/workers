import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTask } from '../../redux/taskSlice';
import { useAppDispatch } from '../../redux/hooks';
import Task, { StatusEnum } from '../../classes/task';

export default function AddTaskBtn() {
  const [open, setOpen] = React.useState(false);
  const businessId = "1"; //from auth0
  const managerId = "1"; //from auth0
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [targetDate, setTargetDate] = React.useState(new Date(0));
  const [employee, setEmployee] = React.useState<string[]>([]);
  const [urgency, setUrgency] = React.useState(0);

  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const task: Task = {
      "businessId": businessId,
      "managerId": managerId,
      "taskName": taskName,
      "description": description,
      "targetDate": targetDate,
      "employee": employee,
      "urgency": urgency,
      "status": StatusEnum.ToDo,
      "completionDate": new Date(0)
    }
    dispatch(createTask(task));
    setOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetDate(new Date(e.target.value));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const employeeArray = value.split(',').map(item => item.trim());
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
          component: 'form',
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
            value={targetDate.toISOString().split('T')[0]}
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
            value={employee.join(', ')} 
            autoFocus
            required
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