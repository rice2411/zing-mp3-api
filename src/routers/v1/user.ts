import * as express from "express";
import fileUpload from "express-fileupload";
import { ROLE } from "../../constants/role";
import userController from "../../controller/api/user";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";
import authorMiddleWare from "../../middlewares/auth/authorMiddleWare";

const router = express.Router({ mergeParams: true });
router.route("/").get(authMiddleWare.requireLogin, userController.list);
router.route("/get-me").get(authMiddleWare.requireLogin, userController.get_me);
router
  .route("/import-list")
  .post(
    authMiddleWare.requireLogin,
    authorMiddleWare.checkUserRole(ROLE.ROOT),
    userController.importListUser
  );
router
  .route("/remove-test-data")
  .delete(
    authMiddleWare.requireLogin,
    authorMiddleWare.checkUserRole(),
    userController.removeDataTest
  );
router
  .route("/deactive")
  .delete(
    authMiddleWare.requireLogin,
    authorMiddleWare.checkUserRole(ROLE.ADMIN),
    userController.deactive
  );
router
  .route("/:userId")
  .get(authMiddleWare.requireLogin, userController.get)
  .put(
    fileUpload({ createParentPath: true }),
    authMiddleWare.requireLogin,
    userController.update
  );

export default router;
