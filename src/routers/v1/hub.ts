import * as express from "express";

import HubController from "../../controller/api/hub";

const router = express.Router({ mergeParams: true });

router.route("/get-all").get(HubController.getAll);
router.route("/get/:hubId").get(HubController.get);

export default router;
