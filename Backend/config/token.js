import jwt from 'jsonwebtoken';


const generateToken = (userId) => {
    try {
        let token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
    } catch (error) {
        console.error("Error generating token:", error);
    }
} 

export default generateToken;