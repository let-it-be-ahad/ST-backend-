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
    },
    experience: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    slots_booked: {
        type: Object,
        default: {},
    },
    minimize: {
        type: Boolean,
        default: false,
    },
    createdAt: { 
        type: Date,
        default: Date.now 
    }
});

const employeeModel = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);  

export default employeeModel;  
