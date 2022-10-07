import { PaginationModel } from './PaginationModel';

export interface PaginateableTableWithLanguage {
  onAlbanianTablePaginationValuesChange(values: PaginationModel),
  albanianPaginationModel: PaginationModel,
  onEnglishTablePaginationValuesChange(values: PaginationModel),
  englishPaginationModel: PaginationModel
}
