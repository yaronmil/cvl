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
  // public products$: Observable<Product[]>;
  public products: Product[];
  public selectedProduct: Product;
  private showDetailsPane = false;
  private paneMode:string;
  constructor(private productsService: ProductsService) {
    // this.products$ = this.productsService.products$;
     this.productsService.products$.subscribe(d => this.products = d);
   }
  ngOnInit() {
    this.productsService.getProducts();
  }
  deleteItem(id: number) {
    if (confirm('Are You Sure ??')) {
      this.productsService.deleteProduct(id);
    }
  }
  editProduct(product: Product) {
    this.paneMode = 'Edit';
    this.selectedProduct = product;
    this.showDetailsPane = true;

  }
  createProduct(){
    this.selectedProduct = { ID: null, Name: '', Description: '', Price: null };
    this.paneMode = 'Create';
    this.showDetailsPane = true;
  }
  closePane(){
    this.showDetailsPane = false;
    this.selectedProduct=null;
  }
}
