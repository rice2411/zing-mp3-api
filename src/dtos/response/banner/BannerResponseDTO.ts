import { Types } from "mongoose";
import { IBanner } from "../../../models/banner";

export interface IBannerResponseDTO {
  _id?: Types.ObjectId;
  image: String;
}
export default class BannerResponseDTO {
  public _id?: Types.ObjectId;
  public _image?: String;

  get id() {
    return this._id;
  }
  setId(id: Types.ObjectId) {
    this._id = id;
    return this;
  }

  get image() {
    return this._image;
  }
  setImage(image: String) {
    this._image = image;
    return this;
  }

  get(): IBannerResponseDTO {
    const request: IBannerResponseDTO = {
      _id: this._id,
      image: this._image,
    };
    return request;
  }
  responseDTO(model: IBanner) {
    if (!model) return null;
    return this.setId(model._id)
      .setImage(model.image)

      .get();
  }
}
