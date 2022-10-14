import mongoose from "mongoose";
import { SONG_DEFAULT } from "../../../constants/model/song";

export default class UpdateSongRequestDTO {
  public id?: mongoose.Types.ObjectId;
  public name?: string;
  public image?: string;
  public artistId: mongoose.Types.ObjectId;
  public countryId?: mongoose.Types.ObjectId;
  public audio?: string;
  public originAlbumId?: mongoose.Types.ObjectId;
  public albumIds?: Array<mongoose.Types.ObjectId>;
  public typeIds?: Array<mongoose.Types.ObjectId>;

  constructor({
    id,
    name,
    image,
    artistId,
    countryId,
    audio,
    originAlbumId,
    albumIds,
    typeIds,
  }) {
    this.id = mongoose.Types.ObjectId(id);
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
    this.originAlbumId = mongoose.Types.ObjectId(originAlbumId);
    this.albumIds =
      albumIds != "" && albumIds != null
        ? albumIds.map((albumId) => mongoose.Types.ObjectId(albumId))
        : SONG_DEFAULT.ALBUM_ID_DEFAULT;
  }
}
