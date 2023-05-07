import env from "../../../../config/env";
import querystring from "querystring";
import { IOAuth2ServiceDemo } from "./interface";
import { getTokens } from "../../helper/oauth2/token";
import axios from "axios";

const oauth2ServiceTest: IOAuth2ServiceDemo = {
  getGoogleAuthUrl: async () => {
    const app_port = "http://localhost:" + env.port;
    const redirectUri = env.google.redirect_uri;
    const gooole_client_id = env.google.client_id;
    const scope = env.google.scope;
    const root_url = env.google.url;
    const options = {
      redirect_uri: `${app_port}/${redirectUri}`,
      client_id: gooole_client_id,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: scope.join(" "),
    };
    const result = `${root_url}?${querystring.stringify(options)}`;
    return result;
  },
  getUserFromGoogle: async (req) => {
    const code = req.query.code as string;
    const gooole_client_id = env.google.client_id;
    const google_client_secret = env.google.client_secret;
    const app_port = "http://localhost:" + env.port;
    const redirectUri = env.google.redirect_uri;
    const { id_token, access_token } = await getTokens({
      code,
      clientId: gooole_client_id,
      clientSecret: google_client_secret,
      redirectUri: `${app_port}/${redirectUri}`,
    });
    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });

    return googleUser;
  },
};

export default oauth2ServiceTest;
