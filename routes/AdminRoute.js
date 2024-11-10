import express from 'express';
import { addEmployee, allEmployee, loginAdmin } from '../controller/AdminController.js';  
import authAdmin from '../middleware/AuthAdmin.js';
import { changeAvailability } from '../controller/EmployeeController.js';  

const adminRouter = express.Router();

adminRouter.post('/add-employee', authAdmin, addEmployee);  
adminRouter.post('/login', loginAdmin);
adminRouter.get('/all-employee', authAdmin, allEmployee);  
adminRouter.post('/change-availability', authAdmin, changeAvailability);

export default adminRouter;
