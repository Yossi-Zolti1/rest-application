import { State, Action, StateContext } from '@ngxs/store';
import { RestaurantState, Menu, Department, Item } from '../core/entities/menu';
import { MenuDetailsService } from '../services/menu-details.service';
import { of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
export class AddRestaurantDetails {
  static readonly type = '[Set Restaurant] Set Restaurant Details';
  constructor(public payload: {restaurant: RestaurantState}) {}
} 
export class DeleteMenu {
  static readonly type = '[Delete Menu] Delete Menu';
  constructor(public menuId: number) {}
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
  @Action(DeleteMenu)
  deleteMenu(ctx: StateContext<RestaurantState>, action: DeleteMenu) {
    const state = ctx.getState();
    const updatedMenus = state.Menus.filter(menu => menu.id !== action.menuId);
    ctx.patchState({ Menus: updatedMenus });
  }
  
  // Add more actions for updating the state as needed
}
