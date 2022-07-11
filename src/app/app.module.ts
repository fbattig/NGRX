import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {  StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


const productsReducer = (state=[], action) => {
  switch(action.type){
    case 'ADD':
      return [ ...state, { ...action.payload}];
      case 'REMOVE':
      return state.filter(x=> x.id !== action.payload.id);
      case 'UPDATE':
        let product = state.filter(x=> x.id === action.payload.id);
        product = { ...product, ...action.payload};
        const products = state.filter(x=> x.id !== action.payload.id);
        return [product, ...products]
    default:
      return state;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
       products: productsReducer,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
