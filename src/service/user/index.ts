import mongoose from "mongoose";
import env from "../../../config/env";
import QueryOptions from "../../dtos/QueryOptions";
import UpdateUserRequestDTO from "../../dtos/request/user/UpdateUserRequestDTO";
import CreateUserResponseDTO from "../../dtos/response/user/CreateUserResponseDTO";
import UserResponseDTO from "../../dtos/response/user/UserResponseDTO";

import { User } from "../../models";
import { userQuery } from "../../queries";

import { AuthErrorMessage } from "../../messages/error/auth";
import fileService from "../file/file";
import tokenService from "../token";

import { IUserService } from "./interface";
import { UserErrorMessage } from "../../messages/error/user";
import { UserSuccessMessage } from "../../messages/success/user";
import { PROVIDER } from "../../constants/provider";
import GoogleRequestDTO from "../../dtos/request/oatuh2/GoogleRequestDTO";
import { NAME_DEFAULT } from "../../constants/user";
import FacebookRequestDTO from "../../dtos/request/oatuh2/FacbookRequestDTO";
import GitHubRequestDTO from "../../dtos/request/oatuh2/GitHubRequestDTO";

const userService: IUserService = {
  get: async (id) => {
    try {
      const query = { _id: new mongoose.Types.ObjectId(id), is_active: true };
      const user = await userQuery.getById(query);
      if (!user)
        return Promise.reject(new Error(UserErrorMessage.USER_NOT_FOUND));
      const response = new UserResponseDTO().responseDTO(user);
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  list: async (options: QueryOptions) => {
    const query = {
      is_active: true,
    };
    const users = await userQuery.getAllUser(query, options);
    return Promise.resolve(users);
  },
  update: async (
    request: UpdateUserRequestDTO,
    userId: mongoose.Types._ObjectId
  ) => {
    try {
      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(userId),
      });
      if (!user)
        return Promise.reject(new Error(UserErrorMessage.USER_NOT_FOUND));

      if (request.first_name) {
        user.first_name = request.first_name;
      }
      if (request.last_name) {
        user.last_name = request.last_name;
      }
      if (request.avatarUpload) {
        const file = request.avatarUpload;
        const response = await fileService.upload(file);
        if (response) {
          user.avatar = response.name;
        }
      }
      if (request.email) {
        const emailFound = await User.findOne({
          email: request.email,
        });

        if (emailFound && user.email != request.email) {
          return Promise.reject(new Error(AuthErrorMessage.EMAIL_IS_EXIST));
        }
        user.email = request.email;
      }
      if (request.phone) {
        user.phone = request.phone;
      }

      const userUpdate = await user.saveAsync();

      const response = new UserResponseDTO().responseDTO(userUpdate);
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  deactive: async (listUserId: [mongoose.Types._ObjectId]) => {
    try {
      await Promise.all(
        listUserId.map(async (userId) => {
          const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userId),
          });
          if (!user)
            return Promise.reject(new Error(UserErrorMessage.USER_NOT_FOUND));
          user.is_active = false;
          await user.saveAsync();
        })
      );
      return Promise.resolve(UserSuccessMessage.BLOCK_USER_SUCCESS);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  get_me: async (req) => {
    try {
      const token = req.headers.authorization.split(" ")[1].trim();
      const info = tokenService.verifyToken(token, env.jwt.secret);
      const user = await userService.get(info._id);
      return Promise.resolve(user);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  removeDataTest: async () => {
    try {
      const result = await User.remove({
        username: { $nin: ["rice", "chou"] },
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  importListUser: async (listUser) => {
    try {
      let canImport = true;
      await Promise.all(
        listUser.map(async (user) => {
          const userFound = await User.findOne({ username: user.username });
          if (userFound) {
            canImport = false;
            return Promise.reject(
              new Error(AuthErrorMessage.USERNAME_IS_EXIST)
            );
          }
        })
      );
      if (canImport) {
        await Promise.all(
          listUser.map(async (user, index) => {
            await userService.create(user, index);
          })
        );
        return Promise.resolve(UserSuccessMessage.IMPORT_LIST_USER_SUCCESS);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
  create: async (request, userCount) => {
    try {
      const userFound = await User.findOne({
        username: request._username,
      });
      if (userFound) {
        throw new Error(AuthErrorMessage.USERNAME_IS_EXIST);
      }
      const userCountCurrent = userCount
        ? (await User.countDocuments()) + 1 + userCount
        : (await User.countDocuments()) + 1;
      // Register success
      const newUserDTO = new CreateUserResponseDTO().toJSON(request);
      const newUser = {
        ...newUserDTO,
        first_name: NAME_DEFAULT + userCountCurrent,
        last_name: "",
      };
      const user = new User(newUser);
      const userSave = await user.saveAsync();
      const response = new UserResponseDTO().responseDTO(userSave);
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  createOauth2: async (data) => {
    try {
      const provider = data.provider;
      if (provider == PROVIDER.GOOGLE) {
        const newUser = new GoogleRequestDTO(data);
        const user = new User(newUser);
        const userSave = await user.saveAsync();
        const response = new UserResponseDTO().responseDTO(userSave);
        return Promise.resolve(response);
      }
      if (provider == PROVIDER.FACEBOOK) {
        const newUser = new FacebookRequestDTO(data);
        const user = new User(newUser);
        const userSave = await user.saveAsync();
        const response = new UserResponseDTO().responseDTO(userSave);
        return Promise.resolve(response);
      }
      if (provider == PROVIDER.GITHUB) {
        const newUser = new GitHubRequestDTO(data);
        const user = new User(newUser);
        const userSave = await user.saveAsync();
        const response = new UserResponseDTO().responseDTO(userSave);
        return Promise.resolve(response);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export { userService };
