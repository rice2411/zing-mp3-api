import mongoose from "mongoose";
import { SONG_DEFAULT } from "../../../constants/model/song";

export default class CreateSongRequestDTO {
  public name?: string;
  public image?: string;
  public artistId: mongoose.Types.ObjectId;
  public countryId?: mongoose.Types.ObjectId;
  public audio?: string;
  public typeIds?: Array<mongoose.Types.ObjectId>;

  constructor({ name, image, artistId, countryId, audio, typeIds }) {
    this.name = name;
    this.image = image;
    this.artistId =
      artistId != "" && artistId != null
        ? mongoose.Types.ObjectId(artistId)
        : mongoose.Types.ObjectId(SONG_DEFAULT.ARTIST_ID_DEFAULT);
    this.countryId =
      countryId != "" && countryId != null
        ? mongoose.Types.ObjectId(countryId)
        : mongoose.Types.ObjectId(SONG_DEFAULT.COUNTRY_ID_DEFAULT);
    this.audio = audio;
    this.typeIds =
      typeIds != "" && typeIds != null
        ? typeIds.map((typeId) => mongoose.Types.ObjectId(typeId))
        : SONG_DEFAULT.TYPE_ID_DEFAULT;
  }
}
