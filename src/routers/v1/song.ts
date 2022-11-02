import * as express from "express";

import songController from "../../controller/api/song";

const router = express.Router({ mergeParams: true });

router.route("/:id").get(songController.get);

router.route("/").get(songController.list).post(songController.create);

export default router;
