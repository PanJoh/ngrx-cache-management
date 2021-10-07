import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { createEntityAdapter } from '@ngrx/entity';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
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
            map(result => {
              if (result.type === 'fetched') {
                return UserActions.loadUserSuccess({user: result.user});
              }

              return noopAction();
            })
          );
        },
      }),
    )
  );

  constructor(
    private readonly actions$: Actions,
    private userService: UserService,
  ) {}
}
