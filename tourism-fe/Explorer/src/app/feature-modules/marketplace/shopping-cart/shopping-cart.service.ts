import {EventEmitter, Injectable } from '@angular/core';
import {ShoppingCart} from "../model/shopping-cart.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {Tour} from "../../tour-execution/model/tour-model";
import { HttpClient } from '@angular/common/http';
import { BoughtItem } from '../model/bought-item.model';
import { Coupon } from '../model/coupon.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{


  private cart: BehaviorSubject<ShoppingCart> = new BehaviorSubject<ShoppingCart>(new class implements ShoppingCart {
    itemsInCart: Array<Tour> = new Array<Tour>();
    userId: number;
  });

  constructor(private authService: AuthService, private http: HttpClient) {
    this.loadCart();
  }

  private loadCart(): void{
    let cart = sessionStorage.getItem("cart");

    if(cart)
    {
      this.cart.next(JSON.parse(cart!));
    }
  }

  getCart() {
    return this.cart.asObservable();
  }

  addToCart(tour: Tour): void {
    let cart = this.cart.getValue();
    cart.itemsInCart.push(tour);

    this.updateCart(cart);

    this.saveToStorage();
  }

  clearCart(): void{
    let cart = this.cart.getValue();
    cart.itemsInCart = [];

    this.updateCart(cart);

    this.saveToStorage();
  }

  removeItemFromCart(tour: Tour): void{
    let cart = this.cart.getValue();
    const idx = cart.itemsInCart.indexOf(tour);
    cart.itemsInCart.splice(idx,1);

    this.updateCart(cart);

    this.saveToStorage();
  }

  getCurrentValue() {
    return this.cart.getValue();
  }

  private saveToStorage(): void {
    sessionStorage.setItem("cart",JSON.stringify(this.cart.getValue()));
  }

  private updateCart(cart: ShoppingCart): void{
    this.cart.next(cart);
  }

  calculateTotalPrice(): number {
    const currentCart = this.getCurrentValue();
    const items = currentCart.itemsInCart;
    let totalPrice = 0;

    for (const item of items) {
      if(item.bundleId && !item.firstInBundle)
        continue
      totalPrice += item.price;
    }

    return totalPrice;
  }

  buyItems(items: BoughtItem[],cost:Number): Observable<any> {
    return this.http.post<BoughtItem[]>(`https://localhost:44333/api/tourist/shoppingcart/addToCart?cost=${cost}`, items);
  }

  getCoupon(code: string): Observable<Coupon> {
    return this.http.get<Coupon>(`https://localhost:44333/api/tourist/shoppingcart/coupon?code=${code}`);
  }

  updateCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.put<Coupon>('https://localhost:44333/api/tourist/shoppingcart/couponStatus/' + coupon.id, coupon);
  }

}
