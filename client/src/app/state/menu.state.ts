import { State, Action, StateContext } from '@ngxs/store';
import { Menu } from '../core/entities/menu';
import { MenuDetailsService } from '../services/menu-details.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
export class GetMenus {
    static readonly type = '[Menus] Get Menus';
    constructor(public restId: number) {}
  }
export interface MenuStateModel {
  menus: Menu[];
}
@Injectable()
@State<MenuStateModel>({
  name: 'menus',
  defaults: {
    menus: []
  }
})
export class MenuState {
  constructor(private menuService: MenuDetailsService) {}

  @Action(GetMenus)
  getMenus(ctx: StateContext<MenuStateModel>, action: GetMenus) {
    const state = ctx.getState();
    if (state.menus.length > 0) {
        return of(state.menus);
    }
    return this.menuService.getMenus(action.restId).pipe(
      tap((menus: Menu[]) => {
        ctx.patchState({
          menus: menus
        });
      })
    );
  }
}
