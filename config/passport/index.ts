import {
  FACEBOOK_SCOPE,
  GITHUB_SCOPE,
  GOOGLE_SCOPE,
} from "../../src/constants/scope";
import env from "../env";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = env.google.client_id;
const GOOGLE_CLIENT_SECRET = env.google.client_secret;
const GOOGLE_CALLBACK_URI = env.google.callback_uri;

const GITHUB_CLIENT_ID = env.github.client_id;
const GITHUB_CLIENT_SECRET = env.github.client_secret;
const GITHUB_CALLBACK_URI = env.github.callback_uri;

const FACEBOOK_APP_ID = env.facebook.app_id;
const FACEBOOK_APP_SECRET = env.facebook.app_secret;
const FACEBOOK_CALLBACK_URI = env.facebook.callback_uri;

const CLIENT_URL = env.app_uri;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CLIENT_URL + GOOGLE_CALLBACK_URI,
      scope: GOOGLE_SCOPE.scope,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      scope: GITHUB_SCOPE.scope,
      callbackURL: CLIENT_URL + GITHUB_CALLBACK_URI,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: CLIENT_URL + FACEBOOK_CALLBACK_URI,
      profileFields: FACEBOOK_SCOPE.profileFields,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
