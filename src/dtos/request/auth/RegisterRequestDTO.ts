export default class RegisterRequestDTO {
  public username: string;
  public password: string;
  public email: string;
  constructor({ username, password, email }) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  get getUsername() {
    return this.username;
  }
  get getPassword() {
    return this.password;
  }
  get getEmail() {
    return this.email;
  }
}
