import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const deleteBusiness = createAsyncThunk(
    'business/delete', async (businessId: string) => {
        try {
            const response = await axios.delete(`/api/businesses/${businessId}`);
            return response.data; 
        } catch (error) {
            throw error; 
        }
    }
);