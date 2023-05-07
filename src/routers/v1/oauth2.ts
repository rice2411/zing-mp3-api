import * as express from "express";
import { CALLBACK_URIS } from "../../../config/passport/callback";
import { FACEBOOK_SCOPE } from "../../constants/scope";

const passport = require("passport");
import oauth2Controller from "../../controller/api/oatuh2";

const router = express.Router();

router.route("/google").get(passport.authenticate("google"));
router
  .route("/google/callback")
  .get(passport.authenticate("google", CALLBACK_URIS));

router
  .route("/facebook")
  .get(passport.authenticate("facebook", FACEBOOK_SCOPE.scope));
router
  .route("/facebook/callback")
  .get(passport.authenticate("facebook", CALLBACK_URIS));

router.route("/github").get(passport.authenticate("github"));
router
  .route("/github/callback")
  .get(passport.authenticate("github", CALLBACK_URIS));

router.route("/success").get(oauth2Controller.success);
router.route("/login").post(oauth2Controller.login);

export default router;
