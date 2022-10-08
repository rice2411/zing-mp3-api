import * as validationUtils from "../../utils/utils";
import { SongErrorMessage } from "../../messages/error/song/index";
import CreateSongRequestDTO from "../../dtos/request/song/CreateSongRequestDTO";

class SongValidation {
  public createSongRequest = (params: CreateSongRequestDTO): any[] => {
    const errors = [];

    if (validationUtils.isBlank(params.name)) {
      errors.push(SongErrorMessage.SONG_NAME_IS_NOT_EMPTY);
    }

    return errors;
  };
}

const songValidation = new SongValidation();
export default songValidation;
