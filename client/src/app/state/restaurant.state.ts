import { State, Action, StateContext } from '@ngxs/store';
import { RestaurantState, Menu, Department, Item } from '../core/entities/menu';
import { MenuDetailsService } from '../services/menu-details.service';
import { of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
export class GetRestDetails {
  static readonly type = '[Menus] Get Menus';
  constructor(public restId: number) {}
} 
@Injectable()
@State<RestaurantState>({
  name: 'restaurant',
  defaults: {
    menus: []
  }
})
export class RestState {
  constructor(private menuService: MenuDetailsService) {}
  @Action(GetRestDetails)
  getMenus(ctx: StateContext<RestaurantState>, action: GetRestDetails) {
    const state = ctx.getState();
    if (state.menus) {
        return of(state.menus);
    }
    return this.menuService.getRestDetails(action.restId).pipe(
      tap((restaurantState: RestaurantState) => {
        ctx.patchState({
          menus: restaurantState.menus
        });
      })
    );
  }
  // Add more actions for updating the state as needed
}
