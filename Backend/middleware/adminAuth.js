import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

    if(!verifytoken){
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.adminEmail = process.env.ADMIN_EMAIL;
     
    next()

  } catch (error) {
   return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default adminAuth;