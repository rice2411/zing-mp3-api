import * as express from "express";
import fileUpload from "express-fileupload";
import { ACCEPTED_FILE } from "../../constants/file";
import fileController from "../../controller/api/file";
import fileMiddleWare from "../../middlewares/file/fileMiddleWare";

const router = express.Router();
router
  .route("/")
  .post(
    fileUpload({ createParentPath: true }),
    fileMiddleWare.filesPayloadExists,
    fileMiddleWare.fileExtLimiter(ACCEPTED_FILE),
    fileMiddleWare.fileSizeLimiter,
    fileController.upload
  );

router.route("/:file").get(fileController.getFile);

export default router;
