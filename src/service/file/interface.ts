export interface IFileService {
  upload: (files: any) => Promise<any>;
  get: (fileName: string, res: any, next: any) => Promise<any>;
  delete: (fileName: string) => Promise<any>;
}
