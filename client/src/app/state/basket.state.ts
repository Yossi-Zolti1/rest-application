import { State, Action, StateContext } from '@ngxs/store';
import { Basket } from '../core/entities/basket';
export class AddToBasket {
    static readonly type = '[Set Basket] Set Basket Details';
    constructor(public payload: { basket: Basket }) { }
  }
@State<Basket>({
    name: 'basket',
    defaults: {
      items: [],
      totalPrice: 0,
    }
  })
  export class BasketState{
    constructor(){}
    @Action(AddToBasket)
    addRestaurantDetails(ctx: StateContext<Basket>, action: AddToBasket) {
      ctx.setState(action.payload.basket)
    }
  }