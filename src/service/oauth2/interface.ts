export interface IOAuth2Service {
  success: (data: any) => Promise<any>;
  get: (data: any) => Promise<any>;
}
