import { Types } from 'mongoose'
import React from 'react';
import { createEmployee } from '../redux/employeeSlice';
import { useAppDispatch } from '../redux/hooks';
import employee from '../classes/employee';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';

const CreateWorkerBtn = () => {
    const [userId, setUserId] = React.useState(new  Types.ObjectId );
    const [businessId, setBusinessId] = React.useState('');
    const [code, setCode] = React.useState('');
    const [createdBy, setCreatedBy] = React.useState('');
    const [updatedBy, setUpdatedBy] = React.useState('');
    const [role, setRole] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        const employee: employee = {
            "userId": userId,
            "businessId": businessId,
            "code": code,
            "createdBy": createdBy,
            "updatedBy": updatedBy,
            "role": role
        }
        dispatch(createEmployee(employee));
        setOpen(false);
    };

    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add new employee
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
                    <DialogTitle> Add new employee</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add a new employee, please enter the data here.
                        </DialogContentText>
                        <TextField
                            onChange={(e) => setUserId(new Types.ObjectId(e.target.value))}
                            autoFocus
                            required
                            margin="dense"
                            id="user_id"
                            name="user_id"
                            label="User Id "
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            onChange={(e) => setBusinessId(e.target.value)}
                            autoFocus
                            required
                            margin="dense"
                            id="business_id"
                            name="business_id"
                            label="Business Id "
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            onChange={(e) => setCode(e.target.value)}
                            autoFocus
                            required
                            margin="dense"
                            id="code"
                            name="code"
                            label="Code"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            onChange={(e) => setCreatedBy(e.target.value)}
                            autoFocus
                            required
                            margin="dense"
                            id="created_by"
                            name="created_by"
                            label="Created By"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            onChange={(e) => setUpdatedBy(e.target.value)}
                            autoFocus
                            required
                            margin="dense"
                            id="updated_By"
                            name="updated_By"
                            label="Updated By"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            onChange={(e) => setRole(e.target.value)}
                            autoFocus
                            required
                            margin="dense"
                            id="role"
                            name="role"
                            label="Role"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}

export default CreateWorkerBtn;