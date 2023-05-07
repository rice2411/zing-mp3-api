export interface ISearchService {
  suggestSearch: (textSearch: string) => Promise<any>;
  searchFull: (option: any) => Promise<any>;
  queryAll: (query: any) => Promise<any>;
}
