import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CacheTagActions from './cache-tag.actions';
import * as CacheTagFeature from './cache-tag.reducer';

@Injectable()
export class CacheTagEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CacheTagActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CacheTagActions.loadCacheTagSuccess({ cacheTag: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CacheTagActions.loadCacheTagFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
