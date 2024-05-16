import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import task from '../../../task';
import { createTask } from '../../../redux/taskSlice';
import { useAppDispatch } from '../../../redux/hooks';

export default function AddTaskBtn() {
  const [open, setOpen] = React.useState(false);
  const [companyName, setCompanyName] = React.useState('');
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [targetDate, setTargetDate] = React.useState('');
  const [associatedWithEmployee, setAssociatedWithEmployee] = React.useState('');
  const [theUrgencyOfTheTask, setTheUrgencyOfTheTask] = React.useState(0);

  const Task : task = {
    "companyName": companyName,
    "managerId": "managerId",
    "taskName": taskName,
    "description": description,
    "targetDate": targetDate,
    "associatedWithEmployee": associatedWithEmployee,
    "theUrgencyOfTheTask": theUrgencyOfTheTask
  }
  const dispatch=useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(createTask(Task));    
    setOpen(false);
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
            const email = formJson.email;
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
            onChange={(e) => setCompanyName(e.target.value)}
            autoFocus
            required
            margin="dense"
            id="company_name"
            name="company_name"
            label="Company Name"
            type="text"
            fullWidth
            variant="standard"
          />
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
            onChange={(e) => setTargetDate(e.target.value)}
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
            onChange={(e) => setAssociatedWithEmployee(e.target.value)}
            autoFocus
            required
            margin="dense"
            id="associated_with_employee(s)"
            name="Associated with employee(s)"
            label="Associated with employee(s)"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => setTheUrgencyOfTheTask(parseInt(e.target.value))}
            autoFocus
            required
            margin="dense"
            id="the_urgency_of_the_task"
            name="The Urgency Of The Task"
            label="The Urgency Of The Task"
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