import { CacheTagEntity } from './cache-tag.models';
import {
  cacheTagAdapter,
  CacheTagPartialState,
  initialState,
} from './cache-tag.reducer';
import * as CacheTagSelectors from './cache-tag.selectors';

describe('CacheTag Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCacheTagId = (it: CacheTagEntity) => it.id;
  const createCacheTagEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CacheTagEntity);

  let state: CacheTagPartialState;

  beforeEach(() => {
    state = {
      cacheTag: cacheTagAdapter.setAll(
        [
          createCacheTagEntity('PRODUCT-AAA'),
          createCacheTagEntity('PRODUCT-BBB'),
          createCacheTagEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('CacheTag Selectors', () => {
    it('getAllCacheTag() should return the list of CacheTag', () => {
      const results = CacheTagSelectors.getAllCacheTag(state);
      const selId = getCacheTagId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CacheTagSelectors.getSelected(state) as CacheTagEntity;
      const selId = getCacheTagId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCacheTagLoaded() should return the current "loaded" status', () => {
      const result = CacheTagSelectors.getCacheTagLoaded(state);

      expect(result).toBe(true);
    });

    it('getCacheTagError() should return the current "error" state', () => {
      const result = CacheTagSelectors.getCacheTagError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
