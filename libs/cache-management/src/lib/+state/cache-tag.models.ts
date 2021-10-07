import { createEntityAdapter, EntityState } from "@ngrx/entity";

/**
 * Interface for the 'CacheTag' data
 */
export interface CacheTagEntity {
  id: string | number;
  ttl: number;
  lastUpdate?: number;
}

export const cacheTagAdapter = createEntityAdapter<CacheTagEntity>();


export interface CacheTagNamespaceEntity {
  id: string,
  ttl: number;
  cacheTags: EntityState<CacheTagEntity>;
}
