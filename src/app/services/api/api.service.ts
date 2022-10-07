import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private storage: StorageService) { }

  get(uri: string) {
    return this.httpClient.get(`${environment.basePath}${uri}`);
  }

  post(uri: string, data: any) {
    return this.httpClient.post(`${environment.basePath}` + uri, data);
  }

  put(uri: string, data: any) {
    return this.httpClient.put(`${environment.basePath}` + uri, data);
  }

  delete(uri: string) {
    return this.httpClient.delete(`${environment.basePath}` + uri);
  }
}
