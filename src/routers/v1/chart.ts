import * as express from "express";
import fileUpload from "express-fileupload";
import { ACCEPTED_FILE } from "../../constants/file";
import artistController from "../../controller/api/artist";
import chartController from "../../controller/api/chart";
import fileController from "../../controller/api/file";
import fileMiddleWare from "../../middlewares/file/fileMiddleWare";

const router = express.Router();

router.route("/get").get(chartController.get);

export default router;
