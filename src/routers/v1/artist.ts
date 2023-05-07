import * as express from "express";
import fileUpload from "express-fileupload";
import { ACCEPTED_FILE } from "../../constants/file";
import artistController from "../../controller/api/artist";
import fileController from "../../controller/api/file";
import fileMiddleWare from "../../middlewares/file/fileMiddleWare";

const router = express.Router();

router.route("/appear-in/:artistId").get(artistController.appearIn);
router.route("/get/:artistId").get(artistController.get);
router.route("/get-all").get(artistController.getAll);
export default router;
