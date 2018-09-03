import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsSubject = new Subject<Product[]>();
  public products$: Observable<Product[]> = this.productsSubject.asObservable();
  private db: Product[] = [{
    ID: 1,
    Name: 'table',
    Description: 'very big table',
    Price: 10
  }, {
    ID: 2,
    Name: 'chair',
    Description: 'ortopedic chair',
    Price: 50
  }, {
    ID: 3,
    Name: 'iphone x',
    Description: 'the best cell phone ever',
    Price: 250
  }];
  constructor() {
   }

  getProducts() {
    this.productsSubject.next(this.db);
  }
  deleteProduct(id: number) {
    this.db = this.db.filter(p => p.ID !== id);
     this.productsSubject.next(this.db);
  }
  updateProduct(product: Product): Product {
    const productToUpdate = this.db.find(d => d.ID === product.ID);
    productToUpdate.Description = product.Description;
    productToUpdate.Name = product.Name;
    productToUpdate.Price = product.Price;
    // this.productsSubject.next(this.db);
    return product;
  }
  create(product: Product): Product {
    const maxIdProduct = this.db.reduce(function (prev: Product, current: Product) {
      return (prev.ID > current.ID) ? prev : current;
    });

    product.ID = maxIdProduct.ID + 1;
    this.db.push(product);
    return product;
  }
}
