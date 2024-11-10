import validator from 'validator';
import bcrypt from 'bcryptjs';
import employeeModel from '../models/EmployeeModel.js';  
import jwt from 'jsonwebtoken'

// API for adding employee
const addEmployee = async (req, res) => {
    try {
        const { name, email, password, speciality, company, experience, about, fee, address, available } = req.body;

        if (!name || !email || !password || !speciality || !company || !experience || !about || !fee || !address || !available) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validating email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or incorrect email id"
            });
        }

        // Validating password strength
        if (password.length < 4) {
            return res.status(400).json({
                success: false,
                message: "Please enter a strong password"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save data in database
        const employeeData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            company,
            experience,
            about,
            fee,
            address,
            available,
            date: Date.now(),
        };
        const newEmployee = new employeeModel(employeeData);  
        await newEmployee.save();

        return res.status(200).json({
            success: true,
            message: "Employee added successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while adding employee, please check email"
        });
    }
};

// API for admin login 
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate token with concatenated string of email and password
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
            return res.json({
                success: true,
                token
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// API for getting all employees
const allEmployee = async (req, res) => {
    try {
        const employee = await employeeModel.find({}).select("-password"); 
        return res.status(200).json({
            success: true,
            employee,  // Changed 'mechanic' to 'employee'
            message: "Data fetched successfully "
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to load all employees"
        });
    }
}

export { addEmployee, loginAdmin, allEmployee }; 