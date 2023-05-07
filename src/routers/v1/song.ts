import * as express from "express";

import songController from "../../controller/api/song";

const router = express.Router({ mergeParams: true });

router.route("/").post(songController.create);
router.route("/get-new-release").get(songController.getNewRelease);
router.route("/increase-views/:songId").get(songController.increaseViews);
router.route("/get-lyrics/:songId").get(songController.getLyrics);
router.route("/get-all").get(songController.getAll);
router.route("/:id").get(songController.get);

export default router;
