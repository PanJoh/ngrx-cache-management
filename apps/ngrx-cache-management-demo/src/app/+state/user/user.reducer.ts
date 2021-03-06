import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { UserEntity } from './user.models';

export const USER_FEATURE_KEY = 'user';

export interface State extends EntityState<UserEntity> {
  selectedId?: string | number; // which User record has been selected
  loaded: boolean; // has the User list been loaded
  error?: string | null; // last known error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: State;
}

export const userAdapter: EntityAdapter<UserEntity> =
  createEntityAdapter<UserEntity>();

export const initialState: State = userAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const userReducer = createReducer(
  initialState,
  on(UserActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(UserActions.loadUsersSuccess, (state, { user }) =>
    userAdapter.setAll(user, { ...state, loaded: true })
  ),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.loadUserSuccess, (state, { user }) =>
    userAdapter.upsertOne(user, state),
  ),
  on(UserActions.selectUser, (state, { id }) =>
    ({...state, selectedId: id}),
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
