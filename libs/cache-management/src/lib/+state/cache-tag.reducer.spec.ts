import { Action } from '@ngrx/store';

import * as CacheTagActions from './cache-tag.actions';
import { CacheTagEntity } from './cache-tag.models';
import { State, initialState, reducer } from './cache-tag.reducer';

describe('CacheTag Reducer', () => {
  const createCacheTagEntity = (id: string, name = ''): CacheTagEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid CacheTag actions', () => {
    it('loadCacheTagSuccess should return the list of known CacheTag', () => {
      const cacheTag = [
        createCacheTagEntity('PRODUCT-AAA'),
        createCacheTagEntity('PRODUCT-zzz'),
      ];
      const action = CacheTagActions.loadCacheTagSuccess({ cacheTag });

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
