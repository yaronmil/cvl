import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public products$: Observable<Product[]>;
  public selectedProduct: Product;
  private paneMode: string;
  constructor(private productsService: ProductsService) {

  }
  ngOnInit() {
    this.products$ = this.productsService.products$;
    this.getProducts();
  }
  getProducts() {
    // wait until async pipe subscribes to observable
    setTimeout(() => this.productsService.getProducts(), 0);
  }
  deleteProduct(id: number) {
    if (confirm('Are You Sure ??')) {
      this.productsService.deleteProduct(id);
      this.closePane();
    }
  }
  editProduct(product: Product) {
    this.paneMode = 'Edit';
    this.selectedProduct = Object.assign({}, product);
  }
  createProduct() {
    this.paneMode = 'Create';

    // creating new default product
    this.selectedProduct = new Product();
  }
  closePane() {
    this.selectedProduct = null;
  }
}
