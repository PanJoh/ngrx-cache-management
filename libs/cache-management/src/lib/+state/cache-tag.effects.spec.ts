import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as CacheTagActions from './cache-tag.actions';
import { CacheTagEffects } from './cache-tag.effects';

describe('CacheTagEffects', () => {
  let actions: Observable<Action>;
  let effects: CacheTagEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CacheTagEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CacheTagEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CacheTagActions.init() });

      const expected = hot('-a-|', {
        a: CacheTagActions.loadCacheTagSuccess({ cacheTag: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
