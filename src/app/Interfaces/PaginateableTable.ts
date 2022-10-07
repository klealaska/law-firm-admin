import { PaginationModel } from './PaginationModel';

export interface PaginateableTable {
  onPaginationValuesChange(values: PaginationModel),
  paginationModel: PaginationModel
}
