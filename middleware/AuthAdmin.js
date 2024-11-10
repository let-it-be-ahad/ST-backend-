import jwt from 'jsonwebtoken';

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // Fetch token from headers
        const { atoken } = req.headers;
        console.log('Token in headers:', atoken);  // Log token to verify it's being sent

        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Verify the token by decoding it
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET_KEY);

        // Check if the token's email matches the admin email
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({
                success: false,
                message: "Token does not match the admin email"
            });
        }

        // If everything is valid, proceed to the next middleware
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export default authAdmin;
