import * as express from "express";
import fileUpload from "express-fileupload";
import { ACCEPTED_FILE } from "../../constants/file";
import artistController from "../../controller/api/artist";
import fileController from "../../controller/api/file";
import fileMiddleWare from "../../middlewares/file/fileMiddleWare";
import PaymentController from "../../controller/api/payment";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";

const router = express.Router();

router
  .route("/zalo-pay")
  .get(authMiddleWare.requireLogin, PaymentController.payment);
router.route("/check").get(PaymentController.checkPayment);

export default router;
