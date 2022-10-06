import * as express from "express";
import fileUpload from "express-fileupload";
import songController from "../../controller/api/song";
import { ACCEPTED_FILE } from "../../constants/file";
import fileController from "../../controller/api/file";
import fileMiddleWare from "../../middlewares/file/fileMiddleWare";

const router = express.Router({ mergeParams: true });

router.route("/:id").get(songController.get);

router
  .route("/")
  .get(songController.list)
  .post(fileUpload({ createParentPath: true }), songController.create);

export default router;
