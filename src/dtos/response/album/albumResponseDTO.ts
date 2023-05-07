import { ObjectId } from "bson";
import { Types } from "mongoose";
import { IAlbum } from "../../../models";

export interface IAlbumResponseDTO {
  _id?: Types.ObjectId;
  name?: String;
  image?: String;
  authors?: Array<Object>;
  description?: String;
  songs?: Array<Object>;
  publicationYear?: Date;
  likes: Number;
  typeIds: Array<any>;
  followers: Array<any>;
  type: String;
}
export default class AlbumResponseDTO {
  public _id?: Types.ObjectId;
  public name?: String;
  public image?: String;
  public authors?: Array<Object>;
  public description?: String;
  public songs?: Array<Object>;
  public publicationYear?: Date;
  public likes?: Number;
  public typeIds?: Array<any>;
  public followers: Array<any>;
  public type: String;
  setType(type: String) {
    this.type = type;
    return this;
  }
  get getType() {
    return this.type;
  }
  setFollowers(followers: Array<any>) {
    this.followers = followers;
    return this;
  }
  get getFollowers() {
    return this.followers;
  }
  setTypeIds(typeId: Array<any>) {
    this.typeIds = typeId;
    return this;
  }
  get getTypeIds() {
    return this.typeIds;
  }

  setLikes(likes: Number) {
    this.likes = likes;
    return this;
  }
  get getLikes() {
    return this.likes;
  }

  setPublicationYear(publicationYear: Date) {
    this.publicationYear = publicationYear;
    return this;
  }

  get getPublicationYear() {
    return this.publicationYear;
  }

  setSongs(songs: Array<Object>) {
    this.songs = songs;
    return this;
  }

  get getDescription() {
    return this.description;
  }

  setDescription(description: String) {
    this.description = description;
    return this;
  }

  get getAuthors() {
    return this.authors;
  }
  setAuthors(authors: Array<Object>) {
    this.authors = authors;
    return this;
  }

  get getId() {
    return this._id;
  }
  setId(id: Types.ObjectId) {
    this._id = id;
    return this;
  }

  get getName() {
    return this.name;
  }
  setName(name: String) {
    this.name = name;
    return this;
  }

  get getImage() {
    return this.image;
  }
  setImage(image: String) {
    this.image = image;
    return this;
  }

  get(): IAlbumResponseDTO {
    const request: IAlbumResponseDTO = {
      _id: this._id,
      typeIds: this.typeIds,
      name: this.name,
      publicationYear: this.publicationYear,
      likes: this.likes,
      image: this.image,
      authors: this.authors,
      description: this.description,
      songs: this.songs,
      followers: this.followers,
      type: this.type,
    };
    return request;
  }

  responseDTOFullAlbum(model: any, songs: any, author: any) {
    if (!model) return null;
    return this.setId(model._id)
      .setId(model._id)
      .setLikes(model.likes)
      .setName(model.name)
      .setImage(model.image)
      .setAuthors(model.authors)
      .setDescription(model.description)
      .setSongs(songs)
      .setPublicationYear(model.publicationYear)
      .setAuthors(author)
      .setTypeIds(model.typeIds)
      .setFollowers(model.followers)
      .setType(model.type)
      .get();
  }
  responseDTOAlbum(model: any) {
    if (!model) return null;
    return this.setId(model._id)
      .setId(model._id)
      .setName(model.name)
      .setImage(model.image)
      .setAuthors(model.authors)
      .setDescription(model.description)
      .setPublicationYear(model.publicationYear)
      .setFollowers(model.followers)
      .setType(model.type);
  }
  responseDTO(model: IAlbum) {
    if (!model) return null;
    return this.setId(model._id)
      .setId(model._id)
      .setName(model.name)
      .setImage(model.image)
      .setFollowers(model.followers)
      .get();
  }
}
