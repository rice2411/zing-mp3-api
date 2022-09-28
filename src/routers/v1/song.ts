import * as express from "express";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";
import songController from "../../controller/api/song";

const router = express.Router({ mergeParams: true });

router.route("/").get(songController.list);

router.route("/:id").get(songController.get);

export default router;
