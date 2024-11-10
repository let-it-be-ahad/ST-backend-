import employeeModel from "../models/EmployeeModel.js";  

const changeAvailability = async (req, res) => {
    try {
        const { empId } = req.body;  
        // Find the employee by ID
        const empData = await employeeModel.findById(empId);  

        if (!empData) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Toggle availability status
        await employeeModel.findByIdAndUpdate(empId, { available: !empData.available });

        return res.status(200).json({
            success: true,
            message: "Availability changed"
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Failed to change availability"
        });
    }
};

export { changeAvailability };
