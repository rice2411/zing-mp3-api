export interface IHubSerivce {
  getAll: () => Promise<any>;
  get: (hubId: String) => Promise<any>;
}
