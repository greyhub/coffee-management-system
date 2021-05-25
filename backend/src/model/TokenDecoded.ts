export default class TokenDecoded {
  roleCode: number
  hashPassword: string
  id: string

  constructor(id: string, roleCode: number, hashPassword: string) {
    this.roleCode = roleCode;
    this.hashPassword = hashPassword;
    this.id = id;

    Object.setPrototypeOf(this, TokenDecoded.prototype);
  }
}