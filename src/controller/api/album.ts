import { PAGING_DEFAULT } from "../../constants/paging";
import QueryOptions from "../../dtos/QueryOptions";
import { BaseErrorMessage } from "../../messages/error/base";
import { BaseSuccesMessage } from "../../messages/success/base";
import { albumService } from "../../service/album";

const AlbumController = {
  update: async (req, res, next) => {
    try {
      const { name, description, typeIds, albumId, artistId } = req.body;
      const files = req.files;
      const result = await albumService.update({
        albumId: albumId,
        name: name,
        description: description,
        typeIds: JSON.parse(typeIds),
        avatar: files,
        artistId: JSON.parse(artistId),
      });
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { albumId } = req.params;
      const result = await albumService.delete(albumId);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, description, artistId, typeIds } = req.body;
      const files = req.files;
      const result = await albumService.create({
        name: name,
        description: description,
        typeIds: JSON.parse(typeIds),
        artistId: JSON.parse(artistId),
        image: files,
      });
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const search = req?.query.search;
      const options: QueryOptions = {
        page: req?.query.page ?? PAGING_DEFAULT.PAGE,
        limit: req?.query.limit ?? PAGING_DEFAULT.LIMIT,
        search,
        is_paginate:
          req?.query?.is_paginate == false ||
          req?.query?.is_paginate == "false" ||
          req?.query?.is_paginate == 0
            ? false
            : true,
      };
      const response = await albumService.getAll({ isDelete: false }, options);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
  getNeighbourAlbum: async (req, res, next) => {
    try {
      const { typeId } = req.params;
      const result = await albumService.getNeighbourAlbum(typeId);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
  getDetailAlbum: async (req, res, next) => {
    try {
      const { albumId } = req.params;

      const album = await albumService.getDetailAlbum(albumId);
      return res.success(BaseSuccesMessage.SUCCESS, album);
    } catch (err) {
      next(err);
    }
  },
  getSuggestType: async (req, res, next) => {
    try {
      const { type } = req.query;
      const suggest = await albumService.getSuggestType(type);
      return res.success(BaseSuccesMessage.SUCCESS, suggest);
    } catch (err) {
      next(err);
    }
  },
  getTop100: async (req, res, next) => {
    try {
      const top100 = await albumService.getTop100();
      return res.success(BaseSuccesMessage.SUCCESS, top100);
    } catch (err) {
      next(err);
    }
  },
  getDailyTopic: async (req, res, next) => {
    try {
      const dailyTopic = await albumService.getDailyTopic();
      return res.success(BaseSuccesMessage.SUCCESS, dailyTopic);
    } catch (err) {
      next(err);
    }
  },
  getRecentAlbum: async (req, res, next) => {
    try {
      const recentSong = await albumService.getRecentAlbum(req);
      return res.success(BaseSuccesMessage.SUCCESS, recentSong);
    } catch (err) {
      next(err);
    }
  },
  getSuggestAlbum: async (req, res, next) => {
    try {
      const response = await albumService.getSuggestAlbum();
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
};

export default AlbumController;
