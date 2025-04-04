import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search?query=${query}`);
  }

  getAllProducts(page: number = 0, size: number = 10, sortBy: string = 'name', order: string = 'asc'): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}&sortBy=${sortBy}&order=${order}`);
  }
  filterProducts(category?: string, minPrice?: number, maxPrice?: number, page: number = 0, size: number = 10, sortBy: string = 'name', order: string = 'asc'): Observable<any> {
    let url = `${this.baseUrl}/filter?page=${page}&size=${size}&sortBy=${sortBy}&order=${order}`;
  
    if (category) url += `&category=${category}`;
    if (minPrice !== undefined) url += `&minPrice=${minPrice}`;
    if (maxPrice !== undefined) url += `&maxPrice=${maxPrice}`;
  
    return this.http.get<any>(url);
  }
  
}
