import {Tour} from "../../tour-execution/model/tour-model";


export interface ShoppingCart {
  userId : number;
  itemsInCart : Array<Tour>;
}
