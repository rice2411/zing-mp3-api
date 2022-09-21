export interface IOAuth2ServiceDemo {
  getGoogleAuthUrl: () => Promise<string>;
  getUserFromGoogle: (req: any) => Promise<any>;
}
