import { cacheTagAdapter } from './cache-tag.models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CacheTagActions from './cache-tag.actions';
import { CacheTagEntity, CacheTagNamespaceEntity } from './cache-tag.models';

export const CACHE_TAG_FEATURE_KEY = 'cacheTags';


export interface State extends EntityState<CacheTagNamespaceEntity> {
  selectedId?: string | number; // which CacheTag record has been selected
  loaded: boolean; // has the CacheTag list been loaded
  error?: string | null; // last known error (if any)
}

export interface CacheTagPartialState {
  readonly [CACHE_TAG_FEATURE_KEY]: State;
}

export const cacheTagNamespaceAdapter: EntityAdapter<CacheTagNamespaceEntity> =
  createEntityAdapter<CacheTagNamespaceEntity>();

export const initialState: State = cacheTagNamespaceAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const selectors = cacheTagNamespaceAdapter.getSelectors();

const cacheTagReducer = createReducer(
  initialState,
  on(CacheTagActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CacheTagActions.createCacheTagNamespace, (state, {namespace, ttl}) => {
    return cacheTagNamespaceAdapter.upsertOne({
      id: namespace,
      ttl,
      cacheTags: cacheTagAdapter.getInitialState(),
    }, state);
  }),
  on(CacheTagActions.updateCacheTagLastUpdate, (state, {namespace, id, lastUpdate}) => {
    const cacheTagNamspace = selectors.selectEntities(state)[namespace];
    if (cacheTagNamspace == null) {
      return state;
    }

    const newCacheTags = cacheTagAdapter.upsertOne({
      ttl: cacheTagNamspace.ttl,
      id,
      lastUpdate,
    }, cacheTagNamspace.cacheTags);

    return cacheTagNamespaceAdapter.updateOne(
      {
        id: cacheTagNamspace.id,
        changes: {
          ...cacheTagNamspace,
          cacheTags: newCacheTags,
        }
      }, state);
  }),
  on(CacheTagActions.invalidateCacheTag, (state, {namespace, id})=> {
    const cacheTagNamespace = selectors.selectEntities(state)[namespace];
    if (cacheTagNamespace == null) {
      return state;
    }

    const newCacheTags = cacheTagAdapter.removeOne(id, cacheTagNamespace.cacheTags);
    return cacheTagNamespaceAdapter.updateOne({
      id: namespace,
      changes: {
        ...cacheTagNamespace,
        cacheTags: newCacheTags,
      }
    }, state);
  }),
  on(CacheTagActions.removeCacheTag, (state, {namespace, id}) => {
    const cacheTagNamespace = selectors.selectEntities(state)[namespace];
    if(cacheTagNamespace == null) {
      return state;
    }

    const newCacheTags = cacheTagAdapter.removeOne(id, cacheTagNamespace.cacheTags);
    return cacheTagNamespaceAdapter.updateOne({
      id: namespace,
      changes: {
        ...cacheTagNamespace,
        cacheTags: newCacheTags,
      },
    }, state);
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return cacheTagReducer(state, action);
}
