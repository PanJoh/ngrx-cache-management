import { createAction, props } from '@ngrx/store';
import { UserEntity } from './user.models';

export const init = createAction('[User Page] Init');

export const loadUsersSuccess = createAction(
  '[User/API] Load Users Success',
  props<{ user: UserEntity[] }>()
);

export const loadUsersFailure = createAction(
  '[User/API] Load User Failure',
  props<{ error: any }>()
);

export const loadUser = createAction(
  '[User/API] Load User',
  props<{ id: string, selectIt?: boolean}>(),
);

export const loadUserSuccess = createAction(
  '[User/API] Load User Success',
  props<{user: UserEntity}>(),
);

export const selectUser = createAction(
  '[User/API] Select User',
  props<{id: string}>(),
)

export const notifyUserLoaded = createAction(
  '[User/API] Notify User Loaded',
);
