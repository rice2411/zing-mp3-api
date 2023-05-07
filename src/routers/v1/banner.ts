import * as express from "express";

import bannerController from "../../controller/api/banner";

const router = express.Router({ mergeParams: true });

router.route("/get-all").get(bannerController.getAll);

export default router;
