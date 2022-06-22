export interface IPaginationList<T> {
  page: number;
  count: number;
  limit: number;
  data: T;
}
