export default interface PaginateResult {
  docs: any[];
  totalDocs: number;
  totalPages: number;
  limit: number;
  page: number;
}
