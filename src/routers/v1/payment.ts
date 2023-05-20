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
  .route("/zalo-pay/payment")
  .get(authMiddleWare.requireLogin, PaymentController.ZaloPayPayment);
router
  .route("/zalo-pay/check")
  .get(
    authMiddleWare.requireLogin,
    PaymentController.ZaloPayCheckStatusTransaction
  );
router
  .route("/momo/payment")
  .get(authMiddleWare.requireLogin, PaymentController.MoMoPayment);
router.route("/momo/check").get(PaymentController.MoMoCheckStatusTransaction);

export default router;
