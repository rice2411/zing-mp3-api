import * as express from "express";

import bannerController from "../../controller/api/banner";
import TransactionController from "../../controller/api/transaction";

const router = express.Router({ mergeParams: true });

router.route("/get-all").get(TransactionController.getAll);
router.route("/statistic").get(TransactionController.statistic);

export default router;
