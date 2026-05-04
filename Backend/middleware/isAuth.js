import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

    if(!verifytoken){
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.userId = verifytoken.id;
     
    next()

  } catch (error) {
   return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isAuth;