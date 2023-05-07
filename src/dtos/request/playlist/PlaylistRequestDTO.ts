export default class PlaylistRequestDTO {
  public name: string;

  constructor({ name }) {
    this.name = name;
  }

  get _name() {
    return this.name;
  }
}
