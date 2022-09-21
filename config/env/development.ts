import { config } from "dotenv";
config();
const { NODE_RICE_APP_PORT, NODE_RICE_APP_HOST, NODE_RICE_APP_URI } =
  process.env;

export default {
  env: "development",
  db: `mongodb+srv://unclerice:023657@cluster0.q7mqbnf.mongodb.net/CompanyDB?retryWrites=true&w=majority`,
  port: NODE_RICE_APP_PORT,
  app_host: NODE_RICE_APP_HOST,
  app_uri: NODE_RICE_APP_URI,
  jwt: {
    secret: "2b06c243-4e10-427a-ba57-7de64e11deee",
    expiresIn: "1y",
  },
  mail: {
    service: "gmail",
    root: "minhrice.dev@gmail.com",
    key: "ausl qjfp zukd wqkj",
    secret: "8e244dcc-8b42-4ae9-8d2b-cec49aa1ec5c",
    expiresIn: "30m",
  },
  otp: {
    secret: "16c2ae54-4f41-4641-b922-bdf979fe063c",
    expiresIn: "30m",
  },
  oauth2Jwt: {
    secret: "e342cc8d-e3d0-4b8f-be36-e3e189ca3de6",
    expiresIn: "1m",
  },
  sms: {
    sid: "AC01078c94d9b3781bdf184750450fcbd6",
    auth_token: "4ab7deffc7428b3c6cb6ea4de7119787",
  },
  google: {
    url: "https://accounts.google.com/o/oauth2/v2/auth",
    client_id:
      "409604480079-jbtu4kj3jegskujbkiebvr0h3s9s7jg4.apps.googleusercontent.com",
    client_secret: "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",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    callback_uri: "/api/v1/oauth2/google/callback",
  },
  facebook: {
    app_id: "767995737742575",
    app_secret: "3f7d71f56196e7e863c30d1ca0793eaa",
    callback_uri: "/api/v1/oauth2/facebook/callback",
  },
  github: {
    client_id: "f33c52f643a2e0a1b86c",
    client_secret: "29fb250dfe8d9d7adb7995d1f0e161511eda5811",
    callback_uri: "/api/v1/oauth2/github/callback",
  },
};
