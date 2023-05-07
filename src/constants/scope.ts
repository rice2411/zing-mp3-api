export const FACEBOOK_SCOPE = {
  profileFields: [
    "id",
    "emails",
    "gender",
    "link",
    "locale",
    "name",
    "timezone",
    "updated_time",
    "verified",
    "photos",
    "hometown",
    "friends",
  ],
  scope: ["email"],
};
export const GOOGLE_SCOPE = {
  scope: ["profile", "email"],
};

export const GITHUB_SCOPE = {
  scope: ["user:email"],
};
