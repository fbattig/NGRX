import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app-state';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  products$: Observable<Product[]>;
  newProduct: string;
  id: number = 1;

  productSelected: Product;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select('products');
  }

  add() {
    this.store.dispatch({
      type: 'ADD',
      payload: { id: this.id++, title: this.newProduct },
    });
    this.newProduct = null;
  }

  delete(product: Product) {
    this.store.dispatch({ type: 'REMOVE', payload: product });
  }

  selected(product: Product) {
    this.productSelected = { ...product };
  }
  update() {
    this.store.dispatch({ type: 'UPDATE', payload: this.productSelected });
    this.productSelected = null; 
  }
}
