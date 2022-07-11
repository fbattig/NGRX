import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {  ActionReducerMap, StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppState } from './app-state';
import { AppComponent } from './app.component';
import { ProductActionUnion, ProductActionTypes } from './product.actions';


const productsReducer = (state=[], action: ProductActionUnion) => {
  switch(action.type){
    case ProductActionTypes.Create:
      return [ ...state, action.payload];
      // case ProductActionTypes.Delete:
      // return state.filter(x=> x.id !== action.payload.id);
      // case ProductActionTypes.Update:
      //   let product = state.filter(x=> x.id === action.payload.id);
      //   product = { ...product, ...action.payload};
      //   const products = state.filter(x=> x.id !== action.payload.id);
      //   return [product, ...products]
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
