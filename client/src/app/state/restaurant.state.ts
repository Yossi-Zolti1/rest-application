import { State, Action, StateContext } from '@ngxs/store';
import { RestaurantState, Menu, Department, Item } from '../core/entities/menu';
import { MenuDetailsService } from '../services/menu-details.service';
import { of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
export class AddRestaurantDetails {
  static readonly type = '[Set Restaurant] Set Restaurant Details';
  constructor(public payload: { restaurant: RestaurantState }) { }
}
export class DeleteMenu {
  static readonly type = '[Delete Menu] Delete Menu';
  constructor(public menuId: number) { }
}
export class DeleteDepartment {
  static readonly type = '[Delete Department] Delete Department';
  constructor(public departmentId: number) { }
}
export class DeleteItem {
  static readonly type = '[Delete Item] Delete Item';
  constructor(public itemId: number) { }
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
  constructor(private menuService: MenuDetailsService) { }
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
  @Action(DeleteDepartment)
  deleteDepartment(ctx: StateContext<RestaurantState>, action: DeleteDepartment) {
    const state = ctx.getState();
    const updatedMenus = state.Menus.map(menu => ({
      ...menu,
      Departments: menu.Departments?.filter(department => department.id !== action.departmentId)
    }));
    ctx.patchState({ Menus: updatedMenus });
  }
  @Action(DeleteItem)
  deleteItem(ctx: StateContext<RestaurantState>, action: DeleteItem) {
    const state = ctx.getState();
    const updatedMenus = state.Menus.map(menu => ({
      ...menu,
      Departments: menu.Departments?.map(department => ({
        ...department,
        Items: department.Items?.filter(item => item.id !== action.itemId)
      }))
    }));
    ctx.patchState({ Menus: updatedMenus });
  }
  // Add more actions for updating the state as needed
}
