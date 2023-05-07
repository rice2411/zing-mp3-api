import * as express from "express";

import SearchController from "../../controller/api/search";

const router = express.Router();

router.route("/search-suggest").get(SearchController.suggestSearch);
router.route("/search-full").get(SearchController.searchFull);

export default router;
