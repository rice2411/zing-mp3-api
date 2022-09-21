import * as express from "express";

import mailController from "../../controller/api/mail";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";

const router = express.Router();
router.route("/").post(authMiddleWare.requireLogin, mailController.sendMail);
router
  .route("/verify")
  .get(authMiddleWare.requireLogin, mailController.verify)
  .post(mailController.confirmVerify);

export default router;
