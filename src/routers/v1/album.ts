import fileUpload from "express-fileupload";
import * as express from "express";
import AlbumController from "../../controller/api/album";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";

const router = express.Router({ mergeParams: true });

router
  .route("/get-recent")
  .get(authMiddleWare.requireLogin, AlbumController.getRecentAlbum);
router.route("/get-suggest").get(AlbumController.getSuggestAlbum);
router.route("/get-daily-topic").get(AlbumController.getDailyTopic);
router.route("/get-top100").get(AlbumController.getTop100);
router.route("/get-suggest-type").get(AlbumController.getSuggestType);
router.route("/get-neighbour/:typeId").get(AlbumController.getNeighbourAlbum);
router.route("/get-all").get(AlbumController.getAll);
router
  .route("/")
  .put(fileUpload({ createParentPath: true }), AlbumController.update)
  .post(fileUpload({ createParentPath: true }), AlbumController.create);
router
  .route("/:albumId")
  .get(AlbumController.getDetailAlbum)
  .delete(AlbumController.delete);
export default router;
