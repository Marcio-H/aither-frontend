export interface TableColumn<T> {
  field: RecursiveKeyOf<T>;
  header: string;
  width?: string;
  type: TableValueTypes;
  converter?: (value: any, item: T, index: number) => string | HTMLElement;
}

type TableValueTypes =
  | 'boolean'
  | 'double'
  | 'money'
  | 'date'
  | 'time'
  | 'dateTime'
  | 'string'
  | 'enum'
  | 'integer'
  | 'entity'
  | 'percent';

type RecursiveKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object ? `${K}` | `${K}.${StringNumberKeyOf<T[K]>}` : `${K}`;
}[keyof T & (string | number)];

type StringNumberKeyOf<T> = {
  [K in keyof T & (string | number)]: `${K}`;
}[keyof T & (string | number)];
