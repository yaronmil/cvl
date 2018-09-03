import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { Observable , Subject } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSubject = new Subject<Product[]>();
  public products$: Observable<Product[]> = this.productsSubject.asObservable();
  private store: Product[] = [{
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
    // returning a clone of the store - so changes cannot be mad to store outside this service
    this.productsSubject.next( [... this.store] );
  }
  deleteProduct(id: number) {
    this.store = this.store.filter(p => p.ID !== id);
    // triggering the observable to notify data changed
    this.getProducts();
  }
  updateProduct(product: Product) {
    const inx = this.store.findIndex(d => d.ID === product.ID);
    // replacing with new product
    this.store[inx] = product;
    this.getProducts();
  }
  createProduct(product: Product): Product {
    // finding the max id
    const maxId = this.store.map(d => d.ID).reduce((prev: number, current: number) => {
      return (prev > current) ? prev : current;
    });
    product.ID = maxId + 1;
    this.store.push(product);
    this.getProducts();

    // returning the product including his new id
    return product;
  }
}
