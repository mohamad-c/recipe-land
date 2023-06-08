import { body } from "express-validator";
import { userModel } from "../model/user.model";
import { RegisterBodyProps } from "../utils/interfaces";

export default class UserValidation {
  registerValidation() {
    return [
      body("fullName")
        .isString()
        .notEmpty()
        .withMessage("This field shouldn't be empty"),
      body("email")
        .isEmail()
        .withMessage("Invalid Email")
        .notEmpty()
        .withMessage("This field shouldn't be empty")
        .custom(async (email) => {
          const findEmail = await userModel.findOne({ email });
          if (findEmail) {
            throw { message: "Email has already been used" };
          } else return true;
        }),
      body("phoneNumber")
        .isMobilePhone("fa-IR")
        .withMessage("Invalid phone number")
        .notEmpty()
        .withMessage("This field shouldn't be empty")
        .custom(async (phoneNumber) => {
          const fidnPhoneNumber = await userModel.findOne({ phoneNumber });
          if (fidnPhoneNumber) {
            throw { message: "Phone number has already been used" };
          } else return true;
        }),
      body("username")
        .isString()
        .notEmpty()
        .withMessage("This field shouldn't be empty")
        .custom(async (username) => {
          const fidnUsername = await userModel.findOne({ username });
          if (fidnUsername) {
            throw { message: "Username has already been used" };
          } else return true;
        }),
      body("password")
        .isString()
        .isLength({ min: 4, max: 6 })
        .withMessage("Password not valid")
        .notEmpty()
        .withMessage("This field shouldn't be empty"),
      body("confirmPassword")
        .isString()
        .notEmpty()
        .withMessage("This field shouldn't be empty")
        .custom((confirmPassword: string, { req }) => {
          const { password } = req.body as RegisterBodyProps;
          if (confirmPassword !== password) {
            throw new Error("Password did not match");
          } else return true;
        }),
    ];
  }
}
