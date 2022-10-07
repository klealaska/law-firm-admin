import { Pagination } from './../../Interfaces/Pagination';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LawCategoryService {

  private postAddEndpoint = 'lawCategories/add';
  private getEndpoint = 'lawCategories/getAll';
  private getByIdEndpoint = 'lawCategories/getById';
  private putUpdateEndpoint = 'lawCategories/update';
  private deleteEndpoint = 'lawCategories/delete';
  private reorderEndPoint = 'lawCategories/reorder';
  private getChaptersByLawIdEndpoint = 'lawCategories/getChaptersByLawId';
  private getSectionsByChapterIdEndpoint = 'lawCategories/getChapterWithSections';
  private getMainCategoriesEndpoint = 'lawCategories/getMainCategories';
  private getLawsByMainCategoryIdEndpoint = 'lawCategories/getLawsByMainCategory';
  private getLawsByLawGroupEndpoint = 'lawCategories/getLawsByLawGroup';
  private addTranslationEndpoint = 'lawCategories/AddTranslation';

  constructor(private apiService: ApiService) { }

  postAdd(data, language?) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.postAddEndpoint}`, data);
    } else {
      return this.apiService.post(this.postAddEndpoint, data);
    }
  }


  addTranslation(data, language?) {
    if (language != null) {
      return this.apiService.post(`${language}/${this.addTranslationEndpoint}`, data);
    } else {
      return this.apiService.post(this.postAddEndpoint, data);
    }
  }

  getAll(hasLimit, pagination?: Pagination, language?) {
    let url = `${this.getEndpoint}/${hasLimit}`;
    if (language != null) {
      url = `${language}/${url}`;
    }
    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  getAllMainCategories(language?, pagination?: Pagination) {
    let url = `${this.getMainCategoriesEndpoint}`;
    if (language != null) {
      url = `${language}/${url}`;
    }
    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  getLawsByMainCategoryId(parentId, language?, pagination?: Pagination) {
    let url = `${this.getLawsByMainCategoryIdEndpoint}/${parentId}`;
    if (language != null) {
      url = `${language}/${url}`;
    }
    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  getLawsByLawGroup(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.getLawsByLawGroupEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.getLawsByLawGroupEndpoint}/${id}`);
    }
  }

  getChaptersByLawId(lawId, language?, pagination?: Pagination) {
    let url = `${this.getChaptersByLawIdEndpoint}/${lawId}`;
    if (language != null) {
      url = `${language}/${url}`;
    }
    if (pagination != null) {
      url = `${url}?$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  getById(id, language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.getByIdEndpoint}/${id}`);
    } else {
      return this.apiService.get(`${this.getByIdEndpoint}/${id}`);
    }
  }

  getSectionsByChapterId(id?, language?, pagination?: Pagination) {
    let url = `${this.getSectionsByChapterIdEndpoint}`;
    if (id != null) {
      url = `${url}?chapterId=${id}&`;
    } else {
      url = `${url}?`;
    }
    if (language != null) {
      url = `${language}/${url}`;
    }
    if (pagination != null) {
      url = `${url}$skip=${pagination.Skip}&$top=${pagination.PageSize}`;
    }
    return this.apiService.get(url);
  }

  update(data, language?) {
    if (language != null) {
      return this.apiService.put(`${language}/${this.putUpdateEndpoint}`, data);
    } else {
      return this.apiService.put(this.putUpdateEndpoint, data);
    }
  }

  delete(id, language?) {
    if (language != null) {
      return this.apiService.delete(`${language}/${this.deleteEndpoint}/${id}`);
    } else {
      return this.apiService.delete(`${this.deleteEndpoint}/${id}`);
    }
  }

  reorder(language?) {
    if (language != null) {
      return this.apiService.get(`${language}/${this.reorderEndPoint}`);
    } else {
      return this.apiService.get(this.reorderEndPoint);
    }
  }
}
