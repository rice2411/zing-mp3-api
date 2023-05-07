import * as express from "express";
import AlbumController from "../../controller/api/album";
import authMiddleWare from "../../middlewares/auth/authenMiddleWare";
import LibraryController from "../../controller/api/library";

const router = express.Router({ mergeParams: true });
router.route("/get").get(authMiddleWare.requireLogin, LibraryController.get);
router
  .route("/get-recent-album")
  .get(authMiddleWare.requireLogin, LibraryController.getRecentAlbum);
router
  .route("/like-song/:songId")
  .get(authMiddleWare.requireLogin, LibraryController.likeSong);
router
  .route("/like-album/:albumId")
  .get(authMiddleWare.requireLogin, LibraryController.likeAlbum);
router
  .route("/like-artist/:artistId")
  .get(authMiddleWare.requireLogin, LibraryController.likeArtist);
router
  .route("/add-album-history/:albumId")
  .get(authMiddleWare.requireLogin, LibraryController.addAlbumHistory);
router
  .route("/play-new-playlist")
  .get(authMiddleWare.requireLogin, LibraryController.playingNewPlaylist);
router
  .route("/get-playlist")
  .get(authMiddleWare.requireLogin, LibraryController.getPlaylist);
router
  .route("/create-playlist")
  .post(authMiddleWare.requireLogin, LibraryController.createPlaylist);
router
  .route("/add-to-playing-list/:songId")
  .post(authMiddleWare.requireLogin, LibraryController.addToPlayingList);
router
  .route("/get-own-playlist")
  .get(authMiddleWare.requireLogin, LibraryController.getOwnPlaylist);
router
  .route("/add-song-to-playlist")
  .post(authMiddleWare.requireLogin, LibraryController.addSongToPlaylist);
router
  .route("/remove-song-out-of-playlist")
  .post(authMiddleWare.requireLogin, LibraryController.removeSongOutOfPlaylist);
router
  .route("/remove-song-out-of-playing-list")
  .post(
    authMiddleWare.requireLogin,
    LibraryController.removeSongOutOfPlayingList
  );
router
  .route("/remove-playlist")
  .post(authMiddleWare.requireLogin, LibraryController.removePlaylist);

export default router;
