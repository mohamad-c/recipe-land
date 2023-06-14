import crypto from "crypto";
import { NextFunction, Response } from "express";
import { Request } from "express-validator/src/base";
import { IncomingHttpHeaders } from "http";
import jwt from "jsonwebtoken";

export default class EncryptionModule {
  private salt = crypto.randomBytes(16).toString("hex");
  private secret = '38ce2e721771416540eaa11bc5';
  encryptPassword(password: string) {
    const encryptedPassword = crypto
      .pbkdf2Sync(password, this.salt, 1000, 16, "SHA512")
      .toString("hex");

    const newPassword = `${this.salt}${encryptedPassword}`;
    return newPassword;
  }
  verifyPassword(password: string, hashedPassword: string) {
    const salt = hashedPassword.slice(0, 32);
    const encryptedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 16, "SHA512")
      .toString("hex");
    const decryptHash = `${salt}${encryptedPassword}`;
    return hashedPassword === decryptHash;
  }
  createJWT(id: string, username: string, email:string, fullName:string) {
    const token = jwt.sign({ id, username, email, fullName }, this.secret, {
      expiresIn: "1h",
    });

    return token;
  }
  verifyJWT(token: string){
    const verifiedJWT = jwt.verify(token, this.secret);
    return verifiedJWT;
  }
  checkJWT(){
    return (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers as IncomingHttpHeaders;
      const bearerToken = authorization?.split(" ");
      if(bearerToken){
        const verify = this.verifyJWT(bearerToken[1])
        if(bearerToken[0].toLocaleLowerCase() !== 'bearer' && !verify){
          throw {message: 'JWT not provided...'}
        } else {
          req.user = verify
          next()
        }
      } else throw {message: 'JWT not provided...'}
    }
  }
  // decodeJWT(token: string){
  //   const verifiedJWT = jwt.decode(token);
  //   return verifiedJWT;
  // }
}
