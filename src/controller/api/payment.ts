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
  MoMoPayment: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);
    const apphost = env.app_host;
    const config = {
      partnerCode: "MOMOIQA420180417",
      accessKey: "Q8gbQHeDesB2Xs0t",
      secretKey: "PPuDXq1KowPT1ftR8DvlQTHhC03aul17",
      endpoint: "https://test-payment.momo.vn/gw_payment/transactionProcessor",
    };
    const transID = Math.floor(Math.random() * 1505351853752);
    const order = {
      partnerCode: config.partnerCode,
      accessKey: config.accessKey,
      requestId: `${moment().format("YYMMDD")}${transID}`,
      amount: "1000",
      orderId: Math.floor(Math.random() * 1000000000000).toString(),
      orderInfo: `ZingMp3 - Payment for Vip Account #${transID}`,
      returnUrl: apphost,
      notifyUrl: "https://momo.vn/notify",

      extraData: "",
    };
    let result = "";
    Object.keys(order).find((key) => {
      result += `${key}=${order[key]}&`;
    });
    const signature = cryptojs
      .HmacSHA256(result.slice(0, -1), config.secretKey)
      .toString();

    const param = {
      ...order,
      signature: signature,
      requestType: "captureMoMoWallet",
    };
    axios({ method: "post", url: config.endpoint, data: param })
      .then((res2) => {
        return res.success(BaseSuccesMessage.SUCCESS, res2.data);
      })
      .catch((err) => next(err));
  },
  MoMoCheckStatusTransaction: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);
    const config = {
      partnerCode: "MOMOIQA420180417",
      accessKey: "Q8gbQHeDesB2Xs0t",
      secretKey: "PPuDXq1KowPT1ftR8DvlQTHhC03aul17",
      endpoint: "https://test-payment.momo.vn/gw_payment/transactionProcessor",
    };
    const { requestId, orderId, description } = req.query;
    const order = {
      partnerCode: config.partnerCode,
      accessKey: config.accessKey,
      requestId: requestId,
      orderId: orderId,
      requestType: "transactionStatus",
    };

    let result = "";
    Object.keys(order).find((key) => {
      result += `${key}=${order[key]}&`;
    });
    const signature = cryptojs
      .HmacSHA256(result.slice(0, -1), config.secretKey)
      .toString();
    const param = {
      ...order,
      signature: signature,
    };

    axios({ method: "post", url: config.endpoint, data: param })
      .then(async function (response) {
        const errorCode = response?.data?.errorCode;
        if (errorCode == 0) {
          await userService.activeVip(info._id);
          await transactionService.create({
            userId: info._id,
            value: response?.data.amount,
            status: errorCode + 1,
            app_trans_id: orderId,
            description: description,
            type: "momo",
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
  ZaloPayPayment: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);
    const apphost = env.app_host;
    const config = {
      app_id: "2553",
      key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
      key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create",
    };

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const app_trans_id = `${moment().format("YYMMDD")}_${transID}`;
    const description = `ZingMp3 - Payment for Vip Account for ${transID}`;
    const embed_data = {
      redirecturl:
        apphost + `?description=${description}&apptransid=${app_trans_id}`,
    };
    const order: any = {
      app_id: config.app_id,
      app_trans_id: app_trans_id, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: info.username,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 1000,
      description: description,
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
  ZaloPayCheckStatusTransaction: async (req, res, next) => {
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
            type: "zalopay",
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
