export default class TokenDecoded {
  id: string
  hashPassword: string

  constructor(id: string, hashPassword: string) {
    this.id = id;
    this.hashPassword = hashPassword;

    Object.setPrototypeOf(this, TokenDecoded.prototype);
  }
}