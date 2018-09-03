import { Product } from './../models/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;
  private defaultProduct = { ID: null, Name: '', Description: '', Price: null };
  
  @Input('product')
  set productSet(value: Product) {
    this.clear();
    if (value !== undefined) {
      this.product = Object.assign({}, value);
    }
  }

  @Input()
  private panMode:string;

  @Output() closeDetailsPane = new EventEmitter();

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }
  save() {
    if (this.panMode ==='Create') {
      this.productsService.create(this.product);
    } else {
      this.productsService.updateProduct(this.product);
    }
    this.clearData();
  }
  clear() {
    this.product = this.defaultProduct = { ID: null, Name: '', Description: '', Price: null };
  }
  clearData(){
    this.clear();
    this.closeDetailsPane.emit();
  }
}
