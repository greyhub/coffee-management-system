export default class TokenDecoded {
  roleCode: number
  hashPassword: string

  constructor(roleCode: number, hashPassword: string) {
    this.roleCode = roleCode;
    this.hashPassword = hashPassword;

    Object.setPrototypeOf(this, TokenDecoded.prototype);
  }
}