import { userService } from "../../service/user";
import QueryOptions from "../../dtos/QueryOptions";
import { PAGING_DEFAULT } from "../../constants/paging";
import UpdateUserRequestDTO from "../../dtos/request/user/UpdateUserRequestDTO";
import RegisterRequestDTO from "../../dtos/request/auth/RegisterRequestDTO";
import { BaseSuccesMessage } from "../../messages/success/base";

const userController = {
  list: async (req, res, next) => {
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
      const result = await userService.list(options);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userService.get(userId);
      return res.success(BaseSuccesMessage.SUCCESS, user);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const files = req.files;
      let params = {};
      if (files) {
        params = {
          ...req.body,
          avatarUpload: files,
        };
      } else {
        params = {
          ...req.body,
        };
      }
      const requestUpdate = new UpdateUserRequestDTO().requestDTO(params);
      const updateUser = await userService.update(requestUpdate, userId);
      return res.success(BaseSuccesMessage.SUCCESS, updateUser);
    } catch (error) {
      next(error);
    }
  },
  deactive: async (req, res, next) => {
    try {
      const listUserId = req.body.listUserId;
      const updateUser = await userService.deactive(listUserId);
      return res.success(BaseSuccesMessage.SUCCESS, updateUser);
    } catch (error) {
      next(error);
    }
  },
  get_me: async (req, res, next) => {
    try {
      const user = await userService.get_me(req);
      return res.success(BaseSuccesMessage.SUCCESS, user);
    } catch (err) {
      next(err);
    }
  },
  removeDataTest: async (req, res, next) => {
    try {
      const result = await userService.removeDataTest();
      return res.success(BaseSuccesMessage.SUCCESS, null);
    } catch (err) {
      next(err);
    }
  },
  importListUser: async (req, res, next) => {
    try {
      const { listUser } = req.body;
      let request = [];
      listUser.map((user) => {
        const newUser = new RegisterRequestDTO(user);
        request.push(newUser);
      });
      const result = await userService.importListUser(request);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
