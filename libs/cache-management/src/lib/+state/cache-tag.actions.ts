import { createAction, props } from '@ngrx/store';
import { CacheTagEntity } from './cache-tag.models';

export const init = createAction('[CacheTag Page] Init');

export const loadCacheTagSuccess = createAction(
  '[CacheTag/API] Load CacheTag Success',
  props<{ cacheTag: CacheTagEntity[] }>()
);

export const loadCacheTagFailure = createAction(
  '[CacheTag/API] Load CacheTag Failure',
  props<{ error: any }>()
);


export const createCacheTag = createAction(
  '[CacheTag/API] Create Cache Tag',
  props<{ namespace: string, id: string | number}>(),
);

export const updateCacheTagLastUpdate = createAction(
  '[CacheTag/API] Update Cache Tag Last Update',
  props<{ namespace: string, id: string | number, lastUpdate: number}>(),
);

export const invalidateCacheTag = createAction(
  '[CacheTag/API] Invalidate Cache Tag',
  props<{namespace: string, id: string }>(),
);

export const createCacheTagNamespace = createAction(
  '[CacheTag/API] Crate Cache Tag Namespace',
  props<{namespace: string, ttl: number}>(),
);

export const removeCacheTag = createAction(
  '[CacheTag/API] Remove Cache Tag',
  props<{namespace: string, id: string}>(),
)