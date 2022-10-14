import * as validationUtils from "../../utils/utils";
import { SongErrorMessage } from "../../messages/error/song/index";
import CreateSongRequestDTO from "../../dtos/request/song/CreateSongRequestDTO";
import UpdateSongRequestDTO from "../../dtos/request/song/UpdateSongRequestDTO";
import { param } from "express-validator";

class SongValidation {
  public createSongRequest = (params: CreateSongRequestDTO): any[] => {
    const errors = [];

    if (validationUtils.isBlank(params.name)) {
      errors.push(SongErrorMessage.SONG_NAME_IS_NOT_EMPTY);
    }

    return errors;
  };
  public updateSongRequest = (params: UpdateSongRequestDTO): any[] => {
    const errors = [];

    if (validationUtils.isBlank(params.id.toString()))
      errors.push(SongErrorMessage.ID_IS_NOT_EMPTY);
    if (!validationUtils.isMongooseObjectId.test(params.id.toString()))
      errors.push(SongErrorMessage.ID_IS_NOT_CORRECT_FORMAT);

    return errors;
  };
}

const songValidation = new SongValidation();
export default songValidation;
