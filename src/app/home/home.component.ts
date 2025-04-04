import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import {CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
    imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  searchQuery: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  sortBy: string = 'name';
  order: string = 'asc';

  category: string = '';
  minPrice?: number;
  maxPrice?: number;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts(this.currentPage, this.pageSize, this.sortBy, this.order).subscribe(
      (response) => {
        this.products = response.content;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  applyFilters(): void {
    this.currentPage = 0; // Reset page when applying filters
    this.productService
      .filterProducts(this.category, this.minPrice, this.maxPrice, this.currentPage, this.pageSize, this.sortBy, this.order)
      .subscribe(
        (response) => {
          this.products = response.content;
          this.totalPages = response.totalPages;
        },
        (error) => {
          console.error('Error fetching filtered products', error);
        }
      );
  }  

  clearFilters(): void {
    this.category = '';
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.applyFilters();
  }

  searchProducts(): void {
    if (this.searchQuery.trim()) {
      this.productService.searchProducts(this.searchQuery).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error searching products', error);
        }
      );
    } else {
      this.loadProducts(); // Reset to all products if search is empty
    }
  }

  changePage(next: boolean): void {
    if (next && this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    } else if (!next && this.currentPage > 0) {
      this.currentPage--;
    }
    this.loadProducts();
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product);
    // Implement cart functionality here
  }
}
