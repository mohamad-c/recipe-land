import crypto from "crypto";

export default class EncryptionModule {
  private salt = crypto.randomBytes(16).toString("hex");
  encryptPassword(password: string) {
    const encryptedPassword = crypto
      .pbkdf2Sync(password, this.salt, 1000, 16, "SHA512")
      .toString("hex");

    const newPassword = `${this.salt}${encryptedPassword}`;
    return newPassword;
  }
  decryptPassword(password: string, hashedPassword: string) {
    const salt = hashedPassword.slice(0, 32);
    const encryptedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 16, "SHA512")
      .toString("hex");
    const decryptHash = `${salt}${encryptedPassword}`;
    return hashedPassword === decryptHash;
  }
}
