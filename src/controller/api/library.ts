import PlaylistRequestDTO from "../../dtos/request/playlist/PlaylistRequestDTO";
import { BaseErrorMessage } from "../../messages/error/base";
import { BaseSuccesMessage } from "../../messages/success/base";
import { albumService } from "../../service/album";
import { libraryService } from "../../service/library";

const LibraryController = {
  removePlaylist: async (req, res, next) => {
    try {
      const { playlistId } = req.body;
      const resposne = await libraryService.removePlaylist(req, playlistId);
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  removeSongOutOfPlayingList: async (req, res, next) => {
    try {
      const { songId } = req.body;
      const resposne = await libraryService.removeSongOutOfPlayingList(
        req,
        songId
      );
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  removeSongOutOfPlaylist: async (req, res, next) => {
    try {
      const { songId, playlistId } = req.body;
      const resposne = await libraryService.removeSongOutOfPlaylist(
        songId,
        playlistId
      );
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  addSongToPlaylist: async (req, res, next) => {
    try {
      const { songId, playlistId } = req.body;
      const resposne = await libraryService.addSongToPlaylist(
        songId,
        playlistId
      );
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  getOwnPlaylist: async (req, res, next) => {
    try {
      const resposne = await libraryService.getOwnPlaylist(req);
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  addToPlayingList: async (req, res, next) => {
    try {
      const { songId } = req.params;

      const resposne = await libraryService.addToPlayingList(req, songId);
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  createPlaylist: async (req, res, next) => {
    try {
      const playListRequest = new PlaylistRequestDTO(req.body);
      const resposne = await libraryService.createPlaylist(
        req,
        playListRequest
      );
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  getPlaylist: async (req, res, next) => {
    try {
      const resposne = await libraryService.getPlaylist(req);
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  playingNewPlaylist: async (req, res, next) => {
    try {
      const { albumId, isNew } = req.query;
      const resposne = await libraryService.playingNewPlaylist(
        req,

        albumId
      );
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      const resposne = await libraryService.get(req);
      return res.success(BaseSuccesMessage.SUCCESS, resposne);
    } catch (err) {
      next(err);
    }
  },
  getRecentAlbum: async (req, res, next) => {
    try {
      const recentAlbums = await libraryService.getRecentAlbum(req);
      return res.success(BaseSuccesMessage.SUCCESS, recentAlbums);
    } catch (err) {
      next(err);
    }
  },
  addAlbumHistory: async (req, res, next) => {
    try {
      const { albumId } = req.params;
      const response = await libraryService.addAlbumHistory(req, albumId);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
  likeArtist: async (req, res, next) => {
    try {
      const { artistId } = req.params;
      const response = await libraryService.likeArtist(req, artistId);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
  likeSong: async (req, res, next) => {
    try {
      const { songId } = req.params;
      const response = await libraryService.likeSong(req, songId);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
  likeAlbum: async (req, res, next) => {
    try {
      const { albumId } = req.params;
      const response = await libraryService.likeAlbum(req, albumId);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
};

export default LibraryController;
