import jwt from 'jsonwebtoken';


const generateToken = (userId) => {
    try {
        let token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
    } catch (error) {
        console.error("Error generating token:", error);
    }
} 

const generateToken1 = (email) => {
    try {
        let token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
    } catch (error) {
        console.error("Error generating token:", error);
    }
} 


export { generateToken1 , generateToken };