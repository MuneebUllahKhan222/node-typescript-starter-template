import jwt  from "jsonwebtoken";


function verifyRefresh(email:string, token:string):boolean {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
    return decoded.email === email;
  } catch (error) {
    return false;
  }
};

export default verifyRefresh;