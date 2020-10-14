export type ColumnSortConfiguration = {
  columnName: string;
  sortOrder: string;
}

export type SearchRequest<Type> = {
  template: Type;
  listSortConfiguration?: ColumnSortConfiguration;
}