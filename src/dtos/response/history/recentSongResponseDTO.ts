import { Types } from "mongoose";
import { IAlbum, ILibrary } from "../../../models";

export interface IRecentSongResponseDTO {
  _id?: Types.ObjectId;
  userId?: Types.ObjectId;
  recentSong?: Array<IAlbum>;
}
export default class RecentSongResponseDTO {
  public _id?: Types.ObjectId;
  public _userId?: Types.ObjectId;
  public _recentSong?: Array<IAlbum>;

  get id() {
    return this._id;
  }
  setId(id: Types.ObjectId) {
    this._id = id;
    return this;
  }

  get userId() {
    return this._userId;
  }
  setUserId(userId: Types.ObjectId) {
    this._userId = userId;
    return this;
  }

  get recentSong() {
    return this._recentSong;
  }
  setRecentSong(recentSong: Array<IAlbum>) {
    this._recentSong = recentSong;
    return this;
  }

  get(): IRecentSongResponseDTO {
    const request: IRecentSongResponseDTO = {
      _id: this._id,
      userId: this._userId,
      recentSong: this._recentSong,
    };
    return request;
  }
  responseDTO(model: ILibrary) {
    if (!model) return null;
    return this.setId(model._id)
      .setUserId(model.userId)
      .setRecentSong(model.recentAlbums)
      .get();
  }
}
