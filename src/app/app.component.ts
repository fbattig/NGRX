import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app-state';
import { Product } from './product';
import { CreateProductAction } from './product.actions';


const productSelector = (state) => state.products;
const createProduct= (id: number, title: string) => ({type: 'ADD', payload: { id, title }});
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
    this.products$ = this.store.select(productSelector);
  }




  add() {
    this.store.dispatch(new CreateProductAction(this.id++, this.newProduct));
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
