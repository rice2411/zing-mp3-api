import axios from "axios";
import { BaseErrorMessage } from "../../messages/error/base";
import { BaseSuccesMessage } from "../../messages/success/base";
import { albumService } from "../../service/album";
import cryptojs from "crypto-js";
import moment from "moment";
import qs from "qs";
import tokenService from "../../service/token";
import env from "../../../config/env";
import { userService } from "../../service/user";
import { transactionService } from "../../service/admin/transaction";

const PaymentController = {
  payment: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);
    const config = {
      app_id: "2553",
      key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
      key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create",
    };

    const embed_data = {};

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order: any = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: info.username,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 279000,
      description: `ZingMp3 - Payment for Vip Account #${transID}`,
      bank_code: "zalopayapp",
      mac: "",
    };

    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = cryptojs.HmacSHA256(data, config.key1).toString();

    axios
      .post(config.endpoint, null, { params: order })
      .then((res2) => {
        return res.success(BaseSuccesMessage.SUCCESS, [
          res2.data,
          order.app_trans_id,
          order.description,
        ]);
      })
      .catch((err) => next(err));
  },
  checkPayment: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);
    const config = {
      app_id: "2553",
      key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
      key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
      endpoint: "https://sb-openapi.zalopay.vn/v2/query",
    };
    const { app_trans_id, description } = req.query;
    const postData = {
      app_id: config.app_id,
      app_trans_id: app_trans_id, // Input your app_trans_id
      mac: "",
    };

    const data =
      postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = cryptojs.HmacSHA256(data, config.key1).toString();

    axios
      .post(config.endpoint, qs.stringify(postData), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(async function (response) {
        const return_code = response?.data?.return_code;
        if (return_code == 1) {
          await userService.activeVip(info._id);
          await transactionService.create({
            userId: info._id,
            value: response?.data.amount,
            status: return_code,
            app_trans_id: app_trans_id,
            description: description,
          });
        }
        return res.success(BaseSuccesMessage.SUCCESS, response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // axios(postConfig)
    //   .then(async function (response) {
    //     const data = response.data;

    //     return res.success(BaseSuccesMessage.SUCCESS, data);
    //   })
    //   .catch(function (error) {
    //     next(error);
    //   });
  },
};

export default PaymentController;
