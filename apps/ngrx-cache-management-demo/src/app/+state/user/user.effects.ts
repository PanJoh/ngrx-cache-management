import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { createEntityAdapter } from '@ngrx/entity';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import { noopAction } from '../common-actions/noop.action';

import * as UserActions from './user.actions';
import * as UserFeature from './user.reducer';

@Injectable()
export class UserEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return UserActions.loadUsersSuccess({ user: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return UserActions.loadUsersFailure({ error });
        },
      })
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      fetch({
        id: (action) => action.id,
        run: (action) => {
          return this.userService.getUserForId(action.id).pipe(
            switchMap(result => {
              if (result.type === 'fetched') {
                if (action.selectIt) {
                  return of(UserActions.loadUserSuccess({user: result.user}), UserActions.selectUser({id: action.id}));
                }

                return of(UserActions.loadUserSuccess({user: result.user}));
              }

              if (action.selectIt) {
                return of(UserActions.notifyUserLoaded(), UserActions.selectUser({id: action.id}));
              }

              return of(UserActions.notifyUserLoaded());
            })
          );
        },
      }),
    )
  );

  notifyUserLoaded$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.loadUserSuccess),
        map(() => UserActions.notifyUserLoaded()),
      ),
  );

  constructor(
    private readonly actions$: Actions,
    private userService: UserService,
  ) {}
}
