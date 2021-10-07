import { cacheTagAdapter, CacheTagEntity } from './cache-tag.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CACHE_TAG_FEATURE_KEY,
  State,
  cacheTagNamespaceAdapter,
} from './cache-tag.reducer';

// Lookup the 'CacheTag' feature state managed by NgRx
export const getCacheTagState = createFeatureSelector<State>(
  CACHE_TAG_FEATURE_KEY
);

const { selectAll, selectEntities } = cacheTagNamespaceAdapter.getSelectors();

const cacheTagSelectors = cacheTagAdapter.getSelectors();

export const getCacheTagLoaded = createSelector(
  getCacheTagState,
  (state: State) => state.loaded
);

export const getCacheTagError = createSelector(
  getCacheTagState,
  (state: State) => state.error
);

export const getAllCacheTag = createSelector(getCacheTagState, (state: State) =>
  selectAll(state)
);

export const getCacheTagNamespaceEntities = createSelector(
  getCacheTagState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCacheTagState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCacheTagNamespaceEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getCacheTagNamespace = (namespace: string) => createSelector(
  getCacheTagNamespaceEntities,
  (cacheTagNamespaces) => 
    cacheTagNamespaces[namespace],
);

export const getCacheTag = (namespace: string, id: string) => createSelector(
  getCacheTagNamespace(namespace),
  (namespace) => {
    if (namespace == null) {
      return null;
    }

    const cacheTag = cacheTagSelectors.selectEntities(namespace.cacheTags)[id];
    return cacheTag ?? {
      id,
      ttl: namespace.ttl,
    } as CacheTagEntity;
  }
)
