import { Types } from "mongoose";
import { ISong } from "../../../models/song";

export interface ISongResponseDTO {
  _id?: Types.ObjectId;
  name?: String;
  image?: String;
  song?: String;
  artistId?: Types.ObjectId;
  like?: Number;
  view?: Number;
  createdAt?: Date;
  updatedAt?: Date;
}
export default class SongResponseDTO {
  public _id?: Types.ObjectId;
  public _name?: String;
  public _image?: String;
  public _song?: String;
  public _artistId?: Types.ObjectId;
  public _like?: Number;
  public _view?: Number;
  public _createdAt?: Date;
  public _updatedAt?: Date;

  get id() {
    return this._id;
  }
  setId(id: Types.ObjectId) {
    this._id = id;
    return this;
  }

  get name() {
    return this.name;
  }
  setName(name: String) {
    this._name = name;
    return this;
  }

  get image() {
    return this._image;
  }
  setImage(image: String) {
    this._image = image;
    return this;
  }

  get song() {
    return this._song;
  }
  setSong(song: String) {
    this._song = song;
    return this;
  }

  get artistId() {
    return this._artistId;
  }
  setArtistId(artistId: Types.ObjectId) {
    this._artistId = artistId;
    return this;
  }

  get like() {
    return this._like;
  }
  setLike(like: Number) {
    this._like = like;
    return this;
  }

  get view() {
    return this._view;
  }
  setView(view: Number) {
    this._view = view;
    return this;
  }

  get createdAt() {
    return this._createdAt;
  }
  setCreatedAt(created_at: Date) {
    this._createdAt = created_at;
    return this;
  }

  get updatedAt() {
    return this._updatedAt;
  }
  setUpdatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
    return this;
  }

  get(): ISongResponseDTO {
    const request: ISongResponseDTO = {
      _id: this._id,
      name: this._name,
      image: this._image,
      song: this._song,
      artistId: this._artistId,
      like: this._like,
      view: this._view,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
    return request;
  }

  responseDTO(model: ISong) {
    if (!model) return null;
    return this.setId(model._id)
      .setId(model._id)
      .setName(model.name)
      .setSong(model.song)
      .setImage(model.image)
      .setArtistId(model.artistId)
      .setLike(model.like)
      .setView(model.view)
      .setCreatedAt(model.createdAt)
      .setUpdatedAt(model.updatedAt)
      .get();
  }
}
