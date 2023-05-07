import { Types } from "mongoose";
import { ISong } from "../../../models/song";

export interface ISongResponseDTO {
  _id?: Types.ObjectId;
  name?: String;
  image?: String;
  audio?: String;
  artistId?: Types.ObjectId;
  likes?: Number;
  views?: Array<Number>;
  createdAt?: Date;
  updatedAt?: Date;
  countryId?: Types.ObjectId;
  originAlbumId?: Types.ObjectId;
  albumIds?: Array<Types.ObjectId>;
  typeIds?: Array<Types.ObjectId>;
  followers?: Array<Types.ObjectId>;
  is_vip?: Boolean;
  artist?: Object;
  album?: Object;
  totalViews?: Number;
}
export default class SongResponseDTO {
  public _id?: Types.ObjectId;
  public _name?: String;
  public _image?: String;
  public _audio?: String;
  public _artistId?: Types.ObjectId;
  public _likes?: Number;
  public _views?: Array<Number>;
  public _createdAt?: Date;
  public _updatedAt?: Date;
  public _countryId?: Types.ObjectId;
  public _originAlbumId?: Types.ObjectId;
  public _albumIds?: Array<Types.ObjectId>;
  public _typeIds?: Array<Types.ObjectId>;
  public _followers?: Array<Types.ObjectId>;
  public _is_vip?: Boolean;
  public _artist?: Object;
  public _album?: Object;
  public _totalViews?: Number;

  get totalViews() {
    return this.totalViews;
  }
  setTotalViews(totalViews: Number) {
    this._totalViews = totalViews;
    return this;
  }

  get followers() {
    return this._followers;
  }
  setFollowers(followers: Array<Types.ObjectId>) {
    this._followers = followers;
    return this;
  }
  get album() {
    return this._album;
  }
  setAlbum(album: Object) {
    this._album = album;
    return this;
  }
  get artist() {
    return this._artist;
  }
  setArtist(artist: Object) {
    this._artist = artist;
    return this;
  }

  get isVip() {
    return this._id;
  }
  setIsVip(_is_vip: Boolean) {
    this._is_vip = _is_vip;
    return this;
  }

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

  get likes() {
    return this._likes;
  }
  setLikes(likes: Number) {
    this._likes = likes;
    return this;
  }

  get view() {
    return this._views;
  }
  setViews(views: Array<Number>) {
    this._views = views;
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
      likes: this._likes,
      views: this._views,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      countryId: this._countryId,
      originAlbumId: this._originAlbumId,
      albumIds: this._albumIds,
      typeIds: this._typeIds,
      is_vip: this._is_vip,
      artist: this._artist,
      followers: this._followers,
      album: this._album,
      totalViews: this._totalViews,
    };
    return request;
  }
  responseSimpleDTO(model: ISong, artist: object = null, album: object = null) {
    if (!model) return null;
    return this.setId(model._id)
      .setId(model._id)
      .setName(model.name)
      .setAudio(model.audio)
      .setImage(model.image)
      .setOriginAlbumId(model.originAlbumId)
      .setCreatedAt(model.createdAt)
      .setFollowers(model.followers)
      .setArtist(artist)
      .setIsVip(model.is_vip)
      .setAlbum(album)
      .setTotalViews(model.totalViews)
      .get();
  }

  responseDTO(model: ISong) {
    if (!model) return null;
    return this.setId(model._id)
      .setId(model._id)
      .setName(model.name)
      .setAudio(model.audio)
      .setImage(model.image)
      .setArtistId(model.artistId)
      .setLikes(model.likes)
      .setViews(model.views)
      .setCreatedAt(model.createdAt)
      .setUpdatedAt(model.updatedAt)
      .setCountryId(model.countryId)
      .setOriginAlbumId(model.originAlbumId)
      .setAlbumIds(model.albumIds)
      .setTypeIds(model.typeIds)
      .setFollowers(model.followers)
      .setIsVip(model.is_vip)
      .get();
  }
}
