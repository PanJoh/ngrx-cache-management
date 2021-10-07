import { Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { UserEntity } from './user.models';
import { State, initialState, reducer } from './user.reducer';

describe('User Reducer', () => {
  const createUserEntity = (id: string, name = ''): UserEntity => ({
    id,
    firstName: name || `name-${id}`,
    lastName: '',
  });

  describe('valid User actions', () => {
    it('loadUserSuccess should return the list of known User', () => {
      const user = [
        createUserEntity('PRODUCT-AAA'),
        createUserEntity('PRODUCT-zzz'),
      ];
      const action = UserActions.loadUsersSuccess({ user });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
