import { Product } from './../models/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  public product: Product;

  // is edit or create
  @Input()
  private panMode: string;

  // event telling parent to close the details
  @Output() closeDetailsPane = new EventEmitter();

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }
  save() {
    // some data validation
    if (!this.product.Name  || this.product.Name === '') {
      alert('product must have a name');
      return;
    }
    if (this.panMode === 'Create') {
      this.productsService.createProduct(this.product);
    } else {
      this.productsService.updateProduct(this.product);
    }
    this.clearData();
  }
  clearData() {
    this.closeDetailsPane.emit();
  }
}
