class ApiPaginateResult {
  private docs: any;
  private page: number;
  private limit: number;
  private totalDocs: number;
  private totalPages: number;

  constructor(dto) {
    this.docs = dto.docs;
    this.page = dto.page ?? 1;
    this.limit = dto.limit ?? 20;
    this.totalDocs = dto.totalDocs;
    this.totalPages = dto.totalPages;
  }

  public toRESPONSE = () => ({
    data: this.docs,
    paginate: {
      page: this.page,
      limit: this.limit,
      totalDocs: this.totalDocs,
      totalPages: this.totalPages,
    }
  })
}

export { ApiPaginateResult };
