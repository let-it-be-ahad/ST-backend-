import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    speciality: {   
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    }
   
});

const employeeModel = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);  

export default employeeModel;  
