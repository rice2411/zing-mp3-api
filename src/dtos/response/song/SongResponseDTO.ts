import { Types } from "mongoose";
import { ISong } from "../../../models/song";

export interface ISongResponseDTO {
  _id?: Types.ObjectId;
  name?: String;
  image?: String;
  audio?: String;
  artistId?: Types.ObjectId;
  like?: Number;
  view?: Number;
  createdAt?: Date;
  updatedAt?: Date;
  countryId?: Types.ObjectId;
  originAlbumId?: Types.ObjectId;
  albumIds?: Array<Types.ObjectId>;
  typeIds?: Array<Types.ObjectId>;
}
export default class SongResponseDTO {
  public _id?: Types.ObjectId;
  public _name?: String;
  public _image?: String;
  public _audio?: String;
  public _artistId?: Types.ObjectId;
  public _like?: Number;
  public _view?: Number;
  public _createdAt?: Date;
  public _updatedAt?: Date;
  public _countryId?: Types.ObjectId;
  public _originAlbumId?: Types.ObjectId;
  public _albumIds?: Array<Types.ObjectId>;
  public _typeIds?: Array<Types.ObjectId>;

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

  get audio() {
    return this._audio;
  }
  setAudio(audio: String) {
    this._audio = audio;
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

  get countryId() {
    return this._countryId;
  }
  setCountryId(countryId: Types.ObjectId) {
    this._countryId = countryId;
    return this;
  }

  get originAlbumId() {
    return this._originAlbumId;
  }
  setOriginAlbumId(originAlbumId: Types.ObjectId) {
    this._originAlbumId = originAlbumId;
    return this;
  }

  get albumIds() {
    return this._albumIds;
  }
  setAlbumIds(albumIds: Array<Types.ObjectId>) {
    this._albumIds = albumIds;
    return this;
  }

  get typeIds() {
    return this._typeIds;
  }
  setTypeIds(typeIds: Array<Types.ObjectId>) {
    this._typeIds = typeIds;
    return this;
  }

  get(): ISongResponseDTO {
    const request: ISongResponseDTO = {
      _id: this._id,
      name: this._name,
      image: this._image,
      audio: this._audio,
      artistId: this._artistId,
      like: this._like,
      view: this._view,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      countryId: this._countryId,
      originAlbumId: this._originAlbumId,
      albumIds: this._albumIds,
      typeIds: this._typeIds,
    };
    return request;
  }

  responseDTO(model: ISong) {
    if (!model) return null;
    return this.setId(model._id)
      .setId(model._id)
      .setName(model.name)
      .setAudio(model.audio)
      .setImage(model.image)
      .setArtistId(model.artistId)
      .setLike(model.like)
      .setView(model.view)
      .setCreatedAt(model.createdAt)
      .setUpdatedAt(model.updatedAt)
      .setCountryId(model.countryId)
      .setOriginAlbumId(model.originAlbumId)
      .setAlbumIds(model.albumIds)
      .setTypeIds(model.typeIds)
      .get();
  }
}
