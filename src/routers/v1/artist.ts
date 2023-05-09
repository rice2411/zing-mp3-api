import * as express from "express";
import fileUpload from "express-fileupload";
import { ACCEPTED_FILE } from "../../constants/file";
import artistController from "../../controller/api/artist";
import fileController from "../../controller/api/file";
import fileMiddleWare from "../../middlewares/file/fileMiddleWare";

const router = express.Router({ mergeParams: true });

router.route("/appear-in/:artistId").get(artistController.appearIn);
router.route("/get/:artistId").get(artistController.get);
router.route("/get-all").get(artistController.getAll);
router
  .route("/")
  .put(fileUpload({ createParentPath: true }), artistController.update)
  .post(fileUpload({ createParentPath: true }), artistController.create);
router.route("/:artistId").delete(artistController.delete);
export default router;
