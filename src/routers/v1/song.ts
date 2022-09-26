import * as express from "express";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";
import songController from "../../controller/api/song";

const router = express.Router({ mergeParams: true });

router.route("/").get(authMiddleWare.requireLogin, songController.list);

export default router;
