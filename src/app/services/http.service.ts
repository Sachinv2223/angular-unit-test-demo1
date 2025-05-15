import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, body: any) {
    return this.http.post(url, body);
  }

  put(url: string, body: any) {
    return this.http.put(url, body);
  }

  delete(url: string) {
    return this.http.delete(url);
  }

  patch(url: string, body: any) {
    return this.http.patch(url, body);
  }

  head(url: string) {
    return this.http.head(url);
  }

  options(url: string) {
    return this.http.options(url);
  }
}


