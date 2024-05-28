import React, { ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Types } from 'mongoose';
import { useDispatch } from 'react-redux';
import { editEmployee } from '../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';
const Tami = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate();
  const initialEmployeeData = {
    userId: new Types.ObjectId('60c72b2f9b1d8e6a5f56789a'), // Example ObjectId
    businessId: 12345,
    code: 'EMP123',
    createdBy: 'admin',
    updatedBy: '', // Initially empty for user update
    roleId: new Types.ObjectId('60c72b2f9b1d8e6a5f56789b'), // Example ObjectId
    active: true,
    signupTime: new Date('2023-01-01T10:00:00Z'),
    position: 'developer',
  };
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const handleInputChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Handle boolean conversion for "active" field
    const updatedValue = name === 'active' ? value === 'true' : value;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const userObject = Object.fromEntries(formData.entries());
    console.log(userObject);
    dispatch(editEmployee(userObject)); // Make sure to include the user ID when updating
    navigate("/");//לחזור לדף הבית כרגע הוא עוד לא קיים אבל זה התכנון
  };
  return (
    <>
    <div className='tami'>
     <form onSubmit={formSubmit}>
      <TextField
        name="userId"
        label="User ID"
        onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>)}
        value={"הקוד של הבנאדם"}
        // value={employeeData.userId.toString()}
        disabled={true} // Typically, IDs are not changed
      />
      <TextField
        name="businessId"
        label="Business ID"
        onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>)}
        value={employeeData.businessId}
        type="number"
      />
      <TextField
        name="code"
        label="Code"
        onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>)}
        value={employeeData.code}
      />
<Button type="submit"> שמירה  </Button>
</form>
</div>
    </>
  );
};
export default Tami