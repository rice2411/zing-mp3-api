import * as express from "express";

import CountryController from "../../controller/api/country";

const router = express.Router({ mergeParams: true });

router.route("/get-4-options").get(CountryController.get4Options);

export default router;
