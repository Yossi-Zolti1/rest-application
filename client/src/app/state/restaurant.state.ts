import { State, Action, StateContext } from '@ngxs/store';
import { RestaurantState, Menu, Department, Item } from '../core/entities/menu';
import { MenuDetailsService } from '../services/menu-details.service';
import { of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
export class AddRestaurantDetails {
  static readonly type = '[Set Restaurant] Set Restaurant Details';
  constructor(public payload: {restaurant: RestaurantState}) {}
} 
@Injectable()
@State<RestaurantState>({
  name: 'restaurant',
  defaults: {
    Menus: [],
    id: 0,
    name: '',
    street: '',
    city: '',
    phone: '',
    kashrut: null,
    type: '',
    logo: ''
  }
})
export class RestState {
  constructor(private menuService: MenuDetailsService) {}
  @Action(AddRestaurantDetails)
  addRestaurantDetails(ctx: StateContext<RestaurantState>, action: AddRestaurantDetails) {
    ctx.setState(action.payload.restaurant)
  }
  // Add more actions for updating the state as needed
}
