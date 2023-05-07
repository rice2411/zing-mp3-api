export interface IUpdateUserRequestDTO {
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  role?: Object;
  avatar?: string;
  is_active?: boolean;
  email?: string;
  phone?: string;
  avatarUpload?: Object;
}
export default class UpdateUserRequestDTO {
  public _id?: string;
  public _first_name?: string;
  public _last_name?: string;
  public _username?: string;
  public _role?: Object;
  public _avatar?: string;
  public _is_active?: boolean;
  public _email?: string;
  public _phone?: string;
  public _avatarUpload?: Object;

  get avatarUpload() {
    return this._phone;
  }

  setAvatarUpload(avatarUpload: Object) {
    this._avatarUpload = avatarUpload;
    return this;
  }

  get phone() {
    return this._phone;
  }

  setPhone(phone: string) {
    this._phone = phone;
    return this;
  }
  get email() {
    return this._email;
  }

  setEmail(email: string) {
    this._email = email;
    return this;
  }

  get id() {
    return this._id;
  }

  setId(id: string) {
    this._id = id;
    return this;
  }

  get first_name() {
    return this._first_name;
  }

  setFirst_name(first_name: string) {
    this._first_name = first_name;
    return this;
  }

  get last_name() {
    return this._last_name;
  }

  setLast_name(last_name: string) {
    this._last_name = last_name;
    return this;
  }

  get username() {
    return this._username;
  }

  setUserName(username: string) {
    this._username = username;
    return this;
  }
  get role() {
    return this._role;
  }

  setRole(role: Object) {
    this._role = role;
    return this;
  }

  get avatar() {
    return this._last_name;
  }

  setAvatar(avatar: string) {
    this._avatar = avatar;
    return this;
  }

  get is_active() {
    return this._is_active;
  }

  setIs_Active(is_active: boolean) {
    this._is_active = is_active;
    return this;
  }

  public toUpdateJSON(): IUpdateUserRequestDTO {
    const request: IUpdateUserRequestDTO = {
      first_name: this._first_name,
      last_name: this._last_name,
      username: this._username,
      role: this._role,
      avatar: this._avatar,
      is_active: this.is_active,
      email: this._email,
      phone: this._phone,
      avatarUpload: this._avatarUpload,
    };
    return request;
  }

  requestDTO(model: any) {
    if (!model) return null;
    const dto = new UpdateUserRequestDTO()
      .setUserName(model.username)
      .setFirst_name(model.first_name)
      .setLast_name(model.last_name)
      .setAvatar(model.avatar)
      .setRole(model.role)
      .setIs_Active(model.is_active)
      .setEmail(model.email)
      .setAvatarUpload(model.avatarUpload)
      .setPhone(model.phone);
    return dto.toUpdateJSON();
  }
}
