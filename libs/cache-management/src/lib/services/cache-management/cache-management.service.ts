import { Injectable } from '@angular/core';
import {
  createCacheTagNamespace,
  invalidateCacheTag,
  removeCacheTag,
  updateCacheTagLastUpdate,
} from '../../+state/cache-tag.actions';
import { getCacheTag } from '../../+state/cache-tag.selectors';
import { select, Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { State as CacheTagsState } from '../../+state/cache-tag.reducer';

@Injectable({
  providedIn: 'root'
})
export class CacheManagementService {

  constructor(private store: Store<{cacheTags: CacheTagsState}>) { }

  get<T>(namespace: string, id: string, fetcher: (stale: boolean) => Observable<T>): Observable<T> {
    return this.store.pipe(
      select(getCacheTag(namespace, id)),
      switchMap(tag => {
        const now = Date.now();
        if (tag == null) {
          return throwError(new Error(`Cannot obtain cachtag ${namespace}/${id}`));
        }

        if (tag.lastUpdate == null || tag.lastUpdate + tag.ttl < now) {
          return fetcher(true).pipe(
            tap(() => {
              const lastUpdate = Date.now();
              this.store.dispatch(updateCacheTagLastUpdate({namespace, id, lastUpdate}))
            }),
          );
        }

        return fetcher(false);
      }),
    );
  }

  update<T>(namespace: string, id: string, updater: () => Observable<T>): Observable<T> {
    return updater().pipe(
      tap(() => {
        const lastUpdate = Date.now();
        this.store.dispatch(updateCacheTagLastUpdate({namespace, id, lastUpdate }));
      }),
    );
  }

  delete(namespace: string, id: string, deleter: () => Observable<void>): Observable<void> {
    return deleter().pipe(
      tap(() => this.store.dispatch(removeCacheTag({namespace, id})))
    );
  }

  invalidate(namespace: string, id: string) {
    this.store.dispatch(invalidateCacheTag({namespace, id}));
  }

  createNamespace(namespace: string, ttl: number) {
    this.store.dispatch(createCacheTagNamespace({namespace, ttl}));
  }
}

