export interface PageResult<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
}

export const emtyPageResult: PageResult<never> = {
  content: [],
  number: 0,
  size: 0,
  totalElements: 0,
};
